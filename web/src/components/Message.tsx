import * as React from "react";

type Props = {
    message: string;
};

const component: React.FC<Props> = (props: Props) => {
    return <div>Message, {props.message}</div>;
};

export default component;
