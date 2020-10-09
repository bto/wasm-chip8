import { Chip8 } from "./wasm/chip8";
import { actions, store } from "./redux";

const chip8 = Chip8.new();

const emuLoop = (): void => {
    chip8.run();
    console.log(chip8);

    if (chip8.vram_changed) {
        store.dispatch(actions.vram.set(chip8.render()));
    }

    requestAnimationFrame(emuLoop);
};

requestAnimationFrame(emuLoop);
