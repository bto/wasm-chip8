import * as React from "react";

type Props = {
    display: string;
};

const component: React.FC<Props> = (props: Props) => (
    <>
        <pre>{props.display}</pre>
        <canvas id="display"></canvas>
    </>
);

export default component;
