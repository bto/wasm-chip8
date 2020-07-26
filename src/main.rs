use std::env;
use std::fs::File;
use std::io::Read;

#[macro_use] extern crate log;
use log4rs;

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

    fn run(&mut self) {
        loop {
            self.tick();
        }
    }

    fn tick(&mut self) {
        let opcode = self.fetch();
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
        let x = nibbles.1;
        let y = nibbles.1;
        let n = nibbles.1;

        let pc = match nibbles {
            (0x00, 0x00, 0x0E, 0x00) => self.op_00E0(),
            _ => panic!("{:04X}: {:04x} is invalid opcode", self.pc, opcode)
        };

        match pc {
            Pc::Inc => self.pc +=2,
            Pc::Skip => self.pc += 4,
            Pc::Jump(addr) => self.pc = addr,
        }
    }

    fn op_00E0(&self) -> Pc{
        Pc::Inc
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
