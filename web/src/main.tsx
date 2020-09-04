const wasm = import('./wasm/chip8.js');
wasm.then(mod => {
  mod.greet('foo');
});
