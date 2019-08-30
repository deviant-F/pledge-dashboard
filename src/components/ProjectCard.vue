<template>
  <div class="project">
    <img v-if="main_image" :src="main_image.url" />
    <div v-else class="no-image" />
    <div class="category">{{ categoryName }}</div>
    <div class="info-container">
      <span class="title">{{ name }}</span>
      <span class="creator">by {{ creator }}</span>
      <span class="blurb">{{ blurb }}</span>
    </div>
    <div class="info-footer">
      <div class="progress">
        <span class="raised">${{ total_pledged }}</span> raised
        <span class="raised-percentage">{{ progessPercentage }}%</span>
        <div class="progress-bar">
          <span
            class="progress-bar-inner"
            :style="{ width: `${progessPercentage}%` }"
          ></span>
        </div>
      </div>
      <div class="dayLeft">
        <font-awesome-icon icon="clock" />
        {{ dayLeft }} left
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import { reactive, ref, computed, createComponent } from "@vue/composition-api";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { numberWithCommas } from "../utils/functions";
import { Tproject } from "../utils/types";

library.add(faClock);

Vue.component("font-awesome-icon", FontAwesomeIcon);

type Tprops = {
  project: Tproject;
};

const Project = createComponent({
  props: ["project"],
  setup({ project }: Tprops) {
    const {
      blurb,
      category,
      creator,
      end_time,
      funding_goal,
      main_image,
      name,
      total_pledged
    } = project;
    const dayLeft = computed(() => moment(end_time * 1000).fromNow(true));
    const progessPercentage = computed(() => {
      const percentage = (total_pledged / funding_goal) * 100;
      return Math.round(percentage);
    });

    return {
      name,
      blurb,
      dayLeft,
      creator: creator.name,
      progessPercentage,
      total_pledged: numberWithCommas(total_pledged / 100),
      categoryName: category.name,
      main_image: main_image
    };
  }
});

export default Project;
</script>

<style lang="scss" scoped>
@import "../themes/colors.scss";

.project {
  border: 1px solid $border;
  box-sizing: border-box;
  width: 250px;
  margin: 0 5px 20px 5px;
  font-size: 12px;
  opacity: 1;
  animation: fadein 1s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &:hover {
    box-shadow: 0px 0px 13px 4px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out;
    transform: translateY(-2px);
    border: 1px solid $borderHover;
  }

  img,
  .no-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    background: $lighgt-grey;
  }

  .info-container {
    padding: 0 15px;
    height: 160px;
  }

  .info-footer {
    padding: 15px;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    width: inherit;
    color: $black;
    display: block;
    margin-bottom: 5px;
  }

  .blurb {
    font-size: 14px;
    line-height: 1.1;
    padding: 10px 0;
    display: block;
  }

  .category,
  .dayLeft {
    font-weight: 600;
    letter-spacing: 1px;
    margin: 5px 0;
  }

  .category {
    text-transform: uppercase;
    margin: 10px 0;
    padding: 0 15px;
  }

  .raised {
    font-weight: 600;
    font-size: 16px;
    margin-right: 2px;
    color: $black;
  }
  .progress {
    position: relative;
  }
  .raised-percentage {
    right: 0;
    position: absolute;
    font-weight: 600;
    line-height: 1.7;
  }

  .dayLeft {
    margin: 18px 0 5px 0;
    text-transform: uppercase;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background-color: $progressBase;
    border-radius: 10px;
    margin-top: 5px;
    overflow: hidden;

    .progress-bar-inner {
      display: block;
      height: 8px;
      background-color: $theme;
    }
  }
}
</style>
