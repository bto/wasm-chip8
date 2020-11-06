import { Chip8 } from "./wasm/chip8";
import { memory } from "./wasm/chip8_bg";
import { actions, store } from "./store";

interface KeyMap {
    [key: number]: number;
}

export class Emu {
    public running = false;

    protected chip8: Chip8;

    COLOR_OFF = "#FFFFFF";
    COLOR_ON = "#000000";
    PIXEL_SIZE = 10;
    HEIGHT = 32;
    WIDTH = 64;

    KEYMAP: KeyMap = {
        88: 0x0, // X
        49: 0x1, // 1
        50: 0x2, // 2
        51: 0x3, // 3
        81: 0x4, // q
        87: 0x5, // w
        69: 0x6, // e
        65: 0x7, // a
        83: 0x8, // s
        68: 0x9, // d
        90: 0xa, // z
        67: 0xb, // c
        52: 0xc, // 4
        82: 0xd, // r
        70: 0xe, // f
        86: 0xf, // v
    };

    public constructor() {
        this.chip8 = Chip8.new();

        addEventListener("keydown", this.setKey);
    }

    public loadRom = (romName: string): Promise<void> => {
        this.stop();

        return fetch(`roms/${romName}`)
            .then((response) => response.arrayBuffer())
            .then((buffer): void => {
                const chip8 = Chip8.new();

                const ram = new Uint8Array(
                    memory.buffer,
                    chip8.ptr_ram() + 0x200,
                    buffer.byteLength
                );
                new Uint8Array(buffer, 0, buffer.byteLength).forEach((v, i) => {
                    ram[i] = v;
                });

                requestAnimationFrame(() => {
                    this.chip8 = chip8;
                    store.dispatch(actions.ram.set(Array.from(ram)));
                });
            });
    };

    public run = (): void => {
        this.running = true;
        this.loop();
    };

    public step = (): void => {
        const chip8 = this.chip8;

        chip8.run();

        if (chip8.vram_changed) {
            this.render();
        }

        this.showRegisters();
    };

    public stop = (): void => {
        this.running = false;
    };

    protected loop = (): void => {
        this.step();
        if (this.running) {
            requestAnimationFrame(this.loop);
        }
    };

    protected render = (): void => {
        const chip8 = this.chip8;

        const canvas = document.getElementById("display") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        const vram = new Uint8Array(
            memory.buffer,
            chip8.ptr_vram(),
            this.HEIGHT * this.WIDTH
        );
        ctx.beginPath();

        for (let col = 0; col <= this.HEIGHT; col++) {
            for (let row = 0; row <= this.WIDTH; row++) {
                const idx = col * this.WIDTH + row;
                ctx.fillStyle = vram[idx] ? this.COLOR_ON : this.COLOR_OFF;

                ctx.fillRect(
                    row * this.PIXEL_SIZE,
                    col * this.PIXEL_SIZE,
                    this.PIXEL_SIZE,
                    this.PIXEL_SIZE
                );
            }
        }
        ctx.stroke();
    };

    protected renderImage = (): void => {
        const chip8 = this.chip8;

        const canvas = document.getElementById("display") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        const vram = new Uint8Array(
            memory.buffer,
            chip8.ptr_vram(),
            this.HEIGHT * this.WIDTH
        );

        const image = ctx.createImageData(this.WIDTH, this.HEIGHT);
        for (let i = 0; i < vram.length; i++) {
            const idx = i * 4;
            if (vram[i]) {
                image.data[idx + 0] = 0x00;
                image.data[idx + 1] = 0x00;
                image.data[idx + 2] = 0x00;
                image.data[idx + 3] = 0xff;
            } else {
                image.data[idx + 0] = 0xff;
                image.data[idx + 1] = 0xff;
                image.data[idx + 2] = 0xff;
                image.data[idx + 3] = 0xff;
            }
        }
        ctx.putImageData(image, 0, 0);
    };

    protected setKey = (e: KeyboardEvent): void => {
        this.chip8.set_key(this.KEYMAP[e.keyCode]);
    };

    protected showRegisters = (): void => {
        const chip8 = this.chip8;
        const dispatch = store.dispatch;

        dispatch(actions.register.setI(chip8.i));
        dispatch(actions.register.setPC(chip8.pc));
        dispatch(actions.register.setSP(chip8.sp));

        const v = Array.from(new Uint8Array(memory.buffer, chip8.ptr_v(), 16));
        dispatch(actions.register.setV(v));
    };
}

const emu = new Emu();

export default emu;
