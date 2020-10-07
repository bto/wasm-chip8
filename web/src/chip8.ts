import { Chip8 } from "./wasm/chip8";

const emuLoop = (): void => {
    const chip8 = Chip8.new();

    chip8.run();
    console.log(chip8);

    requestAnimationFrame(emuLoop);
};

requestAnimationFrame(emuLoop);
