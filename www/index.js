import { Chip8 } from "wasm-chip8";

const pre = document.getElementById("display");
const chip8 = Chip8.new();

const renderLoop = () => {
    pre.textContent = chip8.render();
    chip8.run();

    requestAnimationFrame(renderLoop);
};

requestAnimationFrame(renderLoop);
