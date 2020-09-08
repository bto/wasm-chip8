import * as React from "react";

export interface Value {
    content: string;
}

interface Props {
    value: Value;
}

export class Component extends React.Component<Props> {
    render(): React.ReactNode {
        const value = this.props.value;

        return <pre>{value.content}</pre>;
    }
}
