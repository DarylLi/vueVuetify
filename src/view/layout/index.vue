<template>
  <div class="app-wrapper">
    <div class="mainFrame">
      <sideBar :class='{"extends":mode=="extends","sideShow":sideShow==true}'></sideBar>
      <navBar></navBar>
    </div>
    <blockedUI v-if='!pageLoaded'></blockedUI>
    <App-main v-if='curUser.name' :class='{"sideShow":sideShow==true}'></App-main>
    <!-- <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}"> -->
    <!-- <div :class="{'sidebar-wrapper':true,'toggle':toggleFlag}" @mouseenter="sideHover" @mouseleave="sideLeave">
      <Sidebar class="sidebar-container"></Sidebar>
    </div> -->
    <!-- <Navbar @toggleSide='toggleSide'></Navbar> -->
    <!--     <div class="main-container" :class="{hover:hoverSide,'toggle':toggleFlag}">
      <App-main></App-main>
    </div>
    <transition name="fade" mode="out-in">
      <blockUI v-if="blocked"></blockUI>
    </transition>
    <devChecker></devChecker> -->
  </div>
</template>
<script>
import AppMain from './AppMain';
import sideBar from './sidebar';
import navBar from './navbar';
import blockedUI from '../../components/blocked';
import store from 'store';
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  components: {
    AppMain,
    sideBar,
    navBar,
    blockedUI
  },
  data() {
    return {
      hoverSide: false,
      mobileFlag: false,
      toggleFlag: false,
      showChecker: false,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      cur_linked: 0,
    }
  },
  computed: {
    ...mapGetters(['admins', 'cruds', 'mode', 'sideShow', 'curUser','pageLoaded'])
  },
  created() {},
  methods: {
    linkUrl(url) {
      this.commonMethods.linkUrl(url);
      // this.$router.push(url)
    },
    toggleClass() {
      store.getters.mode == 'normal' ? store.commit('SET_MODE', 'extends') : store.commit('SET_MODE', 'normal')
    },
    toggleSide() {
      store.commit('SET_SIDE_SHOW', !store.getters.sideShow)
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
@import "src/styles/component.scss";

.app-wrapper {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;

  button {
    text-transform: none !important;
  }

  .mainFrame {
    width: 100%;
    height: 64px;
    position: relative;

    .v-toolbar {
      z-index: 12;
    }

    .v-toolbar__content {
      .v-menu__content {
        right: 0px;
        left: auto !important;
      }
    }

    .toolbarSwitch {
      transform: rotate(-90deg);
    }

    .toolbarSwitch.sideShow {
      transform: rotate(0deg);
    }

    .slideControl {
      width: 100px;
      position: absolute;
      .v-btn {
        color: $lightblue;
      }
      .v-icon {
        color: $lightblue;
      }

      left: 50%;
      transform: translate(-50px, 0)
    }

    .slideControl.extendsMouse {
      .v-btn {
        color: white;
      }

      .v-icon {
        color: white;
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #7bc6ff, 0 0 30px #7bc6ff, 0 0 40px #7bc6ff, 0 0 50px #7bc6ff, 0 0 75px #7bc6ff
      }

      .v-btn__content {
        color: white !important;
      }

      .v-ripple__container {
        color: white !important;
        background-color: white !important;
        display: none;
      }
    }
  }

  .theme--light {
    .button-group {
      background-color: #f5f5f5;
    }
  }
}

</style>
