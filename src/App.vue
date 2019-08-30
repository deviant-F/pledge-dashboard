<template>
  <div id="app">
    <Header />
    <CategoryList />
    <ProjectView />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { createComponent } from "@vue/composition-api";

import CategoryList from "./components/CategoryList.vue";
import Header from "./components/Header.vue";
import ProjectView from "./views/ProjectView.vue";

Vue.component("CategoryList", CategoryList);
Vue.component("Header", Header);
Vue.component("ProjectView", ProjectView);

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
