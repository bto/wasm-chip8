use super::*;

#[test]
fn test_new() {
    let _io_driver = IODriver::new();
}

#[test]
#[ignore]
fn test_display() {
    let mut _io_driver = IODriver::new();
    let mut vram = [[false; DISPLAY_WIDTH]; DISPLAY_HEIGHT];

    _io_driver.display_clear();

    for x in 0..3 {
        for y in 0..3 {
            vram[y][x] = true;
        }
    }
    _io_driver.display_draw(&vram);

    vram[1][1] = false;
    _io_driver.display_draw(&vram);
}