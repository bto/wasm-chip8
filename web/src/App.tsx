import * as React from "react";
import * as ReactDOM from "react-dom";
import { Chip8 } from "./wasm/chip8";
import Display from "./Display";
import Status from "./Status";

type State = {
    display: {
        content: string;
    };
    status: {
        v: number[];
        i: number;
        sp: number;
        pc: number;
    };
};

export default class App extends React.Component<unknown, State> {
    chip8: Chip8;

    constructor(props: unknown) {
        super(props);

        this.state = {
            display: {
                content: "",
            },
            status: {
                v: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                i: 0,
                sp: 0,
                pc: 0,
            },
        };

        this.chip8 = Chip8.new();
        requestAnimationFrame(this.renderLoop);
    }

    renderLoop = (): void => {
        const chip8 = this.chip8;

        chip8.run();

        if (chip8.vram_changed) {
            this.setState({
                display: {
                    content: chip8.render(),
                },
            });
        }

        this.setState({
            status: {
                v: [
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
                ],
                i: chip8.i,
                sp: chip8.sp,
                pc: chip8.pc,
            },
        });

        requestAnimationFrame(this.renderLoop);
    };

    render(): React.ReactNode {
        const state = this.state;

        return (
            <div>
                <h1>CHIP-8 emulator</h1>
                <Display value={state.display} />
                <Status value={state.status} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
