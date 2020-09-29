import * as Redux from "redux";
import Action from "./action";
import ActionType from "./actionType";
import State from "./state";

const initState: State = {
    message: "",
};

const reducer: Redux.Reducer<State, Action> = (
    state = initState,
    action: Action
): State => {
    switch (action.type) {
        case ActionType.SEND:
            return {
                ...state,
                message: action.payload.message,
            };
        default:
            return state;
    }
};

export default reducer;
