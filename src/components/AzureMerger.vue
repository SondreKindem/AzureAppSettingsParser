<script>
import CodeEditor from "@/components/CodeEditor.vue";
import {stripComments} from "@/helpers";

export default {
  name: "AzureMerger",
  components: {CodeEditor},
  data() {
    return {
      input: '',
      yep: null,
    }
  },
  methods: {
    mergeToResult() {
      const unparsed = this.$refs.inputEditor.code
      const stripped = stripComments(unparsed)
      const parsedInput = JSON.parse(stripped)

      if ((this.yep && Array.isArray(this.yep)) || (!this.yep && Array.isArray(parsedInput))) {
        // We list
        if (this.yep) {
          parsedInput.filter(x => !x.name || !this.yep.some(existing => existing.name === x.name)).forEach(x => this.yep.push(x))
        } else {
          this.yep = [...(this.yep ?? []), ...parsedInput]
        }
      } else {
        // We object
        this.yep = {...(this.yep ?? {}), ...parsedInput}
      }

      this.$refs.inputEditor.clear()
    },
    azureChanged(e) {
      this.input = e
    },
  }
}
</script>

<template>
  <o-field label="Input" class="text-outlined">
    <CodeEditor ref="inputEditor" @input="azureChanged" placeholder="Paste azure app settings here :)"/>
  </o-field>

  <div class="is-flex is-justify-content-center">
    <o-button icon-pack="mdi" icon-left="sync" icon-left-class="is-spin" @click="mergeToResult" class="mb-1"
              variant="primary">Add to result
    </o-button>
  </div>

  <o-field :label="`Result`" class="text-outlined">
    <CodeEditor :value="JSON.stringify(yep, null, 2)" readonly ref="resultEditor"/>
  </o-field>
</template>

<style scoped>

</style>