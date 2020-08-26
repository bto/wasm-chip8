import { Chip8 } from "wasm-chip8";

const pre = document.getElementById("display");
const chip8 = Chip8.new();

document.body.addEventListener("keydown", event => {
    switch (event.key) {
        case 'x':
            chip8.set_key(0x00);
            break;
        case '1':
            chip8.set_key(0x01);
            break;
        case '2':
            chip8.set_key(0x02);
            break;
        case '3':
            chip8.set_key(0x03);
            break;
        case 'q':
            chip8.set_key(0x04);
            break;
        case 'w':
            chip8.set_key(0x05);
            break;
        case 'e':
            chip8.set_key(0x06);
            break;
        case 'a':
            chip8.set_key(0x07);
            break;
        case 's':
            chip8.set_key(0x08);
            break;
        case 'd':
            chip8.set_key(0x09);
            break;
        case 'z':
            chip8.set_key(0x0A);
            break;
        case 'c':
            chip8.set_key(0x0B);
            break;
        case '4':
            chip8.set_key(0x0C);
            break;
        case 'r':
            chip8.set_key(0x0D);
            break;
        case 'f':
            chip8.set_key(0x0E);
            break;
        case 'v':
            chip8.set_key(0x0F);
            break;
    }
    alert(event.key);
});

const renderLoop = () => {
    if (chip8.key_waiting) {
        requestAnimationFrame(renderLoop);
    }

    chip8.run();

    if (chip8.vram_changed) {
        pre.textContent = chip8.render();
    }

    requestAnimationFrame(renderLoop);
};

requestAnimationFrame(renderLoop);
