import { Chip8 } from "./wasm/chip8";
import { memory } from "./wasm/chip8_bg";
import { actions, store } from "./store";

class Emu {
    COLOR_OFF = "#FFFFFF";
    COLOR_ON = "#000000";
    PIXEL_SIZE = 10;
    HEIGHT = 32;
    WIDTH = 64;

    protected canvas: CanvasRenderingContext2D;
    protected chip8: Chip8;

    public constructor() {
        this.chip8 = Chip8.new();

        const canvas = document.getElementById("display") as HTMLCanvasElement;
        canvas.height = this.PIXEL_SIZE * this.HEIGHT;
        canvas.width = this.PIXEL_SIZE * this.WIDTH;
        this.canvas = canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    public run = (): void => {
        requestAnimationFrame(this.loop);
    };

    protected loop = (): void => {
        const chip8 = this.chip8;

        chip8.run();

        if (chip8.vram_changed) {
            this.render();
        }

        this.showMemory();
        this.showRegisters();
        this.run();
    };

    protected render = (): void => {
        const canvas = this.canvas;
        const chip8 = this.chip8;

        const vram = new Uint8Array(
            memory.buffer,
            chip8.ptr_vram(),
            this.HEIGHT * this.WIDTH
        );
        canvas.beginPath();

        for (let col = 0; col <= this.HEIGHT; col++) {
            for (let row = 0; row <= this.WIDTH; row++) {
                const idx = col * this.WIDTH + row;
                canvas.fillStyle = vram[idx] ? this.COLOR_ON : this.COLOR_OFF;

                canvas.fillRect(
                    row * this.PIXEL_SIZE,
                    col * this.PIXEL_SIZE,
                    this.PIXEL_SIZE,
                    this.PIXEL_SIZE
                );
            }
        }
        canvas.stroke();
    };

    protected renderImage = (): void => {
        const canvas = this.canvas;
        const chip8 = this.chip8;

        const vram = new Uint8Array(
            memory.buffer,
            chip8.ptr_vram(),
            this.HEIGHT * this.WIDTH
        );

        const image = canvas.createImageData(this.WIDTH, this.HEIGHT);
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
        canvas.putImageData(image, 0, 0);
    };

    protected showMemory = (): void => {
        const chip8 = this.chip8;
        const dispatch = store.dispatch;

        const ram = Array.from(
            new Uint8Array(memory.buffer, chip8.ptr_ram(), 0xfff)
        );
        dispatch(actions.ram.set(ram));
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
emu.run();
