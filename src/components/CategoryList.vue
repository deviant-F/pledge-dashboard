<template>
  <ul v-if="categories.length > 0">
    <li
      v-for="c in categories"
      v-on:click="onClickItem(c.id)"
      :key="c.id"
      :cat="c"
    >
      {{ c.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import {
  reactive,
  createComponent,
  onCreated,
  onMounted
} from "@vue/composition-api";
import { fetchCategories } from "../services/api";

Vue.use(VueCompositionApi);

type Category = {
  name: string;
  id: number;
  description: string;
};

const CategoriesList = createComponent({
  setup() {
    const state = reactive({
      categories: [] as Array<Category>
    });

    onMounted(() => {
      getCategories();
    });

    const onClickItem = (id: number) => {
      console.log(id);
    };

    const getCategories = async () => {
      const {
        data: { categories }
      } = await fetchCategories();
      categories.forEach((cat: Category) => {
        state.categories.push(cat);
      });
    };

    return {
      categories: state.categories,
      onClickItem
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
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  padding: 15px 24px;

  li {
    margin: 0 20px;
    cursor: pointer;
  }
}
</style>
