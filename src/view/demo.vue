<template>
  <div>
    <v-app>
<!--       <content-loader>
        <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
        <rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
        <rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
        <rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
        <rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
        <rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
      </content-loader> -->
      <div>
        <v-alert :value="true" transition="scale-transition" type="success" dismissible>
          This is a success alert.
        </v-alert>
        <v-alert :value="true" transition="scale-transition" type="info">
          This is a info alert.
        </v-alert>
        <v-alert :value="true" transition="scale-transition" type="warning" dismissible>
          This is a warning alert.
        </v-alert>
        <v-alert :value="true" transition="scale-transition" type="error">
          This is a error alert.
        </v-alert>
        <div class="text-xs-center">
          <v-btn :disabled="dialog0" :loading="dialog0" class="white--text" color="purple darken-2" @click="dialog0 = true">
            Start loading
          </v-btn>
          <v-dialog v-model="dialog0" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Please stand by
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
        <v-app id="inspire2">
          <div>
            <v-layout row justify-center>
              <v-btn color="primary" dark @click="dialog = true">Open Dialog 1</v-btn>
              <v-btn color="primary" dark @click="dialog2 = true">Open Dialog 2</v-btn>
              <v-btn color="primary" dark @click="dialog3 = true">Open Dialog 3</v-btn>
              <v-menu bottom offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on">A Menu</v-btn>
                </template>
                <v-list>
                  <v-list-tile v-for="(item, i) in items" :key="i" @click="">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
                <v-card tile>
                  <v-toolbar card dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Settings</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn dark flat @click="dialog = false">Save</v-btn>
                    </v-toolbar-items>
                    <v-menu bottom right offset-y>
                      <template v-slot:activator="{ on }">
                        <v-btn dark icon v-on="on">
                          <v-icon>more_vert</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-tile v-for="(item, i) in items" :key="i" @click="">
                          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </v-toolbar>
                  <v-card-text>
                    <v-btn color="primary" dark @click="dialog2 = !dialog2">Open Dialog 2</v-btn>
                    <v-tooltip right>
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on">Tool Tip Activator</v-btn>
                      </template>
                      Tool Tip
                    </v-tooltip>
                    <v-list three-line subheader>
                      <v-subheader>User Controls</v-subheader>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Content filtering</v-list-tile-title>
                          <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Password</v-list-tile-title>
                          <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list three-line subheader>
                      <v-subheader>General</v-subheader>
                      <v-list-tile avatar>
                        <v-list-tile-action>
                          <v-checkbox v-model="notifications"></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Notifications</v-list-tile-title>
                          <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-action>
                          <v-checkbox v-model="sound"></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Sound</v-list-tile-title>
                          <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-action>
                          <v-checkbox v-model="widgets"></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Auto-add widgets</v-list-tile-title>
                          <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-card-text>
                  <div style="flex: 1 1 auto;"></div>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog2" max-width="500px">
                <v-card>
                  <v-card-title>
                    Dialog 2
                  </v-card-title>
                  <v-card-text>
                    <v-btn color="primary" dark @click="dialog3 = !dialog3">Open Dialog 3</v-btn>
                    <v-select :items="select" label="A Select List" item-value="text"></v-select>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" flat @click="dialog2=false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog3" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span>Dialog 3</span>
                    <v-spacer></v-spacer>
                    <v-menu bottom left>
                      <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                          <v-icon>more_vert</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-tile v-for="(item, i) in items" :key="i" @click="">
                          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn color="primary" flat @click="dialog3=false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </div>
        </v-app>
      </div>
    </v-app>
  </div>
</template>
<script type="text/javascript">
import { ContentLoader } from 'vue-content-loader'
export default {
  data() {
    return {
      dialog0: false,
      dialog: false,
      dialog2: false,
      dialog3: false,
      notifications: false,
      sound: true,
      widgets: false,
      items: [{
          title: 'Click Me'
        },
        {
          title: 'Click Me'
        },
        {
          title: 'Click Me'
        },
        {
          title: 'Click Me 2'
        }
      ],
      select: [
        { text: 'State 1' },
        { text: 'State 2' },
        { text: 'State 3' },
        { text: 'State 4' },
        { text: 'State 5' },
        { text: 'State 6' },
        { text: 'State 7' }
      ]
    }
  },
  components: {
    ContentLoader
  },
  watch: {
    dialog0(val) {
      if (!val) return
      setTimeout(() => (this.dialog0 = false), 4000)
    }
  }
}

</script>
<style type="text/css">
</style>
