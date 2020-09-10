import * as React from "react";

type Props = {
    value: {
        v: number[];
        i: number;
        sp: number;
        pc: number;
    };
};

const Component = (props: Props): JSX.Element => {
    const value = props.value;
    return (
        <div>
            <div>{value.i}</div>
            <div>{value.sp}</div>
            <div>{value.pc}</div>
        </div>
    );
};

export default Component;
