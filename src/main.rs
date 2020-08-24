mod lib;
use lib::Chip8;

use log4rs;

fn main() {
    log4rs::init_file("logger.yml", Default::default()).unwrap();
    let mut chip8 = Chip8::new();
    chip8.load();
    chip8.run();
}
