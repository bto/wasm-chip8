export default class Module {
    decode = (ram: number[], pc: number): string => {
        const op1 = ram[pc];
        const op2 = ram[pc + 1];
        const nibbles = [op1 >> 4, op1 & 0x0f, op2 >> 4, op2 & 0x0f];
        const nnn = (nibbles[1] << 8) | op2;
        const kk = op2;
        const x = nibbles[1];
        // const y = nibbles[2];
        // const z = nibbles[3];

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
                break;
            case 0x6:
                break;
            case 0x7:
                break;
            case 0x8:
                break;
            case 0x9:
                break;
            case 0xa:
                break;
            case 0xb:
                break;
            case 0xc:
                break;
            case 0xd:
                break;
            case 0xe:
                break;
            case 0xf:
                break;
            default:
                break;
        }

        return this.toHex(this.fetch(ram, pc), 4);
    };

    decode_00e0 = (): string => "CLS";

    decode_00ee = (): string => "RET";

    decode_0nnn = (nnn: number): string => `SYS addr: ${this.toHex(nnn, 3)}`;

    decode_1nnn = (nnn: number): string => `JP addr: ${this.toHex(nnn, 3)}`;

    decode_2nnn = (nnn: number): string => `CALL addr: ${this.toHex(nnn, 3)}`;

    decode_3xkk = (x: number, kk: number): string =>
        `SE V${this.toHex(x)}, ${this.toHex(kk, 2)}`;

    decode_4xkk = (x: number, kk: number): string =>
        `SNE V${this.toHex(x)}, ${this.toHex(kk, 2)}`;

    fetch = (ram: number[], pc: number): number => (ram[pc] << 8) | ram[pc + 1];

    toHex = (x: number, length = 0): string =>
        "0x" + x.toString(16).toUpperCase().padStart(length, "0");
}
