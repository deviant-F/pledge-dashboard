<template>
  <div id="filter-panel">
    Filter projects with
    <select class="filters" @change="onChangeGoal">
      <option
        v-for="(option, index) in goalOptions"
        :value="index"
        :key="index"
      >
        {{ option.displayText }}
      </option>
    </select>
    goal and at least
    <input :value="funded" @keyup.enter="onChangeFunded" /> % funded.
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { computed, createComponent } from "@vue/composition-api";
import { useState, useActions } from "@u3u/vue-hooks";

const goalOptions = [
  {
    range: [0, -1],
    displayText: "any"
  },
  {
    range: [1, 10000],
    displayText: "below 10,000"
  },
  {
    range: [10000, 100000],
    displayText: "10,000 to 100,000"
  },
  {
    range: [100000, -1],
    displayText: "above 100,000"
  }
];

const FilterPanel = createComponent({
  setup() {
    const state = { ...useState("filters", ["funded", "goal"]) };
    const action = { ...useActions("filters", ["changeFunded", "changeGoal"]) };

    const funded = computed(() => state.funded.value);
    const goal = computed(() => state.goal.value);

    const onChangeGoal = (e: Event) => {
      const selectedIdx = (e.target as HTMLSelectElement).value;
      const selectedGoal = goalOptions[selectedIdx as number];
      action.changeGoal(selectedGoal.range);
    };

    const onChangeFunded = (e: Event) => {
      let funded = (e.target as HTMLInputElement).value;

      if (funded === "") {
        funded = "0";
      }

      if (verifyInput(funded)) {
        action.changeFunded(parseInt(funded));
      } else {
        alert("Please input a number between 0 to 100");
      }
    };

    const verifyInput = (input: string) => {
      const inputInNum = parseInt(input);
      return !(isNaN(inputInNum) || inputInNum < 0 || inputInNum > 100);
    };

    return {
      funded,
      goal,
      goalOptions,
      onChangeGoal,
      onChangeFunded
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
