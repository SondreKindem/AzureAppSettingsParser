<template>
  <div id="top"></div>
  <div id="middle"></div>
</template>

<script>
export default {
  name: "SlantedBackground"
}
</script>

<style scoped>
div {
  position: relative;
  height: 0;
  z-index: -10;
}

#top::after {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-style: solid;
  border-color: transparent;
  border-width: 20vh 50vw;
  border-bottom-color: #123524;
  border-right-color: #123524;
}

#middle {
  background: transparent;
}

#middle::after {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-style: solid;
  border-color: transparent;
  border-width: 20vh 50vw;
  border-bottom-color: #123524;
  border-left-color: #123524;
}
</style>