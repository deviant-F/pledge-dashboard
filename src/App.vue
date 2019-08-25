<template>
  <div id="header">
    header
    <CategoryList />
    <ProjectList />
  </div>
</template>

<style lang="scss">
@import "reset-css";
@import "themes/colors.scss";

#header {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $textColor;
}
</style>
