import * as React from "react";
import * as ReactRedux from "react-redux";
import { actions, State } from "../store";

export type Message = {
    change: (event: React.ChangeEvent<HTMLInputElement>) => void;
    send: () => void;
};

export const useMessage = (): [string, Message] => {
    const [message, setMessage] = React.useState<string>("");
    const currentMessage = ReactRedux.useSelector(
        (state: State) => state.message.message
    );
    const dispatch = ReactRedux.useDispatch();

    const change = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage(event.target.value);
    };

    const send = (): void => {
        dispatch(actions.message.send(message));
    };

    return [currentMessage, { change, send }];
};

export default useMessage;
