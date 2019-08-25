<template>
  <div id="project-list" v-if="projects.length > 0">
    <project v-for="p in projects" :key="p.id" :project="p" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueCompositionApi, {
  reactive,
  ref,
  createComponent,
  onCreated,
  onMounted
} from "@vue/composition-api";

import Project from "./Project.vue";
import { fetchProjects } from "../services/api";

Vue.use(VueCompositionApi);
Vue.component("Project", Project);

const ProjectList = createComponent({
  setup() {
    const projects = ref([]);

    onMounted(() => {
      getProjects();
    });

    const getProjects = async () => {
      const { data } = await fetchProjects();
      data.projects.forEach(prj => {
        projects.value.push(prj);
        projects.value.push(prj);
        projects.value.push(prj);
        projects.value.push(prj);
        projects.value.push(prj);
      });
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
  padding: 0 44px;
  margin-top: 24px;
  justify-content: center;
}
</style>
