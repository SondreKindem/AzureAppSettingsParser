<template>
  <o-field label="Input">
    <CodeEditor ref="azureEditor" value="{}" @input="azureChanged"/>
  </o-field>

  <p class="has-text-weight-semibold has-text-danger-dark">
    <span v-if="errorMessage">{{ errorMessage }}</span>
    <span v-else>&nbsp;</span>
  </p>

  <o-button icon-pack="mdi" icon-left="sync" icon-left-class="is-spin" @click="convert" class="mb-5" variant="primary">Convert</o-button>

  <o-field label="Result">
    <CodeEditor :value="result" readonly/>
  </o-field>
</template>

<script>
import CodeEditor from "@/components/CodeEditor";
import {convertAzureJson, validateAzureJson} from "@/helpers";

export default {
  name: "AzureToAppSettings",
  components: {CodeEditor},
  data() {
    return {
      azure: '{}',
      result: '',
      errorMessage: "",
    }
  },
  methods: {
    azureChanged(e) {
      this.azure = e
    },
    convert() {
      try {
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

        if (validateAzureJson(parsed)) {
          this.result = JSON.stringify(convertAzureJson(parsed), null, 2)
        } else {
          this.errorMessage = "Json does not have correct syntax :("
          return
        }

        this.errorMessage = ""

      } catch (e) {
        this.errorMessage = "Error converting json: " + e.message
      }

    }
  }
}
</script>

<style scoped>

</style>