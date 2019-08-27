<template>
  <div id="filter-panel">
    <div class="title">Filters</div>
    <div class="filters-options">
      <input placeholder="Search for projects" />
      <div>
        <div>Funding Goal</div>
        <div>with<input /> - <input /></div>
      </div>
      <div>
        <div>Progress</div>
        <div><input /> %</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped>
@import "../themes/colors.scss";

#filter-panel {
  padding-bottom: 45px;

  .title {
    text-transform: uppercase;
    line-height: 2;
    padding: 0 5px;
  }

  .filters-options {
    display: flex;

    > * {
      width: 33%;
      box-sizing: border-box;
      // border: 1px solid red;
      margin: 0 5px;
    }

    div input {
      width: 30px;
      border-bottom: 2px solid $border;
    }
  }
}
</style>
