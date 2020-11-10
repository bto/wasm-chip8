import * as React from "react";
import { Props } from "../containers/Ram";
import EmuUtil from "../EmuUtil";

const component: React.FC<Props> = ({ pc, ram }: Props) => {
    const util = new EmuUtil();

    const current = pc - 0x200;
    const ramContent: JSX.Element[] = [];
    for (let i = 0; i < ram.length; i += 2) {
        let className = "";
        if (i == current) {
            className = "ram-current";
        }

        ramContent.push(
            <div key={i} className={className}>
                0x{util.toHex(i + 0x200, 3)}: {util.decode(ram, i)}
            </div>
        );
    }

    return (
        <div id="ram-component">
            <h2>メモリ</h2>
            <div id="ram-content">{ramContent}</div>
        </div>
    );
};

export default component;
