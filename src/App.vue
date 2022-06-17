<template>
  <div id="main-wrap" >
    <div class="is-flex is-justify-content-center flex-">
      <img alt="Vue logo" src="./assets/logo.png" style="height: 10vh; min-height: 60px">
    </div>

    <AzureToAppSettings/>
  </div>
</template>

<script>

import AzureToAppSettings from "@/components/AzureToAppSettings";

export default {
  name: 'App',
  components: {
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
</style>
