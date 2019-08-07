export default {
    setTheme({ commit }: { commit: any }, theme: string) {
        commit("SET_THEME", theme);
    },
    editContent({ commit }: { commit: any }, text: string) {
        commit("EDIT_CONTENT", text);
    },
};
