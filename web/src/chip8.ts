import { Chip8 } from "./wasm/chip8";
import { actions, store } from "./redux";

const chip8 = Chip8.new();

const emuLoop = (): void => {
    chip8.run();

    if (chip8.vram_changed) {
        store.dispatch(actions.vram.set(chip8.render()));
    }

    store.dispatch(actions.register.setI(chip8.i));
    store.dispatch(actions.register.setPC(chip8.pc));
    store.dispatch(actions.register.setSP(chip8.sp));

    requestAnimationFrame(emuLoop);
};

requestAnimationFrame(emuLoop);
