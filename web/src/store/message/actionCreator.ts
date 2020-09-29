import * as Action from "./action";
import ActionType from "./actionType";

export const send = (message: string): Action.SendAction => ({
    type: ActionType.SEND,
    payload: {
        message,
    },
});
