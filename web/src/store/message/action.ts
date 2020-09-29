import * as Redux from "redux";
import ActionType from "./actionType";

export interface SendAction extends Redux.Action {
    type: ActionType.SEND;
    payload: {
        message: string;
    };
}

export type Action = SendAction;

export default Action;
