import * as Redux from "redux";
import AppAction from "./action";
import AppActionType from "./actionType";

export type State = {
    text: string;
};

export const initState: State = {
    text: "",
};

export const reducer: Redux.Reducer<State, AppAction> = (
    state = initState,
    action: AppAction
): State => {
    switch (action.type) {
        case AppActionType.TEST_TEXT:
            return {
                ...state,
                text: action.payload.text,
            };
        default:
            return state;
    }
    return state;
};

export default reducer;
