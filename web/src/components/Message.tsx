import * as React from "react";
import { Message } from "../hooks/useMessage";

type Props = {
    content: string;
    message: Message;
};

const component: React.FC<Props> = (props: Props) => (
    <div>
        Message {props.content}
        <input type="text" onChange={props.message.change} />
        <button onClick={props.message.send} />
    </div>
);

export default component;
