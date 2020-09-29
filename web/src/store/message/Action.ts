import * as Redux from "redux";
import ActionType from "./ActionType";

export interface SendAction extends Redux.Action {
    type: ActionType.SEND;
    payload: {
        message: string;
    };
}

export type Action = SendAction;

export default Action;
