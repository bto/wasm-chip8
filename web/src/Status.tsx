import * as React from "react";

interface Props {
    status: {
        v: number[];
        i: number;
        sp: number;
        pc: number;
    };
}

export default class Status extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div>
                <div>{this.props.status.i}</div>
                <div>{this.props.status.sp}</div>
                <div>{this.props.status.pc}</div>
            </div>
        );
    }
}
