<template>
  <div id="main-wrap" >
    <div class="is-flex is-justify-content-center flex-">
      <img alt="Vue logo" src="./assets/logo.png" style="height: 10vh; min-height: 60px">
    </div>

    <AzureToAppSettings/>


  </div>
  <SlantedBackground/>
</template>

<script>

import AzureToAppSettings from "@/components/AzureToAppSettings";
import SlantedBackground from "@/components/SlantedBackground";

export default {
  name: 'App',
  components: {
    SlantedBackground,
    AzureToAppSettings,
  },
  data() {
    return {
      test: ""
    }
  },
  beforeCreate() {
    this.$oruga.config = {}
  },
  methods: {
    clicked() {
      this.test = "poop" + Math.random()
    }
  }
}
</script>

<style>
#app, body, button, input, optgroup, select {
  font-family: 'Nunito', Avenir, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#main-wrap {
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px
}

:root {
  --oruga-variant-primary: #287761;
  --oruga-variant-primary-invert: #42C3A0;
}

.o-field__label {
  mix-blend-mode: multiply;
}

/*
Fix broken number formatting
 */
.token.number {
  align-items: inherit!important;
  background: none!important;
  border-radius: 0!important;
  display: inline!important;
  font-size: inherit!important;
  height: inherit!important;
  margin-right: inherit!important;
  min-width: 2.5em;
  padding: 0!important;
  text-align: inherit!important;
  vertical-align: top;
}
.switch-button i.mdi:before{
  font-size: 18px!important;
  margin-right: 5px!important;
}
</style>
