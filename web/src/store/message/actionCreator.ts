import * as Action from "./action";
import ActionType from "./actionType";

export function send(message: string): Action.SendAction {
    return {
        type: ActionType.SEND,
        payload: {
            message,
        },
    };
}
