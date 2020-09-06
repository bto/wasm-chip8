import { Chip8 } from "wasm-chip8";

const displayElement = document.getElementById("display");
const chip8 = Chip8.new();

document.body.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "x":
      chip8.set_key(0x00);
      break;
    case "1":
      chip8.set_key(0x01);
      break;
    case "2":
      chip8.set_key(0x02);
      break;
    case "3":
      chip8.set_key(0x03);
      break;
    case "q":
      chip8.set_key(0x04);
      break;
    case "w":
      chip8.set_key(0x05);
      break;
    case "e":
      chip8.set_key(0x06);
      break;
    case "a":
      chip8.set_key(0x07);
      break;
    case "s":
      chip8.set_key(0x08);
      break;
    case "d":
      chip8.set_key(0x09);
      break;
    case "z":
      chip8.set_key(0x0a);
      break;
    case "c":
      chip8.set_key(0x0b);
      break;
    case "4":
      chip8.set_key(0x0c);
      break;
    case "r":
      chip8.set_key(0x0d);
      break;
    case "f":
      chip8.set_key(0x0e);
      break;
    case "v":
      chip8.set_key(0x0f);
      break;
  }
});

const renderLoop = () => {
  if (chip8.key_waiting) {
    requestAnimationFrame(renderLoop);
  }

  chip8.run();

  document.getElementById("v0").textContent = chip8.get_state("v", 0x0);
  document.getElementById("v1").textContent = chip8.get_state("v", 0x1);
  document.getElementById("v2").textContent = chip8.get_state("v", 0x2);
  document.getElementById("v3").textContent = chip8.get_state("v", 0x3);
  document.getElementById("v4").textContent = chip8.get_state("v", 0x4);
  document.getElementById("v5").textContent = chip8.get_state("v", 0x5);
  document.getElementById("v6").textContent = chip8.get_state("v", 0x6);
  document.getElementById("v7").textContent = chip8.get_state("v", 0x7);
  document.getElementById("v8").textContent = chip8.get_state("v", 0x8);
  document.getElementById("v9").textContent = chip8.get_state("v", 0x9);
  document.getElementById("va").textContent = chip8.get_state("v", 0xa);
  document.getElementById("vb").textContent = chip8.get_state("v", 0xb);
  document.getElementById("vc").textContent = chip8.get_state("v", 0xc);
  document.getElementById("vd").textContent = chip8.get_state("v", 0xd);
  document.getElementById("ve").textContent = chip8.get_state("v", 0xe);
  document.getElementById("vf").textContent = chip8.get_state("v", 0xf);
  document.getElementById("index-register").textContent = chip8.get_state("i");
  document.getElementById("stack-pointer").textContent = chip8.get_state("sp");
  document.getElementById("program-counter").textContent = chip8.get_state(
    "pc"
  );

  if (chip8.vram_changed) {
    displayElement.textContent = chip8.render();
  }

  requestAnimationFrame(renderLoop);
};

requestAnimationFrame(renderLoop);
