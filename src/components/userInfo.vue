<template>
  <v-menu v-if='curUser.name' v-model="menu" :attach='".curMenu"' class="curMenu" :close-on-content-click="false" :nudge-width="200" offset-x>
    <template v-slot:activator="{ on }">
      <v-btn flat v-on="on">
        {{curUser.name}}
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{curUser.username}}</v-list-tile-title>
            <v-list-tile-sub-title>{{curUser.name}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="menu = false">OK</v-btn>
        <!-- <v-btn color="primary" flat @click="menu = false">Save</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
import { getUserDetail } from 'api';
import store from 'store';
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
      cur_linked: 0
    }
  },
  computed: {
    ...mapGetters(['admins', 'cruds', 'mode', 'sideShow', 'curUser'])
  },
  created(){
    getUserDetail().then(res => {
      if (res) {
        console.log(res)
        store.commit("SET_USER", res)
      }
    });
  },
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

</style>
