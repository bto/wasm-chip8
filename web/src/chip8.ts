import { Chip8 } from "./wasm/chip8";
import { memory } from "./wasm/chip8_bg";
import { actions, store } from "./store";

const chip8 = Chip8.new();

const emuLoop = (): void => {
    const dispatch = store.dispatch;

    chip8.run();

    if (chip8.vram_changed) {
        dispatch(actions.vram.set(chip8.render()));

        // const vram = new Uint8Array(memory.buffer, chip8.ptr_vram(), 64 * 32);
        const canvas = document.getElementById("display") as HTMLCanvasElement;
        canvas.height = (CELL_SIZE + 1) * DISPLAY_HEIGHT + 1;
        canvas.width = (CELL_SIZE + 1) * DISPLAY_WIDTH + 1;
        const ctx = canvas.getContext("2d");
        drawGrid(ctx);
    }

    dispatch(actions.register.setI(chip8.i));
    dispatch(actions.register.setPC(chip8.pc));
    dispatch(actions.register.setSP(chip8.sp));

    const v = Array.from(new Uint8Array(memory.buffer, chip8.ptr_v(), 16));
    dispatch(actions.register.setV(v));

    const ram = Array.from(
        new Uint8Array(memory.buffer, chip8.ptr_ram(), 0xfff)
    );
    dispatch(actions.ram.set(ram));

    requestAnimationFrame(emuLoop);
};

requestAnimationFrame(emuLoop);

const CELL_SIZE = 5;
const GRID_COLOR = "#CCCCCC";
// const ON_COLOR = "#FFFFFF";
// const OFF_COLOR = "#000000";
const DISPLAY_HEIGHT = 32;
const DISPLAY_WIDTH = 64;

const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    for (let i = 0; i <= DISPLAY_WIDTH; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(
            i * (CELL_SIZE + 1) + 1,
            (CELL_SIZE + 1) * DISPLAY_HEIGHT + 1
        );
    }

    for (let i = 0; i <= DISPLAY_HEIGHT; i++) {
        ctx.moveTo(0, i * (CELL_SIZE + 1) + 1);
        ctx.lineTo(
            (CELL_SIZE + 1) * DISPLAY_WIDTH + 1,
            i * (CELL_SIZE + 1) + 1
        );
    }

    ctx.stroke();
};
