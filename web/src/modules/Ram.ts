export default class Module {
    decode = (ram: number[], pc: number): string => {
        const op1 = ram[pc];
        const op2 = ram[pc + 1];
        const nibbles = [op1 >> 4, op1 & 0x0f, op2 >> 4, op2 & 0x0f];
        const nnn = (nibbles[1] << 8) | op2;
        // const kk = op2;
        // const x = nibbles[1];
        // const y = nibbles[2];
        // const z = nibbles[3];

        switch (nibbles[0]) {
            case 0x00:
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
                    return this.decode_000e();
                }
                break;
            case 0x01:
                return this.decode_1nnn(nnn);
            default:
                break;
        }

        return this.toAddr(this.fetch(ram, pc));
    };

    decode_00e0 = (): string => "CLS";

    decode_000e = (): string => "RET";

    decode_1nnn = (nnn: number): string => "JP addr: " + this.toAddr(nnn);

    fetch = (ram: number[], pc: number): number => (ram[pc] << 8) | ram[pc + 1];

    toAddr = (addr: number): string =>
        "0x" + addr.toString(16).toUpperCase().padStart(4, "0");
}
