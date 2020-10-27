export default class Module {
    decode = (ram: number[], pc: number): string => {
        const op1 = ram[pc];
        const op2 = ram[pc + 1];
        const nibbles = [op1 >> 4, op1 & 0x0f, op2 >> 4, op2 & 0x0f];
        const nnn = (nibbles[1] << 8) | op2;
        const kk = op2;
        const x = nibbles[1];
        const y = nibbles[2];
        const n = nibbles[3];

        switch (nibbles[0]) {
            case 0x0:
                if (
                    nibbles[1] == 0x0 &&
                    nibbles[2] == 0xe &&
                    nibbles[3] == 0x0
                ) {
                    return this.decode_00e0();
                } else if (
                    nibbles[1] == 0x0 &&
                    nibbles[2] == 0xe &&
                    nibbles[3] == 0xe
                ) {
                    return this.decode_00ee();
                }
                return this.decode_0nnn(nnn);
            case 0x1:
                return this.decode_1nnn(nnn);
            case 0x2:
                return this.decode_2nnn(nnn);
            case 0x3:
                return this.decode_3xkk(x, kk);
            case 0x4:
                return this.decode_4xkk(x, kk);
            case 0x5:
                if (nibbles[3] == 0x0) {
                    return this.decode_5xy0(x, y);
                }
                break;
            case 0x6:
                return this.decode_6xkk(x, kk);
            case 0x7:
                return this.decode_7xkk(x, kk);
            case 0x8:
                switch (nibbles[3]) {
                    case 0x0:
                        return this.decode_8xy0(x, y);
                    case 0x1:
                        return this.decode_8xy1(x, y);
                    case 0x2:
                        return this.decode_8xy2(x, y);
                    case 0x3:
                        return this.decode_8xy3(x, y);
                    case 0x4:
                        return this.decode_8xy4(x, y);
                    case 0x5:
                        return this.decode_8xy5(x, y);
                    case 0x6:
                        return this.decode_8x06(x);
                    case 0x7:
                        return this.decode_8xy7(x, y);
                    case 0xe:
                        return this.decode_8x0e(x);
                }
                break;
            case 0x9:
                if (nibbles[3] == 0x0) {
                    return this.decode_9xy0(x, y);
                }
                break;
            case 0xa:
                return this.decode_annn(nnn);
            case 0xb:
                return this.decode_bnnn(nnn);
            case 0xc:
                return this.decode_cxkk(x, kk);
            case 0xd:
                return this.decode_dxyn(x, y, n);
            case 0xe:
                if (nibbles[2] == 0x9 && nibbles[3] == 0xe) {
                    return this.decode_ex9e(x);
                } else if (nibbles[2] == 0xa && nibbles[3] == 0x1) {
                    return this.decode_exa1(x);
                }
                break;
            case 0xf:
                if (nibbles[2] == 0x0 && nibbles[3] == 0x7) {
                    return this.decode_fx07(x);
                } else if (nibbles[2] == 0x0 && nibbles[3] == 0xa) {
                    return this.decode_fx0a(x);
                } else if (nibbles[2] == 0x1 && nibbles[3] == 0x5) {
                    return this.decode_fx15(x);
                } else if (nibbles[2] == 0x1 && nibbles[3] == 0x8) {
                    return this.decode_fx18(x);
                } else if (nibbles[2] == 0x1 && nibbles[3] == 0xe) {
                    return this.decode_fx1e(x);
                } else if (nibbles[2] == 0x2 && nibbles[3] == 0x9) {
                    return this.decode_fx29(x);
                } else if (nibbles[2] == 0x3 && nibbles[3] == 0x3) {
                    return this.decode_fx33(x);
                } else if (nibbles[2] == 0x5 && nibbles[3] == 0x5) {
                    return this.decode_fx55(x);
                } else if (nibbles[2] == 0x6 && nibbles[3] == 0x5) {
                    return this.decode_fx65(x);
                }
                break;
            default:
                break;
        }

        return "0x" + this.toHex(this.fetch(ram, pc), 4);
    };

    decode_00e0 = (): string => "CLS";

    decode_00ee = (): string => "RET";

    decode_0nnn = (nnn: number): string => this.decode_nnn("SYS", nnn);

    decode_1nnn = (nnn: number): string => this.decode_nnn("JP", nnn);

    decode_2nnn = (nnn: number): string => this.decode_nnn("CALL", nnn);

    decode_3xkk = (x: number, kk: number): string =>
        this.decode_xkk("SE", x, kk);

    decode_4xkk = (x: number, kk: number): string =>
        this.decode_xkk("SNE", x, kk);

    decode_5xy0 = (x: number, y: number): string => this.decode_xy("SE", x, y);

    decode_6xkk = (x: number, kk: number): string =>
        this.decode_xkk("LD", x, kk);

    decode_7xkk = (x: number, kk: number): string =>
        this.decode_xkk("ADD", x, kk);

    decode_8xy0 = (x: number, y: number): string => this.decode_xy("LD", x, y);

    decode_8xy1 = (x: number, y: number): string => this.decode_xy("OR", x, y);

    decode_8xy2 = (x: number, y: number): string => this.decode_xy("AND", x, y);

    decode_8xy3 = (x: number, y: number): string => this.decode_xy("XOR", x, y);

    decode_8xy4 = (x: number, y: number): string => this.decode_xy("ADD", x, y);

    decode_8xy5 = (x: number, y: number): string => this.decode_xy("SUB", x, y);

    decode_8x06 = (x: number): string => this.decode_x("SHR", x);

    decode_8xy7 = (x: number, y: number): string =>
        this.decode_xy("SUBN", x, y);

    decode_8x0e = (x: number): string => this.decode_x("LD", x);

    decode_9xy0 = (x: number, y: number): string => this.decode_xy("SNE", x, y);

    decode_annn = (nnn: number): string => this.decode_nnn("LD I", nnn);

    decode_bnnn = (nnn: number): string => this.decode_nnn("JP V0", nnn);

    decode_cxkk = (x: number, kk: number): string =>
        this.decode_xkk("RND", x, kk);

    decode_dxyn = (x: number, y: number, n: number): string =>
        this.decode_xyn("DRW", x, y, n);

    decode_ex9e = (x: number): string => this.decode_x("SKP", x);

    decode_exa1 = (x: number): string => this.decode_x("SKNP", x);

    decode_fx07 = (x: number): string => this.decode_xa("LD", x, "DT");

    decode_fx0a = (x: number): string => this.decode_xa("LD", x, "K");

    decode_fx15 = (x: number): string => this.decode_x("LD DT", x);

    decode_fx18 = (x: number): string => this.decode_x("LD ST", x);

    decode_fx1e = (x: number): string => this.decode_x("ADD I", x);

    decode_fx29 = (x: number): string => this.decode_x("LD F", x);

    decode_fx33 = (x: number): string => this.decode_x("LD B", x);

    decode_fx55 = (x: number): string => this.decode_x("LD [I]", x);

    decode_fx65 = (x: number): string => this.decode_xa("LD", x, "[I]");

    decode_nnn = (inst: string, nnn: number): string =>
        `${inst} 0x${this.toHex(nnn, 3)}`;

    decode_x = (inst: string, x: number): string => `${inst} V${this.toHex(x)}`;

    decode_xa = (inst: string, x: number, arg: string): string =>
        `${inst} V${this.toHex(x)} ${arg}`;

    decode_xkk = (inst: string, x: number, kk: number): string =>
        `${inst} V${this.toHex(x)} 0x${this.toHex(kk, 2)}`;

    decode_xy = (inst: string, x: number, y: number): string =>
        `${inst} V${this.toHex(x)} V${this.toHex(y)}`;

    decode_xyn = (inst: string, x: number, y: number, n: number): string =>
        `${inst} V${this.toHex(x)} V${this.toHex(y)} 0x${this.toHex(n)}`;

    fetch = (ram: number[], pc: number): number => (ram[pc] << 8) | ram[pc + 1];

    toHex = (x: number, length = 0): string =>
        x.toString(16).toUpperCase().padStart(length, "0");
}
