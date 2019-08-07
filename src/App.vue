<template>
    <div id="app">
        <link rel="stylesheet" :href="cssUrl" data-noprefix />
        <div :class="getTheme">
            <div class="jumbotron jumbotron-fluid" :class="getTheme" ref="jumbotron">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <Editor
                                :height="height"
                                :width="width"
                                v-model="content"
                                :initialContent="content"
                            />
                        </div>
                        <div class="col preview" ref="editcol" :class="theme" style="padding: 0px;">
                            <!-- <p>Foobar</p> -->
                            <Preview :content="content"></Preview>
                        </div>
                    </div>
                    <transition name="fade">
                        <font-awesome-icon class="themebtn" @click="changeTheme" :icon="icon"></font-awesome-icon>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script <script lang="ts">
import { State, Getter, Action } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import BootstrapVue from "bootstrap-vue";
import Editor from "./components/Editor.vue";
import Preview from "./components/Preview.vue";

@Component({
    components: {
        Editor,
        Preview
    }
})
export default class App extends Vue {
    public $refs: {
        editcol: HTMLDivElement;
        editor: any;
        jumbotron: HTMLDivElement;
    };
    @Action("setTheme") protected setTheme: any;
    protected editor = null;
    protected width: number | null;
    protected height: number | null;
    protected renderedContent: string;
    private options = {
        fontLigatures: true,
        fontFamily: "Fira Code",
        wordWrap: true,
        minimap: { enabled: true }
    };
    @Getter("getTheme") private getTheme: string;

    constructor() {
        super();
        this.renderedContent = "";
        this.width = null;
        this.height = null;
    }

    protected changeTheme() {
        this.getTheme === "light"
            ? this.setTheme("dark")
            : this.setTheme("light");
    }

    get icon() {
        return this.getTheme === "light" ? "sun" : "moon";
    }

    get cssUrl() {
        return this.getTheme === "light"
            ? "https://cdn.jsdelivr.net/gh/PrismJS/prism-themes/themes/prism-base16-ateliersulphurpool.light.css"
            : "https://cdn.jsdelivr.net/gh/dracula/prism/css/dracula-prism.css";
    }

    get theme() {
        return this.$store.getters.getTheme;
    }

    get content() {
        return this.$store.getters.getContent;
    }
    set content(val) {
        this.$store.dispatch("editContent", val);
    }

    protected updateDimensions() {
        if (this.$refs.editcol) {
            this.width = this.$refs.editcol.clientWidth;
        }
        this.height = window.innerHeight - 128;
    }

    protected mounted() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
        this.width = this.$refs.editcol.clientWidth;
        this.height = this.$refs.editcol.clientHeight;
        this.updateDimensions();
    }
}
</script>


<style lang="sass">
@import url("https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css")
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap')
// https://stackoverflow.com/questions/3245141/using-otf-fonts-on-web-browsers#3245187
@font-face 
    font-family: "Fira Code"
    src: url("https://cdn.jsdelivr.net/gh/tonsky/FiraCode@0.2.1/FiraCode-Regular.otf") format("opentype")
code
    font-family: "Fira Code" !important
blockquote 
  margin: 0 auto
  padding: 1em
  border-left: 5px solid

blockquote:before 
  display: none

blockquote:not(:first-of-type) 
  margin-top: .5em

blockquote p 
  font-size: 12pt
  line-height: 1.4

blockquote footer:before 
  content: '— '

blockquote:nth-of-type(even) 
  text-align: right
  border-left: none
  border-right: 5px solid

blockquote:nth-of-type(even) footer 
  text-align: right

blockquote:nth-of-type(even) footer:before 
  content: ''

blockquote:nth-of-type(even) footer:after 
  content: ' —'

@element 'blockquote' and (min-width: 300px) 
  blockquote 
    padding: 1em 20% 1em 1em
  
  blockquote p 
    font-size: 14pt
  
  blockquote:nth-of-type(even) 
    padding: 1em 1em 1em 20%

.emoji
    height: 1.2em !important
    width: 1.2em !important
.themebtn
    position: absolute
    top: 0
    right: 0
    margin: 20px
    cursor: pointer
html, body
    height: 100vh
    font-family: Open Sans !important
    overflow: hidden
.jumbotron
    height: 100vh
    position: relative
    transition: 0.5s
    -webkit-transition: 0.5s
    overflow: auto
    // padding-bottom: 100px !important
.jumbotron::-webkit-scrollbar
    width: 10px
.jumbotron::-webkit-scrollbar-thumb
    border-radius: 10px
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)

.jumbotron::-webkit-scrollbar-track
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)

.preview
    overflow-y: auto
    overflow-x: auto
    border-radius: 5px

.preview::-webkit-scrollbar
    width: 10px

.preview::-webkit-scrollbar-thumb
    border-radius: 10px
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)

.preview::-webkit-scrollbar-track
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)

.light
    .preview
        background-color: #FFFFFE !important
    .preview::-webkit-scrollbar-thumb
        background-color: #dddddd
    .jumbotron::-webkit-scrollbar-thumb
        background-color: #dddddd
    .button
        background-color: white !important
    .title
        border-color: white !important
        background-color: white !important
.dark
    background-color: #20212B !important
    color: white
    .preview
        background-color: #2a2c39 !important
    .preview::-webkit-scrollbar-thumb
        background-color: #3e404c
    .jumbotron::-webkit-scrollbar-thumb
        background-color: #3e404c
    .button
        background-color: #2a2c39 !important
    .title
        border-color: #2a2c39 !important
        background-color: #20212B !important
    transition: 0.5s
    -webkit-transition: 0.5s
    
.fade-enter-active, .fade-leave-active 
    transition: opacity 0.5s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    opacity: 0
</style>
