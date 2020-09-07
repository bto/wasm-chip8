import * as React from "react";

interface Props {
    displayContext: string;
}

export default class Display extends React.Component<Props> {
    render(): React.ReactNode {
        return <pre>{this.props.displayContext}</pre>;
    }
}
