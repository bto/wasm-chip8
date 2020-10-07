import * as React from "react";
import useMessage from "../hooks/useMessage";

const component: React.FC = () => {
    const [message, Message] = useMessage();

    return (
        <div>
            Message {message}
            <input type="text" onChange={Message.change} />
            <button onClick={Message.send} />
        </div>
    );
};

export default component;
