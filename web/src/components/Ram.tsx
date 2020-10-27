import * as React from "react";
import { Props } from "../containers/Ram";

const component: React.FC<Props> = ({ mod, pc, ram }: Props) => {
    const items = [];
    for (let i = 0; i <= 20; i++) {
        items.push(`${mod.toAddr(pc + i)}: ${mod.decode(ram, pc + i`)}`);
        items.push(<br />);
    }

    return <div>{items}</div>;
};

export default component;
