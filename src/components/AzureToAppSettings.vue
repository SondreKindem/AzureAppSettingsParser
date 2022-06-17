<template>
  <o-field label="Input">
    <CodeEditor ref="azureEditor" value="{}" @input="azureChanged"/>
  </o-field>

  <o-button @click="convert">Convert</o-button>

  <o-field label="Result">
    <CodeEditor :value="result" readonly/>
  </o-field>
</template>

<script>
import CodeEditor from "@/components/CodeEditor";

export default {
  name: "AzureToAppSettings",
  components: {CodeEditor},
  data() {
    return {
      azure: '{}',
      result: 'a',
      ayy: "",
    }
  },
  methods: {
    azureChanged(e) {
      this.azure = e
    },
    convert() {
      const unparsed = this.$refs.azureEditor.code
      this.result = unparsed
      console.log(this.$refs.azureEditor.code)
    }
  }
}
</script>

<style scoped>

</style>