import * as Redux from "redux";

export type State = {
    text: string;
};

export const initState: State = {
    text: "",
};

export const reducer: Redux.Reducer<State> = (state = initState): State => {
    return state;
};

export default reducer;
