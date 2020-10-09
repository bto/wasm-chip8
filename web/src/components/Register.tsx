import * as React from "react";

type Props = {
    register: {
        i: number;
        pc: number;
        sp: number;
    };
};

const component: React.FC<Props> = (props: Props) => (
    <div>
        <div>i: {props.register.i}</div>
        <div>sp: {props.register.sp}</div>
        <div>pc: {props.register.pc}</div>
    </div>
);

export default component;
