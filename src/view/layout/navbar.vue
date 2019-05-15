<template>
  <v-toolbar>
    <v-toolbar-side-icon :class='{"sideShow":sideShow==true,"toolbarSwitch":true}' @click='toggleSide'></v-toolbar-side-icon>
    <v-toolbar-title>develop</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-layout justify-center :class='{"slideControl":true,"extendsMouse":mode=="extends"}'>
      <v-btn icon @click='toggleClass'>
        <v-icon>mdi-rhombus-split</v-icon>
      </v-btn>
    </v-layout>
    <!-- <v-toolbar-items class="hidden-sm-and-down"> -->
    <v-btn-toggle v-model="selected_Link[0]" :class="{'hidden-sm-and-down':true,'button-group':true,'v-btn-toggle--selected':true,'v-btn-toggle--only-child':true} ">
      <!-- <router-link :to='/'> -->
      <v-btn exact-active-class="default-class your-class" :class="{'v-btn--active':selected_Nav==item.name}" v-for='item in topList' :value='item.name' flat @click='handleLinked(item.name,item.href)' :key="item.name">{{item.name}}</v-btn>
      <!-- <v-btn exact-active-class="default-class your-class" class="v-btn-active" :value='"topList5"' flat @click='activeHref("topList5","/")'>Main</v-btn>
      <v-btn exact-active-class="default-class your-class" class="v-btn-active" :value='"topList6"' flat @click='activeHref("topList6","demo")'>messageDemo</v-btn>
      <v-btn exact-active-class="default-class your-class" :value='"topList7"' flat @click='activeHref("topList7","echarts")'>echartsDemo</v-btn> -->
    </v-btn-toggle>
    <userInfo></userInfo>
    <!-- </v-toolbar-items> -->
  </v-toolbar>
</template>
<script>
import store from 'store';
import userInfo from '../../components/userInfo';
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
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
      topList: [{ name: 'Main', href: '/' }, { name: 'messageDemo', href: 'demo' }, { name: 'echartsDemo', href: 'echarts' }]
    }
  },
  computed: {
    ...mapGetters(['admins', 'cruds', 'mode', 'sideShow', 'curUser', 'selected_Link','selected_Nav'])
  },
  components: {
    userInfo
  },
  created() {},
  methods: {
    handleLinked(name, href) {
      // event.preventDefault()
      store.commit('SET_SELECTED_NAV',name)
      this.activeHref(name, href)
    },
    // sayHi(url) {
    //   this.commonMethods.linkUrl(url);
    //   // this.$router.push(url)
    //   store.commit('SET_SELECTED_LINK', [activeIndex])
    //   this.linkUrl(url);
    // },
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

</style>
