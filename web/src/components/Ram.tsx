import * as React from "react";
import { Props } from "../containers/Ram";
import EmuUtil from "../EmuUtil";

const component: React.FC<Props> = ({ pc, ram }: Props) => {
    const util = new EmuUtil();

    const items = [];
    for (let i = 0; i <= 20; i++) {
        const addr = pc + i * 2;
        items.push(`0x${util.toHex(addr, 3)}: ${util.decode(ram, addr)}`);
        items.push(<br />);
    }

    return <div>{items}</div>;
};

export default component;
