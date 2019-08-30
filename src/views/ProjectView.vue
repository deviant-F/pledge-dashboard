<template>
  <div class="page">
    <FilterPanel />
    <div id="project-list" v-if="projects.length > 0">
      <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
    </div>
    <button v-if="displayLoadButton" @click="fetchNext()">Load more</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { computed, createComponent, ref, watch } from "@vue/composition-api";
import { useRouter, useState } from "@u3u/vue-hooks";

import ProjectCard from "../components/ProjectCard.vue";
import FilterPanel from "../components/FilterPanel.vue";
import { fetchFeaturedProjects, fetchProjects } from "../services/api";
import { TProject, verify, applyFilters } from "../utils/project";
import { FEATURED } from "../utils/constants";

Vue.component("ProjectCard", ProjectCard);
Vue.component("FilterPanel", FilterPanel);

const ProjectView = createComponent({
  setup() {
    const { route } = useRouter();
    const state = { ...useState("filters", ["funded", "goal"]) };
    const projects = ref([] as Array<TProject>);
    const page = ref(1);
    const displayLoadButton = ref(false);

    const categoryId = computed(() => route.value.params.id);
    const validProjects = computed(() =>
      applyFilters(projects.value, {
        funded: state.funded.value,
        goal: state.goal.value
      })
    );

    const fetchNext = () => {
      page.value++;
    };

    //listen to changes in categoryId and page
    watch(
      [categoryId, page],
      async ([catVal, pageVal], [prevCat, prevPage]) => {
        let response;

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

        // filter out all invalid projects
        response = verify(response);

        if (pageVal > prevPage) {
          projects.value = projects.value.concat(response);
        } else {
          projects.value = response;
        }
      }
    );

    return {
      projects: validProjects,
      displayLoadButton,
      fetchNext
    };
  }
});

export default ProjectView;
</script>

<style lang="scss" scoped>
@import "../themes/colors.scss";

.page {
  margin: 24px auto;
  width: 780px;
}
#project-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
