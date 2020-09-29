import * as Redux from "redux";
import { AppActionTest, AppActionType } from "./action";

export type State = {
    text: string;
};

export const initState: State = {
    text: "",
};

export const reducer: Redux.Reducer<State, AppActionTest> = (
    state = initState,
    action: AppActionTest
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
