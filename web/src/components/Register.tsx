import * as React from "react";

type Props = {
    i: number;
    pc: number;
    sp: number;
};

const component: React.FC<Props> = (props: Props) => (
    <div>
        <div>i: {props.i}</div>
        <div>sp: {props.sp}</div>
        <div>pc: {props.pc}</div>
    </div>
);

export default component;
