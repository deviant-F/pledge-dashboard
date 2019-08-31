<template>
  <div class="page">
    <CategoryList />
    <div class="page-body">
      <FilterPanel />
      <div class="loading" v-if="isLoading">
        <font-awesome-icon icon="spinner" size="2x" spin />
      </div>
      <div id="project-list" v-else-if="projects.length > 0">
        <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
      </div>
      <div id="oops" v-else>
        Oops! we don't have projects with your filters. Please try again.
      </div>
      <button v-if="displayLoadButton" @click="fetchNext()">Load more</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  computed,
  createComponent,
  onMounted,
  ref,
  watch
} from "@vue/composition-api";
import { useRouter, useState, useActions } from "@u3u/vue-hooks";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import CategoryList from "../components/CategoryList.vue";
import ProjectCard from "../components/ProjectCard.vue";
import FilterPanel from "../components/FilterPanel.vue";
import { fetchFeaturedProjects, fetchProjects } from "../services/api";
import { TProject, verify, applyFilters } from "../utils/project";
import { FEATURED } from "../utils/constants";

library.add(faSpinner);

Vue.component("CategoryList", CategoryList);
Vue.component("ProjectCard", ProjectCard);
Vue.component("FilterPanel", FilterPanel);

const ProjectView = createComponent({
  setup() {
    const { route } = useRouter();
    const state = { ...useState("filters", ["funded", "goal"]) };
    const actions = { ...useActions("filters", ["resetFilter"]) };
    const isLoading = ref(true);
    const projects = ref([] as Array<TProject>);
    const page = ref(1);
    const displayLoadButton = ref(false);

    const categoryId = computed(
      () => route.value.params.id || route.value.params.name
    );
    const validProjects = computed(() =>
      applyFilters(projects.value, {
        funded: state.funded.value,
        goal: state.goal.value
      })
    );

    const fetchNext = () => {
      page.value++;
    };

    const fetchApi = async (catVal, pageVal) => {
      let response;
      isLoading.value = true;
      actions.resetFilter();

      if (catVal === FEATURED) {
        const { data } = await fetchFeaturedProjects();
        response = data.featured_projects;
      } else {
        const {
          data: { pagination, projects }
        } = await fetchProjects(catVal, pageVal, "");
        response = projects;
        displayLoadButton.value = pagination.total_pages > page.value;
      }

      isLoading.value = false;
      // filter out all invalid projects
      return verify(response);
    };

    onMounted(async () => {
      const response = await fetchApi(categoryId.value, page.value);
      projects.value = response;
    });

    watch(
      [categoryId, page],
      async ([catVal, pageVal], [prevCat, prevPage]) => {
        const response = await fetchApi(catVal, pageVal);

        if (pageVal > prevPage) {
          projects.value = projects.value.concat(response);
        } else {
          projects.value = response;
        }
      }
    );

    return {
      projects: validProjects,
      isLoading,
      displayLoadButton,
      fetchNext
    };
  }
});

export default ProjectView;
</script>

<style lang="scss" scoped>
@import "../themes/colors.scss";

.page-body {
  margin: 24px auto;
  width: 780px;
}

#project-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#oops,
.loading {
  text-align: center;
  padding: 40px 0;
}

button {
  background-color: $theme;
  border: 0;
  color: $white;
  display: inherit;
  font-size: 13px;
  line-height: 30px;
  margin: 0 auto;
  width: 120px;
}
</style>
