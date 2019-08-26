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
import { useRouter } from "@u3u/vue-hooks";

import Project from "./Project.vue";
import { fetchFeaturedProjects, fetchProjects } from "../services/api";
import { Tproject } from "../utils/types";

Vue.component("Project", Project);

const ProjectList = createComponent({
  setup() {
    const { route } = useRouter();
    const projects = ref([] as Array<Tproject>);

    const categoryId = computed(() => route.value.params.id);
    const validProjects = computed(() => {
      return projects.value.filter(p => p.funding_goal !== null);
    });

    console.log(route.value);

    //listen to changes in categoryId
    watch(categoryId, async value => {
      console.log(value);
      if (value === "featured") {
        const { data } = await fetchFeaturedProjects();
        projects.value = data.featured_projects;
      } else {
        const { data } = await fetchProjects(value);
        projects.value = data.projects;
      }
    });

    return {
      projects: validProjects
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
