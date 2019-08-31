<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { createComponent } from "@vue/composition-api";

import Header from "./components/Header.vue";

Vue.component("Header", Header);

export default createComponent({});
</script>

<style lang="scss">
@import "reset-css";
@import "themes/colors.scss";

body {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $textColor;
}
</style>
