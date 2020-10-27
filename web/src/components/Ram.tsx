import * as React from "react";
import { Props } from "../containers/Ram";

const component: React.FC<Props> = ({ mod, pc, ram }: Props) => {
    const items = [];
    for (let i = 0; i <= 20; i++) {
        const addr = pc + i * 2;
        items.push(`${mod.toHex(addr, 3)}: ${mod.decode(ram, addr)}`);
        items.push(<br />);
    }

    return <div>{items}</div>;
};

export default component;
