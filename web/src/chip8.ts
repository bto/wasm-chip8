import { Chip8 } from "./wasm/chip8";
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

    requestAnimationFrame(emuLoop);
};

requestAnimationFrame(emuLoop);
