import { State } from "@/models/state";

export default {
    getTheme(state: State) {
        return state.theme;
    },
    getContent(state: State) {
        return state.content;
    },
};
