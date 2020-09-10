import * as React from "react";

type Props = {
    value: {
        content: string;
    };
};

const Component = (props: Props): JSX.Element => {
    const value = props.value;
    return <pre>{value.content}</pre>;
};

export default Component;
