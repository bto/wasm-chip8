use std::env;
use std::fs::File;
use std::io::{Read, Write, stdout};

#[macro_use] extern crate log;
use log4rs;
use termion;

const FONT_SET: [u8; 80] = [
    0xF0,
    0x90,
    0x90,
    0x90,
    0xF0,
    0x20,
    0x60,
    0x20,
    0x20,
    0x70,
    0xF0,
    0x10,
    0xF0,
    0x80,
    0xF0,
    0xF0,
    0x10,
    0xF0,
    0x10,
    0xF0,
    0x90,
    0x90,
    0xF0,
    0x10,
    0x10,
    0xF0,
    0x80,
    0xF0,
    0x10,
    0xF0,
    0xF0,
    0x80,
    0xF0,
    0x90,
    0xF0,
    0xF0,
    0x10,
    0x20,
    0x40,
    0x40,
    0xF0,
    0x90,
    0xF0,
    0x90,
    0xF0,
    0xF0,
    0x90,
    0xF0,
    0x10,
    0xF0,
    0xF0,
    0x90,
    0xF0,
    0x90,
    0x90,
    0xE0,
    0x90,
    0xE0,
    0x90,
    0xE0,
    0xF0,
    0x80,
    0x80,
    0x80,
    0xF0,
    0xE0,
    0x90,
    0x90,
    0x90,
    0xE0,
    0xF0,
    0x80,
    0xF0,
    0x80,
    0xF0,
    0xF0,
    0x80,
    0xF0,
    0x80,
    0x80,
];

fn main() {
    log4rs::init_file("logger.yml", Default::default()).unwrap();
    let mut chip8 = Chip8::new();
    chip8.load();
    chip8.run();
}

#[derive(Debug)]
#[derive(PartialEq)]
enum Pc {
    Inc,
    Skip,
    Jump(usize),
}

struct Chip8 {
    // 4KB of RAM
    ram: [u8; 0xFFF],

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

}

impl Chip8 {
    fn new() -> Self {
        Self {
            ram: [0u8; 0xFFF],
            v: [0; 16],
            i: 0,
            stack: [0; 16],
            sp: 0,
            pc: 0x200,
        }
    }

    fn load(&mut self) {
        self.load_fontset();
        self.load_rom();
    }

    fn load_fontset(&mut self) {
        for i in 0..FONT_SET.len() {
            self.ram[i] = FONT_SET[i];
        }
    }

    fn load_rom(&mut self) {
        let args: Vec<String> = env::args().collect();
        let mut f = File::open(args[1].as_str()).expect("File not found");
        f.read(&mut self.ram[0x200..]).unwrap();
    }

    fn clear(&self) {
        let mut stdout = stdout();
        write!(stdout, "{}{}", termion::clear::All, termion::cursor::Goto(1, 1)).unwrap();
        stdout.flush().unwrap();
    }

    fn run(&mut self) {
        loop {
            self.tick();
        }
    }

    fn tick(&mut self) {
        let opcode = self.fetch();
        trace!("{:04X}: {:04X}", self.pc, opcode);
        self.run_opcode(opcode);
    }

    fn fetch(&self) -> u16 {
        (self.ram[self.pc] as u16) << 8 | self.ram[self.pc + 1] as u16
    }

    fn run_opcode(&mut self, opcode: u16) {
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

        let pc = match nibbles {
            (0x00, 0x00, 0x0E, 0x00) => self.op_00e0(),
            (0x00, 0x00, 0x0E, 0x0E) => self.op_00ee(),
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
            _ => panic!("{:04X}: {:04x} is invalid opcode", self.pc, opcode)
        };

        match pc {
            Pc::Inc => self.pc +=2,
            Pc::Skip => self.pc += 4,
            Pc::Jump(addr) => self.pc = addr,
        }
    }

    fn op_not_impl(&self) -> Pc {
        error!("Not implemented yet");
        Pc::Inc
    }

    // CLS: Clear the display
    fn op_00e0(&self) -> Pc {
        self.clear();
        Pc::Inc
    }

    // RET: Return from a subroutine
    fn op_00ee(&self) -> Pc {
        self.op_not_impl()
    }

    fn op_1nnn(&self, nnn: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_2nnn(&self, nnn: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_3xkk(&self, x: usize, kk: u8) -> Pc {
        self.op_not_impl()
    }

    fn op_4xkk(&self, x: usize, kk: u8) -> Pc {
        self.op_not_impl()
    }

    fn op_5xy0(&self, x: usize, y: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_6xkk(&self, x: usize, kk: u8) -> Pc {
        self.op_not_impl()
    }

    fn op_7xkk(&self, x: usize, kk: u8) -> Pc {
        self.op_not_impl()
    }

    fn op_8xy0(&self, x: usize, y: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_8xy1(&self, x: usize, y: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_8xy2(&self, x: usize, y: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_8xy3(&self, x: usize, y: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_8xy4(&self, x: usize, y: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_8xy5(&self, x: usize, y: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_8x06(&self, x: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_8xy7(&self, x: usize, y: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_8x0e(&self, x: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_9xy0(&self, x: usize, y: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_annn(&self, nnn: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_bnnn(&self, nnn: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_cxkk(&self, x: usize, kk: u8) -> Pc {
        self.op_not_impl()
    }

    fn op_dxyn(&self, x: usize, y: usize, n: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_ex9e(&self, x: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_exa1(&self, x: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_fx07(&self, x: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_fx0a(&self, x: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_fx15(&self, x: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_fx18(&self, x: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_fx1e(&self, x: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_fx29(&self, x: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_fx33(&self, x: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_fx55(&self, x: usize) -> Pc {
        self.op_not_impl()
    }

    fn op_fx65(&self, x: usize) -> Pc {
        self.op_not_impl()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new() {
        let chip8 = Chip8::new();
        assert_eq!(chip8.ram.len(), 0xFFF);
        assert_eq!(chip8.v[0], 0);
        assert_eq!(chip8.pc, 0x200);
    }

    #[test]
    fn test_load_fontset() {
        let mut chip8 = Chip8::new();
        chip8.load_fontset();
        assert_eq!(chip8.ram[0x00], 0xF0);
        assert_eq!(chip8.ram[0x4F], 0x80);
        assert_eq!(chip8.ram[0x50], 0x00);
    }

    #[test]
    fn test_fetch() {
        let mut chip8 = Chip8::new();

        chip8.ram[0x200] = 0x01;
        chip8.ram[0x201] = 0x23;
        let opcode = chip8.fetch();
        assert_eq!(opcode, 0x0123);

        chip8.ram[0x300] = 0xAB;
        chip8.ram[0x301] = 0xCD;
        chip8.pc = 0x300;
        let opcode = chip8.fetch();
        assert_eq!(opcode, 0xABCD);
    }
}
