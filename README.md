# Markdown Note Taker

This is a very simple project that I developed using software I built while developing my blog. 

It uses a container-fluid layout to maximize space with editing markdown and previewing, as that is its purpose.

It also saves user input, so the user can close the browser page and reopen it later (on the same browser), and the content will be there. It is stored in the browser's local storage.

Some features of this markdown viewer: 

- Insert emojis like this: :thinking:
- KaTeX support for fast math rendering, both inline and blocks (\$, \$\$)
- Syntax highlighting with PrismJS
- Monaco Editor for actual code editing
- Fira code with font ligatures
- Light/dark theme (dark based off of Dracula)

It is built with VueJS in TypeScript, and uses Vuex for state management. Thank you to open source technology for making this possible.

## Future

Right now it's easy for anyone to just build this and use it as a static site. While the local storage feature in the browser is nice, maybe I will create a different version of this app to be server based so that users can log in, have notes in the 'cloud', and have the ability to download markdown files. Loads of things I could do with this, but for now this is just a simple frontend static webpage note taker.
