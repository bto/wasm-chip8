mod lib;
use lib::Chip8;

use std::io::{Write, stdout};
use std::thread;
use std::time::Duration;

use log4rs;
use termion::{AsyncReader, async_stdin, color};
use termion::event::Key;
use termion::input::TermRead;
use termion::raw::IntoRawMode;

const DISPLAY_HEIGHT: usize = 32;
const DISPLAY_WIDTH: usize = 64;

fn main() {
    log4rs::init_file("logger.yml", Default::default()).unwrap();

    let mut chip8 = Chip8::new();
    let io_driver = IODriver::new();

    chip8.load();

    io_driver.display_clear();

    let _stdout = stdout().into_raw_mode().unwrap();
    let mut stdin = async_stdin();

    loop {
        thread::sleep(Duration::from_millis(1));

        let keycode = io_driver.get_key(&mut stdin);
        match keycode {
            0x0..=0xF => chip8.keycode = keycode,
            0xFE => break, // Esc key
            _ => (),
        };
        /* debug
        if keycode != 0xFD { // Not Enter key
            self.delay_timer = 0;
            continue;
        }
        */

        if chip8.key_waiting {
            if chip8.keycode == 0xFF {
                continue;
            } else {
                chip8.v[chip8.key_register] = chip8.keycode;
                chip8.key_waiting = false;
                chip8.keycode = 0xFF;
            }
        }

        chip8.sound();
        chip8.run();

        if chip8.vram_changed {
            io_driver.display_draw(&chip8.vram);
            chip8.vram_changed = false;
        }
    }

    io_driver.display_restore();
}

struct IODriver {
}

impl IODriver {
    fn new() -> Self {
        Self {}
    }

    fn display_clear(&self) {
        write!(stdout(), "{}{}", termion::clear::All, termion::cursor::Hide).unwrap();
    }

    fn display_draw(&self, vram: &[[bool; DISPLAY_WIDTH]; DISPLAY_HEIGHT]) {
        let mut output = String::new();
        for y in 0..DISPLAY_HEIGHT {
            output += &termion::cursor::Goto(1, y as u16 + 1).to_string();
            for x in 0..DISPLAY_WIDTH {
                if vram[y][x] {
                    output += &color::Bg(color::White).to_string();
                } else {
                    output += &color::Bg(color::Black).to_string();
                }
                output += " ";
            }
        }
        write!(stdout(), "{}", output).unwrap();
        stdout().flush().unwrap();
    }

    fn display_restore(&self) {
        write!(
            stdout(),
            "{}{}{}",
            termion::clear::All,
            termion::cursor::Goto(1, 1),
            termion::cursor::Show
        ).unwrap();
    }

    fn get_key(&self, stdin: &mut AsyncReader) -> u8 {
        let opt = stdin.keys().next();
        let key = match opt {
            Some(c) => c.unwrap(),
            None => return 0xFF,
        };

        match key {
            Key::Char('x') => 0x00,
            Key::Char('1') => 0x01,
            Key::Char('2') => 0x02,
            Key::Char('3') => 0x03,
            Key::Char('q') => 0x04,
            Key::Char('w') => 0x05,
            Key::Char('e') => 0x06,
            Key::Char('a') => 0x07,
            Key::Char('s') => 0x08,
            Key::Char('d') => 0x09,
            Key::Char('z') => 0x0A,
            Key::Char('c') => 0x0B,
            Key::Char('4') => 0x0C,
            Key::Char('r') => 0x0D,
            Key::Char('f') => 0x0E,
            Key::Char('v') => 0x0F,
            Key::Char('\n') => 0xFD,
            Key::Esc => 0xFE,
            _ => 0xFF,
        }
    }
}

#[cfg(test)]
#[path = "./main_test.rs"]
mod main_test;
