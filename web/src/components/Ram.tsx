import * as React from "react";

type Props = {
    ram: number[];
};

const component: React.FC<Props> = (props: Props) => <pre>ram: {props.ram[0]}</pre>;

export default component;
