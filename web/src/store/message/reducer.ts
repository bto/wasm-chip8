import * as Redux from "redux";
import Action from "./Action";
import ActionType from "./ActionType";
import State from "./State";

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
