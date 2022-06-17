<template>
  <div id="main-wrap">
    <img alt="Vue logo" src="./assets/logo.png" style="height: 15vh">
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
  data(){
    return {
      test: ""
    }
  },
  methods: {
    clicked(){
      this.test = "poop" + Math.random()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#main-wrap {
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px
}
</style>
