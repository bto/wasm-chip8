import * as React from "react";
import useMessage from "../hooks/useMessage";

const component: React.FC = () => {
    const [message, change, send] = useMessage();

    return (
        <div>
            Message {message}
            <input type="text" onChange={change} />
            <button onClick={send} />
        </div>
    );
};

export default component;
