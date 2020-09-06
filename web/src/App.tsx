import * as React from "react";

export default class App extends React.Component {
    constructor(props: unknown) {
        super(props);

        import("./wasm/chip8").then((mod) => {
            const chip8 = mod.Chip8.new();
            console.log(chip8);
            const renderLoop = () => {
                chip8.run();
                requestAnimationFrame(renderLoop);
            };
            requestAnimationFrame(renderLoop);
        });
    }

    render(): React.ReactNode {
        return (
            <div>
                <h1>CHIP-8 emulator</h1>
            </div>
        );
    }
}
