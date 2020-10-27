export default class Module {
    decode = (ram: number[], pc: number): string => {
        const nibbles = [
            (ram[pc] & 0xf0) >> 4,
            ram[pc] & 0x0f,
            (ram[pc + 1] & 0xf0) >> 4,
            ram[pc + 1] & 0x0f,
        ];

        return (
            nibbles[0].toString(16).toUpperCase() +
            nibbles[1].toString(16).toUpperCase() +
            nibbles[2].toString(16).toUpperCase() +
            nibbles[3].toString(16).toUpperCase()
        );
    };

    toAddr = (addr: number): string =>
        "0x" + addr.toString(16).toUpperCase().padStart(4, "0");
}
