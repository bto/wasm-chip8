import * as Action from "./Action";
import ActionType from "./ActionType";

export const send = (message: string): Action.SendAction => ({
    type: ActionType.SEND,
    payload: {
        message,
    },
});
