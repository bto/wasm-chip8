import * as ReduxToolkit from "@reduxjs/toolkit";

interface State {
    i: number;
    sp: number;
    pc: number;
    v: number[];
}

const initialState: State = {
    i: 0,
    sp: 0,
    pc: 0,
    v: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

export default ReduxToolkit.createSlice({
    name: "register",
    initialState,
    reducers: {
        setI(state, action: ReduxToolkit.PayloadAction<number>) {
            state.i = action.payload;
        },
        setPC(state, action: ReduxToolkit.PayloadAction<number>) {
            state.pc = action.payload;
        },
        setSP(state, action: ReduxToolkit.PayloadAction<number>) {
            state.sp = action.payload;
        },
        setV(state, action: ReduxToolkit.PayloadAction<number[]>) {
            state.v = action.payload;
        },
    },
});
