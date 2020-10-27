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
                break;
            case 0x9:
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
                break;
            case 0xf:
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

    decode_5xy0 = (x: number, y: number): string =>
        `SE V${this.toHex(x)} V${this.toHex(y)}`;

    decode_6xkk = (x: number, kk: number): string =>
        this.decode_xkk("LD", x, kk);

    decode_7xkk = (x: number, kk: number): string =>
        this.decode_xkk("ADD", x, kk);

    decode_annn = (nnn: number): string => this.decode_nnn("LD I", nnn);

    decode_bnnn = (nnn: number): string => this.decode_nnn("JP V0", nnn);

    decode_cxkk = (x: number, kk: number): string =>
        this.decode_xkk("RND", x, kk);

    decode_dxyn = (x: number, y: number, n: number): string =>
        `DRW V${this.toHex(x)} V${this.toHex(y)} 0x${this.toHex(n)}`;

    decode_nnn = (inst: string, nnn: number): string =>
        `${inst} 0x${this.toHex(nnn, 3)}`;

    decode_xkk = (inst: string, x: number, kk: number): string =>
        `${inst} V${this.toHex(x)} 0x${this.toHex(kk, 2)}`;

    fetch = (ram: number[], pc: number): number => (ram[pc] << 8) | ram[pc + 1];

    toHex = (x: number, length = 0): string =>
        x.toString(16).toUpperCase().padStart(length, "0");
}
