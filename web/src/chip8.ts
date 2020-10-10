import { Chip8 } from "./wasm/chip8";
import { memory } from "./wasm/chip8_bg";
import { actions, store } from "./store";

const chip8 = Chip8.new();

const emuLoop = (): void => {
    const dispatch = store.dispatch;

    chip8.run();

    if (chip8.vram_changed) {
        dispatch(actions.vram.set(chip8.render()));
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
