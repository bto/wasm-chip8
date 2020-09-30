import * as React from "react";
import { Props } from "../containers/Message";

const component: React.FC<Props> = (props: Props) => {
    const [message, setMessage] = React.useState("");

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage(event.target.value);
    };

    const onClick = (): void => {
        props.send(message);
    };

    return (
        <div>
            Message {props.message}
            <input type="text" value={message} onChange={onChange} />
            <button onClick={onClick} />
        </div>
    );
};

export default component;
