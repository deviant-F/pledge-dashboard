<template>
  <div id="app">
    <div id="header"></div>
    <CategoryList />
    <ProjectView />
  </div>
</template>

<style lang="scss">
@import "reset-css";
@import "themes/colors.scss";

body {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $textColor;
}

#header {
  height: 60px;
}
</style>
