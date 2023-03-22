<template>
  <o-field label="Input" class="text-outlined">
    <CodeEditor ref="azureEditor" @input="azureChanged" placeholder="Paste azure app settings here :)"/>
  </o-field>

  <p class="has-text-weight-semibold has-text-danger-dark">
    <span v-if="errorMessage">{{ errorMessage }}</span>
    <span v-else>&nbsp;</span>
  </p>

  <div class="is-flex is-justify-content-center" v-for="(item, index) in this.vars" v-bind:key="index">
    <o-field label="Key">
      <o-input v-on:change="e => addKey(index, e)">{{ item.key }}</o-input>
    </o-field>
    <o-field label="New value">
      <o-input v-on:change="e => addValue(index, e)">{{ item.value }}</o-input>
    </o-field>
  </div>

  <o-button @click="() => this.addVar()">Add</o-button>

  <div class="is-flex is-justify-content-center">
    <o-button icon-pack="mdi" icon-left="sync" icon-left-class="is-spin" @click="convert" class="mb-1"
              variant="primary">Replace all
    </o-button>
  </div>

  <o-field label="Result" class="text-outlined">
    <CodeEditor :value="result" readonly/>
  </o-field>
</template>

<script>
import CodeEditor from "@/components/CodeEditor";
import {Modes} from "@/helpers";

export default {
  name: "AzureReplacer",
  components: {CodeEditor},
  data() {
    return {
      input: '',
      result: '',
      inputs: 1,
      vars: {
        1: {value: "", key: ""}
      },
      errorMessage: "",
      mode: Modes.Azure,
      Modes
    }
  },
  methods: {
    azureChanged(e) {
      this.input = e
    },
    addVar() {
      this.vars[this.inputs + 1] = {value: "", key: ""}
      this.inputs += 1
    },
    addKey(idx, e) {
      console.log(e)
      if (!this.vars[idx])
        this.vars[idx] = {}
      this.vars[idx]["key"] = e.target.value
    },
    addValue(idx, e) {
      if (!this.vars[idx])
        this.vars[idx] = {}
      this.vars[idx]["value"] = e.target.value
    },
    modeChanged(val) {
      this.mode = val ? Modes.AppSettings : Modes.Azure
      this.$refs.azureEditor.clear()
    },
    convert() {
      const unparsed = this.$refs.azureEditor.code
      let parsed = ""
      try {
        parsed = JSON.parse(unparsed)
      } catch (e) {
        this.errorMessage = "Error parsing json: " + e.message
        return
      }
      if (!parsed) {
        this.errorMessage = "Json was not parsed"
        return
      }

      for (const val of parsed) {
        for (const replacer of Object.values(this.vars)) {
          if (replacer.key && replacer.key !== "") {
            if (replacer.key === val.name) {
              val.value = replacer.value
            }
          }
        }
      }
      this.result = JSON.stringify(parsed, null, 2)
    },
  }
}
</script>

<style scoped>

</style>