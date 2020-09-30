import * as React from "react";
import * as ReactRedux from "react-redux";
import { State } from "../store";
import * as ActionCreator from "../store/message/ActionCreator";

const component: React.FC = () => {
    const [message, setMessage] = React.useState("");
    const messageState = ReactRedux.useSelector(
        (state: State) => state.message.message
    );
    const dispatch = ReactRedux.useDispatch();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage(event.target.value);
    };

    const onClick = (): void => {
        dispatch(ActionCreator.send(message));
    };

    return (
        <div>
            Message {messageState}
            <input type="text" value={message} onChange={onChange} />
            <button onClick={onClick} />
        </div>
    );
};

export default component;
