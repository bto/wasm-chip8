import * as ReduxToolkit from "@reduxjs/toolkit";

export default ReduxToolkit.createSlice({
    name: "ram",
    initialState: [] as number[],
    reducers: {
        set: (_, action) => action.payload,
    },
});
