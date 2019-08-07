import { State } from "@/models/state";

export default {
    SET_THEME(state: State, theme: string) {
        state.theme = theme;
    },
    EDIT_CONTENT(state: State, text: string) {
        state.content = text;
    },
};
