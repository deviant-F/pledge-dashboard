<template>
  <div id="header">
    <div id="notify" @click="onClick">
      <font-awesome-icon icon="bell" pull="right" size="lg" />
    </div>
    <div class="notify-list" :class="{ hidden: isHidden }">
      <span class="trangle" />
      <ul>
        <li></li>
        <li>creator just launch a new cat project with goal xxx</li>
        <li></li>
        <li>xx complete a new milestone of project xxx</li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  createComponent,
  onMounted,
  onUnmounted,
  ref
} from "@vue/composition-api";
import { useActions } from "@u3u/vue-hooks";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell } from "@fortawesome/free-solid-svg-icons";

library.add(faBell);

const Header = createComponent({
  setup() {
    const state = { ...useGetters("notifications", ["notifications"]) };
    const actions = { ...useActions("notifications", ["fetchNotification"]) };
    const isHidden = ref(true);
    let polling;

    const onClick = () => {
      isHidden.value = !isHidden.value;
    };

    onMounted(() => {
      polling = setInterval(() => {
        actions.fetchNotification();
      }, 10000);
    });

    onUnmounted(() => {
      clearInterval(polling);
    });

    return {
      isHidden,
      onClick
    };
  }
});

export default Header;
</script>

<style lang="scss" scoped>
@import "../themes/colors.scss";

#header {
  height: 24px;
  padding: 12px 14px;

  #notify {
    padding: 5px;
    cursor: pointer;
  }

  .trangle {
    position: absolute;
    margin-top: -9px;
    right: 20px;
    height: 15px;
    width: 15px;
    transform: rotate(45deg);
    background: $white;
    border-top: 1px solid $border;
    border-left: 1px solid $border;
  }

  .notify-list {
    border: 1px solid $border;
    box-sizing: border-box;
    margin-top: 2.5rem;
    position: absolute;
    right: 0;
    transition: all 0.5s ease;
    width: 280px;
    z-index: 10;

    &.hidden {
      display: none;
    }

    ul {
      max-height: 292px;
      // overflow-y: scroll;
    }

    li {
      padding: 15px;
      background-color: $white;
      border-bottom: 1px solid $border;
    }
  }
}
</style>
