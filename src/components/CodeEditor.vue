<template>
  <prism-editor :placeholder="placeholder" :readonly="readonly" class="my-editor" :class="{'max-height': !expanded}" v-model="code"
                @input="handleInput"
                :highlight="highlighter" line-numbers></prism-editor>
</template>

<script>
// import Prism Editor
import {PrismEditor} from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.min.css'; // import syntax highlighting styles

export default {
  components: {
    PrismEditor,
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
  },

  beforeMount() {
    this.code = this.value
  },

  data: () => ({
    code: '{"test": "yep"}',
    expanded: false
  }),
  methods: {
    highlighter(code) {
      return highlight(code, languages.json, "json"); // languages.<insert language> to return html with markup
    },
    handleInput() {
      this.$emit('input', this.code)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.code = val
      },
      deep: true
    }
  }
};
</script>

<style>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #444444;
  color: #ccc !important;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.max-height {
  max-height: 30vh;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}

.prism-editor-wrapper .prism-editor__editor, .prism-editor-wrapper .prism-editor__textarea {
  color: red !important;
}
</style>