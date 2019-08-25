<template>
  <ul v-if="categories.length > 0">
    <li v-on:click="changeCategory(FEATURED)">Featured</li>
    <li v-on:click="changeCategory('')">All</li>
    <li
      v-for="c in categories"
      v-on:click="changeCategory(c.id)"
      :key="c.id"
      :cat="c"
    >
      {{ c.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import {
  ref,
  createComponent,
  onCreated,
  onMounted
} from "@vue/composition-api";
import { useActions } from "@u3u/vue-hooks";

import { fetchCategories } from "../services/api";
import { FEATURED } from "../utils/index";

type Category = {
  name: string;
  id: number;
  description: string;
};

const CategoriesList = createComponent({
  setup() {
    const categories = ref([] as Array<Category>);
    const mutations = useActions(["changeCategory"]);

    onMounted(() => {
      getCategories();
    });

    const getCategories = async () => {
      const { data } = await fetchCategories();
      categories.value = data.categories;
    };

    return {
      categories,
      FEATURED,
      ...mutations
    };
  }
});

export default CategoriesList;
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  padding: 15px 24px;

  li {
    margin: 0 20px;
    cursor: pointer;
  }
}
</style>
