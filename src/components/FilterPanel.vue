<template>
  <div id="filter-panel">
    Filter projects with
    <select class="filters" name="goal" @change="onChangeGoal" v-model="goal">
      <option value="0">&lt; $1,000 goal</option>
      <option value="1">$1,000 to $10,000 goal</option>
      <option value="2">$10,000 to $100,000 goal</option>
      <option value="3">$100,000 to $1,000,000 goal</option>
      <option value="4">&gt; $1,000,000 goal</option>
    </select>
    and at least <input v-model="funded" name="funded" /> % funded.
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { reactive, ref, createComponent } from "@vue/composition-api";

const FilterPanel = createComponent({
  setup(props, context) {
    const funded = ref(50);
    const goal = ref(2);
    const onChangeGoal = () => {
      console.log("clicked filter", goal.value);
      context.emit("filter", goal.value);
    };

    return {
      funded,
      goal,
      onChangeGoal
    };
  }
});

export default FilterPanel;
</script>

<style lang="scss" scoped>
@import "../themes/colors.scss";

#filter-panel {
  padding-bottom: 25px;
  text-align: center;

  .title {
    text-transform: uppercase;
    line-height: 2;
    padding: 0 5px;
  }

  .filters-options {
    display: flex;
    padding: 24px 0;

    .filters {
      width: 33%;
      box-sizing: border-box;
      margin: 0 5px;
    }

    input {
      width: 45%;
      border: 0;
      border-bottom: 1px solid $border;
      padding: 5px;
      box-sizing: border-box;
      margin-top: 10px;
    }
  }
}
</style>
