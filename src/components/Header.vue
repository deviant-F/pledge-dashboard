<template>
  <div id="header">
    <div id="notify" @click="onClick">
      <font-awesome-icon icon="bell" pull="right" size="lg" />
    </div>
    <div class="notify-list" :class="{ hidden: !isActive }">
      <span class="trangle" />
      <ul>
        <li>project xxx update, project xxx update</li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
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
import { createComponent, ref } from "@vue/composition-api";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell } from "@fortawesome/free-solid-svg-icons";

library.add(faBell);

const Header = createComponent({
  setup() {
    const isActive = ref(false);

    const onClick = () => {
      isActive.value = !isActive.value;
    };

    return {
      isActive,
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
      opacity: 0;
    }

    ul {
      max-height: 292px;
      overflow-y: scroll;
    }

    li {
      padding: 15px;
      background-color: $white;
      border-bottom: 1px solid $border;
    }
  }
}
</style>
