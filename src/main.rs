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
}

struct Chip8 {
    // 4KB of RAM
    ram: [u8; 0xFFF],
}

impl Chip8 {
    fn new() -> Self {
        Self {
            ram: [0u8; 0xFFF],
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
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new() {
        let chip8 = Chip8::new();
        assert_eq!(chip8.ram.len(), 0xFFF);
    }

    #[test]
    fn test_load_fontset() {
        let mut chip8 = Chip8::new();
        chip8.load_fontset();
        assert_eq!(chip8.ram[0x00], 0xF0);
        assert_eq!(chip8.ram[0x4F], 0x80);
        assert_eq!(chip8.ram[0x50], 0x00);
    }
}
