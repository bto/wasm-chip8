import * as React from "react";
import { Chip8 } from "./wasm/chip8";
import Display from "./Display";

interface State {
    displayContext: string;
}

export default class App extends React.Component<unknown, State> {
    chip8: Chip8;

    constructor(props: unknown) {
        super(props);

        this.state = {
            displayContext: "",
        };

        import("./wasm/chip8").then((mod) => {
            this.chip8 = mod.Chip8.new();
            requestAnimationFrame(this.renderLoop);
        });
    }

    renderLoop = (): void => {
        const chip8 = this.chip8;

        chip8.run();

        if (chip8.vram_changed) {
            this.setState({
                displayContext: chip8.render(),
            });
        }

        requestAnimationFrame(this.renderLoop);
    };

    render(): React.ReactNode {
        return (
            <div>
                <h1>CHIP-8 emulator</h1>
                <Display displayContext={this.state.displayContext} />
            </div>
        );
    }
}
