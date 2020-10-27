import * as React from "react";
import { Props } from "../containers/Register";
import EmuUtil from "../EmuUtil";

const component: React.FC<Props> = ({ i, sp, pc, v }: Props) => {
    const util = new EmuUtil();

    const vregisters = [];
    for (let i = 0; i <= 0xf; i++) {
        vregisters.push(
            <div>
                V{util.toHex(i)}: 0x{util.toHex(v[i], 2)}
            </div>
        );
    }

    return (
        <div>
            {vregisters}
            <div>I: 0x{util.toHex(i, 3)}</div>
            <div>SP: 0x{util.toHex(sp, 3)}</div>
            <div>PC: 0x{util.toHex(pc, 3)}</div>
        </div>
    );
};

export default component;
