mod rom;
use rom::*;

use log::{error, trace};
use rand;
use std::fmt;
use wasm_bindgen::prelude::*;

const FONT_SET: [u8; 80] = [
    0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
    0x20, 0x60, 0x20, 0x20, 0x70, // 1
    0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
    0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
    0x90, 0x90, 0xF0, 0x10, 0x10, // 4
    0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
    0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
    0xF0, 0x10, 0x20, 0x40, 0x40, // 7
    0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
    0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
    0xF0, 0x90, 0xF0, 0x90, 0x90, // A
    0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
    0xF0, 0x80, 0x80, 0x80, 0xF0, // C
    0xE0, 0x90, 0x90, 0x90, 0xE0, // D
    0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
    0xF0, 0x80, 0xF0, 0x80, 0x80, // F
];

const DISPLAY_HEIGHT: usize = 32;
const DISPLAY_WIDTH: usize = 64;
const MEMSIZE: usize = 0xFFF;
const START_ADDR: usize = 0x200;

#[derive(Debug)]
#[derive(PartialEq)]
pub enum Pc {
    Inc,
    Skip,
    Jump(usize),
}

impl Pc {
    fn skip_if(cond: bool) -> Pc {
        if cond {
            Pc::Skip
        } else {
            Pc::Inc
        }
    }
}

#[wasm_bindgen]
pub struct Chip8 {
    // 4KB of RAM
    ram: [u8; MEMSIZE],

    // General purpose 8-bit registers
    v: [u8; 16],

    // Index register
    i: usize,

    // Stack
    stack: [usize; 16],

    // Stack pointer
    sp: usize,

    // Program counter
    pc: usize,

    pub delay_timer: u8,
    pub sound_timer: u8,
    keycode: u8,
    pub key_waiting: bool,
    key_register: usize,
    vram: [[bool; DISPLAY_WIDTH]; DISPLAY_HEIGHT],
    pub vram_changed: bool,
}

#[wasm_bindgen]
impl Chip8 {
    pub fn new() -> Self {
        let mut obj = Self {
            ram: [0u8; MEMSIZE],
            v: [0; 16],
            i: 0,
            stack: [0; 16],
            sp: 0,
            pc: START_ADDR,
            delay_timer: 0,
            sound_timer: 0,
            keycode: 0xFF,
            key_waiting: false,
            key_register: 0,
            vram: [[false; DISPLAY_WIDTH]; DISPLAY_HEIGHT],
            vram_changed: false,
        };

        obj.load_fontset();
        obj.load_rom();
        obj
    }

    pub fn set_key(&mut self, keycode: u8) {
        if self.key_waiting {
            self.v[self.key_register] = keycode;
            self.key_waiting = false;
        } else {
            self.keycode = keycode;
        }
    }

    pub fn run(&mut self) {
        self.dec_delay_timer();
        let opcode = self.fetch();
        let pc = self.run_opcode(opcode);
        self.set_pc(&pc);
        self.trace_status();
    }

    pub fn render(&self) -> String {
        self.to_string()
    }

    fn load_fontset(&mut self) {
        for i in 0..FONT_SET.len() {
            self.ram[i] = FONT_SET[i];
        }
    }

    fn load_rom(&mut self) {
        for i in 0..ROM_BRIX.len() {
            self.ram[i + START_ADDR] = ROM_BRIX[i];
        }
    }

    fn dec_delay_timer(&mut self) {
        if self.delay_timer > 0 {
            self.delay_timer -= 1;
        }
    }

    fn fetch(&self) -> u16 {
        let opcode = (self.ram[self.pc] as u16) << 8 | self.ram[self.pc + 1] as u16;
        trace!("[{:04X}] {:04X}", self.pc, opcode);
        opcode
    }

    fn run_opcode(&mut self, opcode: u16) -> Pc {
        let nibbles = (
            (opcode & 0xF000) >> 12 as usize,
            (opcode & 0x0F00) >> 8 as usize,
            (opcode & 0x00F0) >> 4 as usize,
            (opcode & 0x000F) as usize,
        );
        let nnn = (opcode & 0xFFF) as usize;
        let kk = (opcode & 0xFF) as u8;
        let x = nibbles.1 as usize;
        let y = nibbles.2 as usize;
        let n = nibbles.3 as usize;

        match nibbles {
            (0x00, 0x00, 0x00, 0x00) => self.op_0000(),
            (0x00, 0x00, 0x0E, 0x00) => self.op_00e0(),
            (0x00, 0x00, 0x0E, 0x0E) => self.op_00ee(),
            (0x00, _, _, _) => self.op_0nnn(nnn),
            (0x01, _, _, _) => self.op_1nnn(nnn),
            (0x02, _, _, _) => self.op_2nnn(nnn),
            (0x03, _, _, _) => self.op_3xkk(x, kk),
            (0x04, _, _, _) => self.op_4xkk(x, kk),
            (0x05, _, _, 0x00) => self.op_5xy0(x, y),
            (0x06, _, _, _) => self.op_6xkk(x, kk),
            (0x07, _, _, _) => self.op_7xkk(x, kk),
            (0x08, _, _, 0x00) => self.op_8xy0(x, y),
            (0x08, _, _, 0x01) => self.op_8xy1(x, y),
            (0x08, _, _, 0x02) => self.op_8xy2(x, y),
            (0x08, _, _, 0x03) => self.op_8xy3(x, y),
            (0x08, _, _, 0x04) => self.op_8xy4(x, y),
            (0x08, _, _, 0x05) => self.op_8xy5(x, y),
            (0x08, _, _, 0x06) => self.op_8x06(x),
            (0x08, _, _, 0x07) => self.op_8xy7(x, y),
            (0x08, _, _, 0x0e) => self.op_8x0e(x),
            (0x09, _, _, 0x00) => self.op_9xy0(x, y),
            (0x0A, _, _, _) => self.op_annn(nnn),
            (0x0B, _, _, _) => self.op_bnnn(nnn),
            (0x0C, _, _, _) => self.op_cxkk(x, kk),
            (0x0D, _, _, _) => self.op_dxyn(x, y, n),
            (0x0E, _, 0x09, 0x0E) => self.op_ex9e(x),
            (0x0E, _, 0x0A, 0x01) => self.op_exa1(x),
            (0x0F, _, 0x00, 0x07) => self.op_fx07(x),
            (0x0F, _, 0x00, 0x0A) => self.op_fx0a(x),
            (0x0F, _, 0x01, 0x05) => self.op_fx15(x),
            (0x0F, _, 0x01, 0x08) => self.op_fx18(x),
            (0x0F, _, 0x01, 0x0E) => self.op_fx1e(x),
            (0x0F, _, 0x02, 0x09) => self.op_fx29(x),
            (0x0F, _, 0x03, 0x03) => self.op_fx33(x),
            (0x0F, _, 0x05, 0x05) => self.op_fx55(x),
            (0x0F, _, 0x06, 0x05) => self.op_fx65(x),
            _ => panic!("{:04X}: {:04X} is invalid opcode", self.pc, opcode)
        }
    }

    #[allow(dead_code)]
    fn op_not_impl(&self) -> Pc {
        error!("Not implemented yet");
        Pc::Inc
    }

    fn op_0000(&self) -> Pc {
        std::process::exit(0);
    }

    // CLS: Clear the display
    fn op_00e0(&mut self) -> Pc {
        trace!("CLS");
        for y in 0..DISPLAY_HEIGHT {
            for x in 0..DISPLAY_WIDTH {
                self.vram[y][x] = false;
            }
        }
        self.vram_changed = true;
        Pc::Inc
    }

    // RET: Return from a subroutine
    fn op_00ee(&mut self) -> Pc {
        trace!("RET");
        self.sp -= 1;
        Pc::Jump(self.stack[self.sp] + 2)
    }

    // SYS addr: Jump to a machine code routine at nnn
    fn op_0nnn(&self, nnn: usize) -> Pc {
        trace!("SYS addr {:04X}", nnn);
        Pc::Jump(nnn)
    }

    // JP addr: Jump to location nnn
    fn op_1nnn(&self, nnn: usize) -> Pc {
        trace!("JP addr {:04X}", nnn);
        Pc::Jump(nnn)
    }

    // CALL addr: Call subroutine at nnn
    fn op_2nnn(&mut self, nnn: usize) -> Pc {
        trace!("CALL addr {:04X}", nnn);
        self.stack[self.sp] = self.pc;
        self.sp += 1;
        Pc::Jump(nnn)
    }

    // SE Vx, byte: Skip next instruction if Vx = kk
    fn op_3xkk(&self, x: usize, kk: u8) -> Pc {
        trace!("SE V{:X} {:02X}", x, kk);
        Pc::skip_if(self.v[x] == kk)
    }

    // SNE Vx, byte: Skip next instruction if Vx != kk
    fn op_4xkk(&self, x: usize, kk: u8) -> Pc {
        trace!("SNE V{:X} {:02X}", x, kk);
        Pc::skip_if(self.v[x] != kk)
    }

    // SE Vx, Vy: Skip next instruction if Vx = Vy
    fn op_5xy0(&self, x: usize, y: usize) -> Pc {
        trace!("SE V{:X} V{:X}", x, y);
        Pc::skip_if(self.v[x] == self.v[y])
    }

    // LD Vx, byte: Set Vx = kk
    fn op_6xkk(&mut self, x: usize, kk: u8) -> Pc {
        trace!("LD V{:X} {:02X}", x, kk);
        self.v[x] = kk;
        Pc::Inc
    }

    // ADD Vx, byte: Set Vx = Vx + kk
    fn op_7xkk(&mut self, x: usize, kk: u8) -> Pc {
        trace!("ADD V{:X} {:02X}", x, kk);
        self.v[x] = (self.v[x] as u16 + kk as u16) as u8;
        Pc::Inc
    }

    // LD Vx, Vy: Set Vx = Vy
    fn op_8xy0(&mut self, x: usize, y: usize) -> Pc {
        trace!("LD V{:X} V{:X}", x, y);
        self.v[x] = self.v[y];
        Pc::Inc
    }

    // OR Vx, Vy: Set Vx = Vx OR Vy
    fn op_8xy1(&mut self, x: usize, y: usize) -> Pc {
        trace!("OR V{:X} V{:X}", x, y);
        self.v[x] |= self.v[y];
        Pc::Inc
    }

    // AND Vx, Vy: Set Vx = Vx AND Vy
    fn op_8xy2(&mut self, x: usize, y: usize) -> Pc {
        trace!("AND V{:X} V{:X}", x, y);
        self.v[x] &= self.v[y];
        Pc::Inc
    }

    // XOR Vx, Vy: Set Vx = Vx XOR Vy
    fn op_8xy3(&mut self, x: usize, y: usize) -> Pc {
        trace!("XOR V{:X} V{:X}", x, y);
        self.v[x] ^= self.v[y];
        Pc::Inc
    }

    // ADD Vx, Vy: Set Vx = Vx + Vy, set VF = carry
    fn op_8xy4(&mut self, x: usize, y: usize) -> Pc {
        trace!("ADD V{:X} V{:X}", x, y);
        let vx = self.v[x] as u16 + self.v[y] as u16;
        self.v[x] = vx as u8;
        self.v[0xF] = (vx >> 8) as u8;
        Pc::Inc
    }

    // SUB Vx, Vy: Set Vx = Vx - Vy, set VF = NOT borrow
    fn op_8xy5(&mut self, x: usize, y: usize) -> Pc {
        trace!("SUB V{:X} V{:X}", x, y);
        self.v[0xF] = if self.v[x] > self.v[y] {
            1
        } else {
            0
        };
        self.v[x] = self.v[x].wrapping_sub(self.v[y]);
        Pc::Inc
    }

    // SHR Vx{, Vy}: Set Vx = Vx SHR 1
    fn op_8x06(&mut self, x: usize) -> Pc {
        trace!("SHR V{:X}", x);
        self.v[0xF] = self.v[x] & 0x1;
        self.v[x] >>= 1;
        Pc::Inc
    }

    // SUBN Vx, Vy: Set Vx = Vy - Vx, set VF = NOT borrow
    fn op_8xy7(&mut self, x: usize, y: usize) -> Pc {
        trace!("SUBN V{:X} V{:X}", x, y);
        self.v[0xF] = if self.v[y] > self.v[x] {
            1
        } else {
            0
        };
        self.v[x] = self.v[y].wrapping_sub(self.v[x]);
        Pc::Inc
    }

    // SHL Vx{, Vy}: Set Vx = Vx SHL 1
    fn op_8x0e(&mut self, x: usize) -> Pc {
        trace!("SHL V{:X}", x);
        self.v[0xF] = self.v[x] >> 7;
        self.v[x] <<= 1;
        Pc::Inc
    }

    // SNE Vx, Vy: Skip next instruction if Vx != Vy
    fn op_9xy0(&self, x: usize, y: usize) -> Pc {
        trace!("SNE V{:X} V{:X}", x, y);
        Pc::skip_if(self.v[x] != self.v[y])
    }

    // LD I, addr: Set I = nnn
    fn op_annn(&mut self, nnn: usize) -> Pc {
        trace!("LD I, addr {:04X}", nnn);
        self.i = nnn;
        Pc::Inc
    }

    // JP V0, addr: Jump to location nnn + V0
    fn op_bnnn(&self, nnn: usize) -> Pc {
        trace!("JP V0 {:04X}", nnn);
        Pc::Jump(nnn + self.v[0] as usize)
    }

    // RND Vx, byte: Set Vx = random byte AND kk
    fn op_cxkk(&mut self, x: usize, kk: u8) -> Pc {
        trace!("RND V{:X} {:02X}", x, kk);
        self.v[x] = rand::random::<u8>() & kk;
        Pc::Inc
    }

    // DRW Vx, Vy, nibble: Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision
    fn op_dxyn(&mut self, x: usize, y: usize, n: usize) -> Pc {
        trace!("DRW V{:X} V{:X}, {}", x, y, n);
        self.v[0xF] = 0;
        for byte in 0..n {
            let sprite = self.ram[self.i + byte];
            let y = self.v[y] as usize + byte;
            if y >= DISPLAY_HEIGHT {
                break;
            }
            for bit in 0..8 {
                let x = self.v[x] as usize + bit;
                if x >= DISPLAY_WIDTH {
                    break;
                }
                let color = ((sprite >> (7 - bit)) & 0x1) != 0;
                self.v[0xF] |= (color & self.vram[y][x]) as u8;
                self.vram[y][x] ^= color;
            }
        }
        self.vram_changed = true;
        Pc::Inc
    }

    // SKP Vx: Skip next instruction if key with the value of Vx is pressed
    fn op_ex9e(&mut self, x: usize) -> Pc {
        trace!("SKP V{:X}", x);
        if self.v[x] == self.keycode {
            self.keycode = 0xFF;
            Pc::Skip
        } else {
            Pc::Inc
        }
    }

    // SKNP Vx: Skip next instruction if key with the value of Vx is not pressed
    fn op_exa1(&mut self, x: usize) -> Pc {
        trace!("SKNP V{:X}", x);
        if self.v[x] == self.keycode {
            self.keycode = 0xFF;
            Pc::Inc
        } else {
            Pc::Skip
        }
    }

    // LD Vx, DT: Set Vx = delay timer value
    fn op_fx07(&mut self, x: usize) -> Pc {
        trace!("LD V{:X}, DT", x);
        self.v[x] = self.delay_timer;
        Pc::Inc
    }

    // LD Vx, K: Wait for a key press, store the value of the key in Vx
    fn op_fx0a(&mut self, x: usize) -> Pc {
        trace!("LD V{:X}, K", x);
        self.key_waiting = true;
        self.key_register = x;
        Pc::Inc
    }

    // LD DT, Vx: Set delay timer = Vx
    fn op_fx15(&mut self, x: usize) -> Pc {
        trace!("LD DT, V{:X}", x);
        self.delay_timer = self.v[x];
        Pc::Inc
    }

    // LD ST, Vx: Set sound timer = Vx
    fn op_fx18(&mut self, x: usize) -> Pc {
        trace!("LD ST, V{:X}", x);
        self.sound_timer = self.v[x];
        Pc::Inc
    }

    // ADD I, Vx: Set I = I + Vx
    fn op_fx1e(&mut self, x: usize) -> Pc {
        trace!("ADD I, V{:X}", x);
        self.i += self.v[x] as usize;
        Pc::Inc
    }

    // LD F, Vx: Set I = location of sprite for digit Vx
    fn op_fx29(&mut self, x: usize) -> Pc {
        trace!("LD F, V{:X}", x);
        self.i = self.v[x] as usize * 5;
        Pc::Inc
    }

    // LD B, Vx: Store BCD representation of Vx in memory locations I, I+1 and I+2
    fn op_fx33(&mut self, x: usize) -> Pc {
        trace!("LD B, V{:X}", x);
        self.ram[self.i] = self.v[x] / 100;
        self.ram[self.i + 1] = (self.v[x] / 10) % 10;
        self.ram[self.i + 2] = self.v[x] % 10;
        Pc::Inc
    }

    // LD [I], Vx: Store registers V0 through Vx in memory starting at location I
    fn op_fx55(&mut self, x: usize) -> Pc {
        trace!("LD [I] V{:X}", x);
        for i in 0..x + 1 {
            self.ram[self.i + i] = self.v[i];
        }
        Pc::Inc
    }

    // LD Vx, [I]: Load registers V0 through Vx in memory starting at location I
    fn op_fx65(&mut self, x: usize) -> Pc {
        trace!("LD V{:X} [I]", x);
        for i in 0..x + 1 {
            self.v[i] = self.ram[self.i + i];
        }
        Pc::Inc
    }

    fn set_pc(&mut self, pc: &Pc) {
        match *pc {
            Pc::Inc => self.pc +=2,
            Pc::Skip => self.pc += 4,
            Pc::Jump(addr) => self.pc = addr,
        }
    }

    fn trace_status(&self) {
        trace!(
            "v0_7 = [{:02X}, {:02X}, {:02X}, {:02X}, {:02X}, {:02X}, {:02X}, {:02X}]",
            self.v[0x0], self.v[0x1], self.v[0x2], self.v[0x3], self.v[0x4], self.v[0x5], self.v[0x6], self.v[0x7]
        );
        trace!(
            "v8_F = [{:02X}, {:02X}, {:02X}, {:02X}, {:02X}, {:02X}, {:02X}, {:02X}]",
            self.v[0x8], self.v[0x9], self.v[0xA], self.v[0xB], self.v[0xC], self.v[0xD], self.v[0xE], self.v[0xF]
        );
        trace!("i = {:04X}", self.i);
        trace!(
            "stack0_7 = [{:04X}, {:04X}, {:04X}, {:04X}, {:04X}, {:04X}, {:04X}, {:04X}]",
            self.stack[0x0], self.stack[0x1], self.stack[0x2], self.stack[0x3], self.stack[0x4], self.stack[0x5], self.stack[0x6], self.stack[0x7],
        );
        trace!(
            "stack8_F = [{:04X}, {:04X}, {:04X}, {:04X}, {:04X}, {:04X}, {:04X}, {:04X}]",
            self.stack[0x8], self.stack[0x9], self.stack[0xA], self.stack[0xB], self.stack[0xC], self.stack[0xD], self.stack[0xE], self.stack[0xF],
        );
        trace!("sp = {:04X}", self.sp);
        trace!("keycode = {:02X}", self.keycode);
        trace!("delay_timer = {}", self.delay_timer);
    }
}

impl fmt::Display for Chip8 {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for y in 0..DISPLAY_HEIGHT {
            for x in 0..DISPLAY_WIDTH {
                if self.vram[y][x] {
                    write!(f, "◼")?;
                } else {
                    write!(f, "◻")?;
                }
            }
            write!(f, "\n")?
        }
        Ok(())
    }
}

#[cfg(test)]
#[path = "./lib_test.rs"]
mod lib_test;
