import * as React from "react";
import { Props } from "../containers/Ram";
import EmuUtil from "../EmuUtil";

const component: React.FC<Props> = ({ pc, ram }: Props) => {
    const util = new EmuUtil();

    return (
        <div>
            <h2>メモリ</h2>
            {ram.slice(pc, pc + 40).map((_, i) => {
                const addr = pc + i;
                if (addr % 2 == 1) return;
                return (
                    <div key={addr}>
                        0x{util.toHex(addr, 3)}: {util.decode(ram, addr)}
                    </div>
                );
            })}
        </div>
    );
};

export default component;
