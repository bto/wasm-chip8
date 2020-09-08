import * as React from "react";

export interface Value {
    v: number[];
    i: number;
    sp: number;
    pc: number;
}

interface Props {
    value: Value;
}

export class Component extends React.Component<Props> {
    render(): React.ReactNode {
        const value = this.props.value;

        return (
            <div>
                <div>{value.i}</div>
                <div>{value.sp}</div>
                <div>{value.pc}</div>
            </div>
        );
    }
}
