import * as React from "react";
import { Props } from "../containers/Ram";
import EmuUtil from "../EmuUtil";

const component: React.FC<Props> = ({ ram }: Props) => {
    const util = new EmuUtil();

    return (
        <div id="ram-component">
            <h2>メモリ</h2>
            <div id="ram-content">
                {ram.map((_, i) => {
                    if (i % 2 == 1) return;
                    return (
                        <div key={i}>
                            0x{util.toHex(i + 0x200, 3)}: {util.decode(ram, i)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default component;
