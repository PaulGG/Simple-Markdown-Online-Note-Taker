<template>
    <div id="preview">
        <div class="break" v-html="renderedContent"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { md } from "../mdparser";

@Component
export default class Preview extends Vue {
    @Prop(String) protected content: string;
    protected renderedContent: string;
    protected renderedTitle: string;
    protected localContent: string;

    constructor() {
        super();
        this.renderedContent = "";
        if (this.content) {
            this.localContent = this.content;
            this.renderedContent = md.render(this.localContent);
        } else {
            this.localContent = "";
        }
    }

    @Watch("content")
    protected test(val: string, oldVal: string) {
        try {
            this.renderedContent = md.render(val);
        } catch (__) {
            // nothing
        }
    }
}
</script>

<style scoped lang="sass">   
.break
    position: absolute
    width: 100%
    word-wrap: break-word
    margin: 0px
    padding: 20px
</style>