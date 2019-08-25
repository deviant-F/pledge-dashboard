<template>
  <div id="project-list" v-if="projects.length > 0">
    <project v-for="p in projects" :key="p.id" :project="p" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  computed,
  createComponent,
  onMounted,
  onUpdated,
  ref,
  watch
} from "@vue/composition-api";
import { useState } from "@u3u/vue-hooks";

import Project, { Tproject } from "./Project.vue";
import { fetchFeaturedProjects, fetchProjects } from "../services/api";

Vue.component("Project", Project);

const ProjectList = createComponent({
  setup() {
    const categoryId = useState(["selectedCategory"]).selectedCategory;
    const projects = ref([] as Array<Tproject>);

    //listen to changes in categoryId
    watch(categoryId, async value => {
      // getProjects is not accessable here
      if (value === "featured") {
        const { data } = await fetchFeaturedProjects();
        projects.value = data.featured_projects;
      } else {
        const { data } = await fetchProjects();
        projects.value = data.projects;
      }
    });

    const getProjects = async (category: string) => {
      if (category === "featured") {
        const { data } = await fetchFeaturedProjects();
        projects.value = data.featured_projects;
      } else {
        const { data } = await fetchProjects();
        projects.value = data.projects;
      }
    };

    return {
      projects
    };
  }
});

export default ProjectList;
</script>

<style lang="scss" scoped>
#project-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 24px auto;
  width: 780px;
}
</style>
