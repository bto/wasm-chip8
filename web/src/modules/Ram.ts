export default class Module {
    toAddr = (addr: number): string =>
        "0x" + addr.toString(16).toUpperCase().padStart(4, "0");
}
