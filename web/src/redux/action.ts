import * as Redux from "redux";

export enum AppActionType {
    TEST_TEXT = "TEST_TEXT",
}

export interface AppActionTest extends Redux.Action {
    type: AppActionType.TEST_TEXT;
    payload: {
        text: string;
    };
}

export type AppAction = AppActionTest;

export default AppAction;
