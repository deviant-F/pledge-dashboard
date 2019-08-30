<template>
  <ul v-if="categories.length > 0">
    <li v-for="c in categories" :key="c.id" :cat="c">
      <router-link :to="{ name: 'category', params: { id: c.id } }">
        {{ c.name }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { ref, createComponent, onMounted } from "@vue/composition-api";
import { useActions } from "@u3u/vue-hooks";

import { fetchCategories } from "../services/api";
import { FEATURED, ALL } from "../utils/constants";

type Category = {
  name: string;
  id: number;
  description: string;
};

const CategoriesList = createComponent({
  setup() {
    const categories = ref([] as Array<Category>);

    onMounted(() => {
      getCategories();
    });

    const getCategories = async () => {
      const { data } = await fetchCategories();
      categories.value = [
        { id: FEATURED, name: "Featured" },
        { id: ALL, name: "All" },
        ...data.categories
      ];
    };

    return {
      categories,
      FEATURED
    };
  }
});

export default CategoriesList;
</script>

<style lang="scss" scoped>
@import "../themes/colors.scss";

ul {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  border-top: 1px solid $border;
  border-bottom: 1px solid $border;
  padding: 15px 24px;

  li {
    margin: 0 20px;
    cursor: pointer;

    a {
      text-decoration: none;
      color: $textColor;

      &:hover {
        color: $theme;
        transition: color 0.5s ease-in-out;
      }
    }
  }
}
</style>
