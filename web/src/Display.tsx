import * as React from "react";

export interface Value {
    content: string;
}

interface Props {
    value: Value;
}

export class Component extends React.Component<Props> {
    render(): React.ReactNode {
        return <pre>{this.props.value.content}</pre>;
    }
}
