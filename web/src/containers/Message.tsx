import * as React from "react";
import Component from "../components/Message";
import useMessage from "../hooks/useMessage";

const container: React.FC = () => {
    const [content, message] = useMessage();
    return <Component content={content} message={message} />;
};

export default container;
