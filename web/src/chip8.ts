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
    dispatch(
        actions.register.setV([
            chip8.get_state("v", 0x0),
            chip8.get_state("v", 0x1),
            chip8.get_state("v", 0x2),
            chip8.get_state("v", 0x3),
            chip8.get_state("v", 0x4),
            chip8.get_state("v", 0x5),
            chip8.get_state("v", 0x6),
            chip8.get_state("v", 0x7),
            chip8.get_state("v", 0x8),
            chip8.get_state("v", 0x9),
            chip8.get_state("v", 0xa),
            chip8.get_state("v", 0xb),
            chip8.get_state("v", 0xc),
            chip8.get_state("v", 0xd),
            chip8.get_state("v", 0xe),
            chip8.get_state("v", 0xf),
        ])
    );

    requestAnimationFrame(emuLoop);
};

requestAnimationFrame(emuLoop);
