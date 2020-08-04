
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
#[ignore]
fn test_display() {
    let chip8 = Chip8::new();

    chip8.display_clear();
    for x in 0..3 {
        for y in 0..3 {
            chip8.display_draw(x, y, 1);
        }
    }
    chip8.display_draw(1, 1, 0);
    chip8.display_goto(0, 4);
    chip8.display_flush();
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

#[test]
#[ignore]
fn test_op_00e0() {
    let mut chip8 = Chip8::new();
    let pc = chip8.op_00e0();
    assert_eq!(pc, Pc::Inc);
}

#[test]
fn test_op_00ee_2nnn() {
    let mut chip8 = Chip8::new();
    assert_eq!(chip8.pc, 0x200);
    assert_eq!(chip8.sp, 0);

    let pc = chip8.op_2nnn(0x280);
    chip8.set_pc(&pc);
    assert_eq!(pc, Pc::Jump(0x280));
    assert_eq!(chip8.pc, 0x280);
    assert_eq!(chip8.sp, 1);
    assert_eq!(chip8.stack[0], 0x200);

    let pc = chip8.op_2nnn(0x300);
    chip8.set_pc(&pc);
    assert_eq!(pc, Pc::Jump(0x300));
    assert_eq!(chip8.pc, 0x300);
    assert_eq!(chip8.sp, 2);
    assert_eq!(chip8.stack[0], 0x200);
    assert_eq!(chip8.stack[1], 0x280);

    let pc = chip8.op_00ee();
    chip8.set_pc(&pc);
    assert_eq!(pc, Pc::Jump(0x282));
    assert_eq!(chip8.pc, 0x282);
    assert_eq!(chip8.sp, 1);
    assert_eq!(chip8.stack[0], 0x200);

    let pc = chip8.op_00ee();
    chip8.set_pc(&pc);
    assert_eq!(pc, Pc::Jump(0x202));
    assert_eq!(chip8.pc, 0x202);
    assert_eq!(chip8.sp, 0);
}

#[test]
fn test_op_0nnn() {
    let chip8 = Chip8::new();

    let pc = chip8.op_0nnn(0x280);
    assert_eq!(pc, Pc::Jump(0x280));

    let pc = chip8.op_0nnn(0x300);
    assert_eq!(pc, Pc::Jump(0x300));
}

#[test]
fn test_op_1nnn() {
    let chip8 = Chip8::new();

    let pc = chip8.op_1nnn(0x280);
    assert_eq!(pc, Pc::Jump(0x280));

    let pc = chip8.op_1nnn(0x300);
    assert_eq!(pc, Pc::Jump(0x300));
}

#[test]
fn test_op_3xkk() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 0x1;
    let pc = chip8.op_3xkk(0, 0x1);
    assert_eq!(pc, Pc::Skip);

    chip8.v[1] = 0x2;
    let pc = chip8.op_3xkk(1, 0x1);
    assert_eq!(pc, Pc::Inc);
}

#[test]
fn test_op_4xkk() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 0x1;
    let pc = chip8.op_4xkk(0, 0x1);
    assert_eq!(pc, Pc::Inc);

    chip8.v[1] = 0x2;
    let pc = chip8.op_4xkk(1, 0x1);
    assert_eq!(pc, Pc::Skip);
}

#[test]
fn test_op_5xy0() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 0x1;
    chip8.v[1] = 0x1;
    let pc = chip8.op_5xy0(0, 1);
    assert_eq!(pc, Pc::Skip);

    chip8.v[2] = 0x1;
    chip8.v[3] = 0x2;
    let pc = chip8.op_5xy0(2, 3);
    assert_eq!(pc, Pc::Inc);
}

#[test]
fn test_op_6xkk() {
    let mut chip8 = Chip8::new();

    assert_eq!(chip8.v[0], 0x0);
    let pc = chip8.op_6xkk(0, 0x1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0x1);

    assert_eq!(chip8.v[1], 0x0);
    let pc = chip8.op_6xkk(1, 0x2);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[1], 0x2);
}

#[test]
fn test_op_7xkk() {
    let mut chip8 = Chip8::new();

    // not overflow
    chip8.v[0] = 0x1;
    chip8.v[0xF] = 0x1;
    let pc = chip8.op_7xkk(0, 0x2);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0x3);
    chip8.v[0xF] = 0x1; // carry flag wasn't set

    // overflow
    chip8.v[1] = 0x80;
    chip8.v[0xF] = 0x0;
    let pc = chip8.op_7xkk(1, 0x81);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[1], 0x1);
    assert_eq!(chip8.v[0xF], 0x0); // carry flag wasn't set
}

#[test]
fn test_op_8xy0() {
    let mut chip8 = Chip8::new();

    chip8.v[1] = 0x1;
    let pc = chip8.op_8xy0(0, 1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0x1);
    assert_eq!(chip8.v[0], chip8.v[1]);

    chip8.v[2] = 0x10;
    let pc = chip8.op_8xy0(1, 2);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[1], 0x10);
    assert_eq!(chip8.v[1], chip8.v[2]);
}

#[test]
fn test_op_8xy1() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 0b0011;
    chip8.v[1] = 0b0101;
    let pc = chip8.op_8xy1(0, 1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0b0111);
    assert_eq!(chip8.v[1], 0b0101);

    chip8.v[1] = 0b0011;
    chip8.v[2] = 0b0101;
    let pc = chip8.op_8xy1(1, 2);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[1], 0b0111);
    assert_eq!(chip8.v[2], 0b0101);
}

#[test]
fn test_op_8xy2() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 0b0011;
    chip8.v[1] = 0b0101;
    let pc = chip8.op_8xy2(0, 1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0b0001);
    assert_eq!(chip8.v[1], 0b0101);

    chip8.v[1] = 0b0011;
    chip8.v[2] = 0b0101;
    let pc = chip8.op_8xy2(1, 2);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[1], 0b0001);
    assert_eq!(chip8.v[2], 0b0101);
}

#[test]
fn test_op_8xy3() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 0b0011;
    chip8.v[1] = 0b0101;
    let pc = chip8.op_8xy3(0, 1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0b0110);
    assert_eq!(chip8.v[1], 0b0101);

    chip8.v[1] = 0b0011;
    chip8.v[2] = 0b0101;
    let pc = chip8.op_8xy3(1, 2);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[1], 0b0110);
    assert_eq!(chip8.v[2], 0b0101);
}

#[test]
fn test_op_8xy4() {
    let mut chip8 = Chip8::new();

    // not overflow
    chip8.v[0] = 0x1;
    chip8.v[1] = 0x2;
    chip8.v[0xF] = 0x1;
    let pc = chip8.op_8xy4(0, 1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0x3);
    assert_eq!(chip8.v[1], 0x2);
    assert_eq!(chip8.v[0xF], 0x0);

    // overflow
    chip8.v[1] = 0x80;
    chip8.v[2] = 0x81;
    chip8.v[0xF] = 0x0;
    let pc = chip8.op_8xy4(1, 2);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[1], 0x1);
    assert_eq!(chip8.v[2], 0x81);
    assert_eq!(chip8.v[0xF], 0x1);
}

#[test]
fn test_op_8xy5() {
    let mut chip8 = Chip8::new();

    // not borrow
    chip8.v[0] = 0x3;
    chip8.v[1] = 0x1;
    chip8.v[0xF] = 0x0;
    let pc = chip8.op_8xy5(0, 1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0x2);
    assert_eq!(chip8.v[1], 0x1);
    assert_eq!(chip8.v[0xF], 0x1);

    // borrow
    chip8.v[1] = 0x0;
    chip8.v[2] = 0x1;
    chip8.v[0xF] = 0x1;
    let pc = chip8.op_8xy5(1, 2);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[1], 0xFF);
    assert_eq!(chip8.v[2], 0x1);
    assert_eq!(chip8.v[0xF], 0x0);
}

#[test]
fn test_op_8x06() {
    let mut chip8 = Chip8::new();

    // not overflow
    chip8.v[0] = 0b10101010;
    chip8.v[0xF] = 0x1;
    let pc = chip8.op_8x06(0);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0b01010101);
    assert_eq!(chip8.v[0xF], 0x0);

    // overflow
    chip8.v[1] = 0b01010101;
    chip8.v[0xF] = 0x0;
    let pc = chip8.op_8x06(1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[1], 0b00101010);
    assert_eq!(chip8.v[0xF], 0x1);
}

#[test]
fn test_op_8xy7() {
    let mut chip8 = Chip8::new();

    // not borrow
    chip8.v[0] = 0x1;
    chip8.v[1] = 0x3;
    chip8.v[0xF] = 0x0;
    let pc = chip8.op_8xy7(0, 1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0x2);
    assert_eq!(chip8.v[1], 0x3);
    assert_eq!(chip8.v[0xF], 0x1);

    // borrow
    chip8.v[1] = 0x1;
    chip8.v[2] = 0x0;
    chip8.v[0xF] = 0x1;
    let pc = chip8.op_8xy7(1, 2);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[1], 0xFF);
    assert_eq!(chip8.v[2], 0x0);
    assert_eq!(chip8.v[0xF], 0x0);
}

#[test]
fn test_op_8x0e() {
    let mut chip8 = Chip8::new();

    // not overflow
    chip8.v[0] = 0b01010101;
    chip8.v[0xF] = 0x1;
    let pc = chip8.op_8x0e(0);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0b10101010);
    assert_eq!(chip8.v[0xF], 0x0);

    // overflow
    chip8.v[1] = 0b10101010;
    chip8.v[0xF] = 0x0;
    let pc = chip8.op_8x0e(1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[1], 0b01010100);
    assert_eq!(chip8.v[0xF], 0x1);
}

#[test]
fn test_op_9xy0() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 0x1;
    chip8.v[1] = 0x1;
    let pc = chip8.op_9xy0(0, 1);
    assert_eq!(pc, Pc::Inc);

    chip8.v[2] = 0x1;
    chip8.v[3] = 0x2;
    let pc = chip8.op_9xy0(2, 3);
    assert_eq!(pc, Pc::Skip);
}

#[test]
fn test_op_annn() {
    let mut chip8 = Chip8::new();

    let pc = chip8.op_annn(0x280);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.i, 0x280);

    let pc = chip8.op_annn(0x300);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.i, 0x300);
}

#[test]
fn test_op_bnnn() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 0x0;
    let pc = chip8.op_bnnn(0x280);
    assert_eq!(pc, Pc::Jump(0x280));

    chip8.v[0] = 0x80;
    let pc = chip8.op_bnnn(0x300);
    assert_eq!(pc, Pc::Jump(0x380));
}

#[test]
fn test_op_cxkk() {
    let mut chip8 = Chip8::new();

    for i in 0..2 {
        for _i in 0..5 {
            chip8.v[i] = 0xFF;
            let pc = chip8.op_cxkk(i, 0xF);
            assert_eq!(pc, Pc::Inc);
            assert_ne!(chip8.v[i], 0xFF);
            assert_eq!(chip8.v[i] & 0xF0, 0x0);
        }
    }
}

#[test]
#[ignore]
fn test_op_dxyn() {
    let mut chip8 = Chip8::new();
    chip8.load_fontset();
    chip8.display_clear();

    for i in 0..4 {
        for j in 0..4 {
            chip8.v[j] = j as u8 * 5;
            chip8.v[j + 1] = i * 6;
            chip8.i = i as usize * 20 + j * 5;
            chip8.op_dxyn(j, j + 1, 5);
        }
    }

    // if viewing area was bigger than display size
    chip8.v[0xA] = 0x2F;
    chip8.v[0xB] = 0x1F;
    chip8.i = 0x0;
    chip8.op_dxyn(0xA, 0xB, 5);

    chip8.display_flush();
}

#[test]
fn test_op_fx07_fx0a() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 1;
    let pc = chip8.op_fx0a(0);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.delay_timer, 1);

    let pc = chip8.op_fx07(1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.delay_timer, 1);
    assert_eq!(chip8.v[1], 1);

    chip8.dec_delay_timer();
    assert_eq!(chip8.delay_timer, 0);

    chip8.dec_delay_timer();
    assert_eq!(chip8.delay_timer, 0);

    let pc = chip8.op_fx07(0);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.delay_timer, 0);
    assert_eq!(chip8.v[0], 0);
}

#[test]
fn test_op_fx1e() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 0x10;
    chip8.i = 0x280;
    let pc = chip8.op_fx1e(0);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.i, 0x290);

    chip8.v[1] = 0x20;
    chip8.i = 0x300;
    let pc = chip8.op_fx1e(1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.i, 0x320);
}

#[test]
fn test_op_fx29() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 0;
    let pc = chip8.op_fx29(0);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.i, 0);

    chip8.v[1] = 1;
    let pc = chip8.op_fx29(1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.i, 5);

    chip8.v[2] = 4;
    let pc = chip8.op_fx29(2);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.i, 20);
}

#[test]
fn test_op_fx33() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 254;
    chip8.i = 0x400;
    let pc = chip8.op_fx33(0);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.ram[0x400], 2);
    assert_eq!(chip8.ram[0x401], 5);
    assert_eq!(chip8.ram[0x402], 4);

    chip8.v[1] = 123;
    chip8.i = 0x500;
    let pc = chip8.op_fx33(1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.ram[0x500], 1);
    assert_eq!(chip8.ram[0x501], 2);
    assert_eq!(chip8.ram[0x502], 3);
}

#[test]
fn test_op_fx55() {
    let mut chip8 = Chip8::new();

    chip8.v[0] = 0x1;
    chip8.v[1] = 0x2;
    chip8.i = 0x400;
    let pc = chip8.op_fx55(1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.ram[0x400], 0x1);
    assert_eq!(chip8.ram[0x401], 0x2);
    assert_eq!(chip8.ram[0x402], 0x0);

    chip8.v[0] = 0x3;
    chip8.v[1] = 0x4;
    chip8.v[2] = 0x5;
    chip8.v[3] = 0x6;
    chip8.i = 0x500;
    let pc = chip8.op_fx55(3);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.ram[0x500], 0x3);
    assert_eq!(chip8.ram[0x501], 0x4);
    assert_eq!(chip8.ram[0x502], 0x5);
    assert_eq!(chip8.ram[0x503], 0x6);
    assert_eq!(chip8.ram[0x504], 0x0);
}

#[test]
fn test_op_fx65() {
    let mut chip8 = Chip8::new();

    chip8.ram[0x400] = 0x1;
    chip8.ram[0x401] = 0x2;
    chip8.i = 0x400;
    chip8.v[2] = 0xFF;
    let pc = chip8.op_fx65(1);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0x1);
    assert_eq!(chip8.v[1], 0x2);
    assert_eq!(chip8.v[2], 0xFF);

    chip8.ram[0x500] = 0x3;
    chip8.ram[0x501] = 0x4;
    chip8.ram[0x502] = 0x5;
    chip8.ram[0x503] = 0x6;
    chip8.i = 0x500;
    chip8.v[4] = 0xFF;
    let pc = chip8.op_fx65(3);
    assert_eq!(pc, Pc::Inc);
    assert_eq!(chip8.v[0], 0x3);
    assert_eq!(chip8.v[1], 0x4);
    assert_eq!(chip8.v[2], 0x5);
    assert_eq!(chip8.v[3], 0x6);
    assert_eq!(chip8.v[4], 0xFF);
}
