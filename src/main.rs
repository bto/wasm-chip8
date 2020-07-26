#[macro_use] extern crate log;
use log4rs;

fn main() {
    log4rs::init_file("logger.yml", Default::default()).unwrap();
}
