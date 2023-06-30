<template>
  <div class="is-flex is-justify-content-center m-5">
    <SwitchButton @modeChange="modeChanged($event)"/>
  </div>

  <o-field label="Input" class="text-outlined">
    <CodeEditor ref="azureEditor" @input="azureChanged"
                :placeholder="mode === Modes.Azure ? 'Paste azure app settings here :)' : 'Paste appsettings.json here :)'"/>
  </o-field>

  <p class="has-text-weight-semibold has-text-danger-dark">
    <span v-if="errorMessage">{{ errorMessage }}</span>
    <span v-else>&nbsp;</span>
  </p>

  <div class="is-flex is-justify-content-center">
    <o-button icon-pack="mdi" icon-left="sync" icon-left-class="is-spin" @click="convert" class="mb-1"
              variant="primary">Convert
    </o-button>
    <o-button icon-pack="mdi" icon-left="content-copy" icon-left-class="is-spin" @click="copyResult" class="mb-1 ml-2"
              variant="primary">Copy result
    </o-button>
  </div>

  <o-field label="Result" class="text-outlined">
    <CodeEditor :value="result" readonly/>
  </o-field>
</template>

<script>
import CodeEditor from "@/components/CodeEditor";
import {convertAppSettingsJson, convertAzureJson, Modes, stripComments, validateAzureJson} from "@/helpers";
import SwitchButton from "@/components/SwitchButton";

export default {
  name: "AzureToAppSettings",
  components: {SwitchButton, CodeEditor},
  data() {
    return {
      input: '',
      result: '',
      errorMessage: "",
      mode: Modes.Azure,
      Modes
    }
  },
  methods: {
    azureChanged(e) {
      this.input = e
    },
    modeChanged(val) {
      this.mode = val ? Modes.AppSettings : Modes.Azure
      this.$refs.azureEditor.clear()
    },
    convert() {
      if (this.mode === Modes.Azure) {
        this.convertAzure()
      } else {
        this.convertAppSettings()
      }
    },
    copyResult(){
      navigator.clipboard.writeText(this.result)
      this.$oruga.notification.open('Copied!')
    },
    convertAppSettings() {
      try {
        const unparsed = this.$refs.azureEditor.code

        let parsed = ""
        try {
          const stripped = stripComments(unparsed)
          parsed = JSON.parse(stripped)
        } catch (e) {
          this.errorMessage = "Error parsing json: " + e.message
          return
        }

        if (!parsed) {
          this.errorMessage = "Json was not parsed"
          return
        }

        this.result = JSON.stringify(convertAppSettingsJson(parsed), null, 2)

      } catch (e) {console.log(e)
        this.errorMessage = "Error converting json: " + e.message

      }
    },
    convertAzure() {
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
.toast-notification {
  margin: 0.5em 0;
  text-align: center;
  box-shadow: 0 1px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
  border-radius: 2em;
  padding: 0.75em 1.5em;
  pointer-events: auto;
  color: rgba(0, 0, 0, 0.7);
  background: #ffdd57;
}
</style>