import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { State } from "@/models/state";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

function defaultState(): State {
    return {
        theme: "light",
        content: `
# Welcome to the Markdown Editor!\n
This is a simple markdown editor that you can use online to write stuff.\n
Anything you write in here is saved after browser refresh (in your browser's Local Storage).\n
You can write math like this:\n
$x+y=z$\n
or like this:\n
$$\n
\\int_0^\\infty{-\\frac{1}{x^2}}\n
$$\n
You can insert code snippets (with syntax highlighting) like this:\n
\`\`\`python
while True: print("Hello World!")
\`\`\`\n
You can use the toolbar above to insert links, emojis, and other text styles.\n
Emojis use the following syntax (without spaces):\n
: thinking : <code style="color: white">=></code> :thinking:\n
Because this editor uses the same editor found in Visual Studio Code, things like CTRL+Z work to undo!
There have also been keyboard shortcuts added to bold, italicize, and underline.\n
Keep in mind that Markdown is a superset of HTML, so you can insert custom
HTML and inline CSS styles into this previewer.\n
Lastly (but most importantly), there is a light theme and a dark theme. :)\n
Happy note taking!\n
        `,
    };
}

export default new Vuex.Store({
    state: defaultState(),
    plugins: [createPersistedState({
        paths: [
            "theme",
            "content",
        ]
    })],
    mutations,
    actions,
    getters
});
