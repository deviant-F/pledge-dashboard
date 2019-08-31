<template>
  <div id="header">
    <img src="../assets/logo.png" />
    <div id="notify" @click="toggleNotification">
      <font-awesome-icon icon="bell" size="lg" />
    </div>
    <div class="notify-list" :class="{ hidden: isHidden }">
      <span class="trangle" />
      <ul>
        <li
          v-for="(m, i) in messageList"
          :key="i"
          @click="onClickMessage(m.project_id)"
        >
          {{ m.message }}
        </li>
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
import { useActions, useGetters } from "@u3u/vue-hooks";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell } from "@fortawesome/free-solid-svg-icons";

library.add(faBell);

const Header = createComponent({
  setup() {
    const getters = {
      ...useGetters("notifications", { messageList: "getMessageList" })
    };
    const actions = { ...useActions("notifications", ["fetchNotification"]) };
    const isHidden = ref(true);
    let polling;

    const toggleNotification = () => {
      isHidden.value = !isHidden.value;
    };

    const onClickMessage = project_id => {
      alert(`go to project/${project_id}`);
    };

    onMounted(() => {
      polling = setInterval(() => {
        actions.fetchNotification();
      }, 3000);
    });

    onUnmounted(() => {
      clearInterval(polling);
    });

    return {
      isHidden,
      toggleNotification,
      onClickMessage,
      ...getters
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
  display: flex;
  justify-content: space-between;

  img {
    height: 24px;
    width: 24px;
  }

  #notify {
    padding: 5px;
    cursor: pointer;
  }

  .trangle {
    position: absolute;
    top: -9px;
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
    min-height: 100px;
    z-index: 10;
    background-color: $white;

    &.hidden {
      display: none;
    }

    ul {
      max-height: 316px;
      display: flex;
      flex-direction: column-reverse;
      overflow-y: scroll;
    }

    li {
      padding: 15px;
      cursor: pointer;
      border-bottom: 1px solid $border;
    }
  }
}
</style>
