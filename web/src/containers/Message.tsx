import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import { Action, State } from "../store";
import * as ActionCreator from "../store/message/ActionCreator";
import Message from "../components/Message";

type MapState = {
    message: string;
};

const mapState = (state: State): MapState => ({
    message: state.message.message,
});

type MapDispatch = {
    send: (message: string) => void;
};

const mapDispatch = (dispatch: Redux.Dispatch<Action>): MapDispatch => ({
    send: (message: string) => {
        dispatch(ActionCreator.send(message));
    },
});

const connector = ReactRedux.connect<MapState, MapDispatch>(
    mapState,
    mapDispatch
);

export type Props = ReactRedux.ConnectedProps<typeof connector>;

const component: React.FC<Props> = (props: Props) => (
    <Message message={props.message} send={props.send} />
);

export default connector(component);
