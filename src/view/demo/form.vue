<template>
  <div>
    <v-form ref="formCur" v-model="validCur" lazy-validation>
      <v-text-field v-model="nameCur" :counter="10" :rules="nameCurRules" label="Name" required></v-text-field>
      <v-text-field v-model="emailCur" :rules="emailCurRules" label="E-mail" required></v-text-field>
      <v-select v-model="selected" :items="ItemsCur" :rules="[v => !!v || 'Item is required']" label="Item" required></v-select>
      <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>
      <v-btn :disabled="!validCur" color="success" @click="validateCur">
        Validate
      </v-btn>
      <v-btn color="error" @click="resetCUr">
        Reset Form
      </v-btn>
      <v-btn color="warning" @click="resetValidation">
        Reset Validation
      </v-btn>
    </v-form>
    <v-app id="textField" class="formMenuC">
      <v-form>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 sm6 md3>
              <v-text-field label="Regular"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-text-field label="Regular" placeholder="Placeholder"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-text-field label="Solo" solo></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-text-field label="Solo" placeholder="Placeholder" solo></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-text-field label="Box" box></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-text-field label="Box" placeholder="Placeholder" box></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-text-field label="Outline" outline></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-text-field label="Outline" placeholder="Placeholder" outline></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-app>
    <v-app id="inputValid" class="formMenuC">
      <v-form v-model="valid">
        <v-container>
          <v-layout>
            <v-flex xs12 md4>
              <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="First name" required></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field v-model="lastname" :rules="nameRules" :counter="10" label="Last name" required></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-app>
    <v-app id="numberOne" class="formMenuC">
      <v-container fluid grid-list-xl>
        <v-layout wrap align-center>
          <v-flex xs12 sm6 d-flex>
            <v-select :items="initItems" label="Standard"></v-select>
          </v-flex>
          <v-flex xs12 sm6 d-flex>
            <v-select :items="initItems" box label="Box style"></v-select>
          </v-flex>
          <v-flex xs12 sm6 d-flex>
            <v-select :items="initItems" label="Outline style" outline></v-select>
          </v-flex>
          <v-flex xs12 sm6 d-flex>
            <v-select :items="initItems" label="Solo field" solo></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
    <v-app id="inspire" class="formMenuC">
      <v-container fluid>
        <v-layout wrap>
          <v-flex xs12>
            <v-combobox v-model="select" :items="initItems" label="Select a favorite activity or create a new one"></v-combobox>
          </v-flex>
          <v-flex xs12>
            <v-combobox v-model="select" :items="initItems" chips label="I use chips"></v-combobox>
          </v-flex>
          <v-flex xs12>
            <v-combobox v-model="select" :items="initItems" chips label="I use a scoped slot">
              <template v-slot:selection="data">
                <v-chip :key="JSON.stringify(data.item)" :selected="data.selected" :disabled="data.disabled" class="v-chip--select-multi" @click.stop="data.parent.selectedIndex = data.index" @input="data.parent.selectItem(data.item)">
                  <v-avatar class="accent white--text">
                    {{ data.item.slice(0, 1).toUpperCase() }}
                  </v-avatar>
                  {{ data.item }}
                </v-chip>
              </template>
            </v-combobox>
          </v-flex>
          <v-flex xs12>
            <v-combobox v-model="select" chips label="I'm readonly" readonly></v-combobox>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
    <v-app id="nextConent" class="formMenuC">
      <v-card>
        <v-card-title class="headline font-weight-regular blue-grey white--text">Profile</v-card-title>
        <v-card-text>
          <v-subheader class="pa-0">Where do you live?</v-subheader>
          <v-autocomplete v-model="model" :hint="!isEditing ? 'Click the icon to edit' : 'Click the icon to save'" :items="states" :readonly="!isEditing" :label="`State — ${isEditing ? 'Editable' : 'Readonly'}`" persistent-hint prepend-icon="mdi-city">
            <template v-slot:append-outer>
              <v-slide-x-reverse-transition mode="out-in">
                <v-icon :key="`icon-${isEditing}`" :color="isEditing ? 'success' : 'info'" @click="isEditing = !isEditing" v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"></v-icon>
              </v-slide-x-reverse-transition>
            </template>
          </v-autocomplete>
        </v-card-text>
      </v-card>
    </v-app>
    <v-app id="nextContentII" class="formMenuC">
      <v-card color="red lighten-2" dark>
        <v-card-title class="headline red lighten-3">
          Search for Public APIs
        </v-card-title>
        <v-card-text>
          Explore hundreds of free API's ready for consumption! For more information visit
          <a class="grey--text text--lighten-3" href="https://github.com/toddmotto/public-apis" target="_blank">the Github repository</a>.
        </v-card-text>
        <v-card-text>
          <v-autocomplete v-model="model" :items="items" :loading="isLoading" :search-input.sync="search" color="white" hide-no-data hide-selected item-text="Description" item-value="API" label="Public APIs" placeholder="Start typing to Search" prepend-icon="mdi-database-search" return-object></v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>
        <v-expand-transition>
          <v-list v-if="model" class="red lighten-3">
            <v-list-tile v-for="(field, i) in fields" :key="i">
              <v-list-tile-content>
                <v-list-tile-title v-text="field.value"></v-list-tile-title>
                <v-list-tile-sub-title v-text="field.key"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-expand-transition>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
            Clear
            <v-icon right>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-app>
    <v-app id="firstContent" style="margin-top:280px;" class="formMenuC">
      <v-card color="blue-grey darken-1" dark>
        <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg">
          <v-layout wrap>
            <v-flex xs12>
              <v-progress-linear :active="isUpdating" class="ma-0" color="green lighten-3" height="4" indeterminate></v-progress-linear>
            </v-flex>
            <v-flex text-xs-right xs12>
              <v-menu bottom left transition="slide-y-transition">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-tile @click="isUpdating = true">
                    <v-list-tile-action>
                      <v-icon>mdi-settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Update</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>
            <v-layout align-start column justify-end pa-3>
              <h3 class="headline">{{ name }}</h3>
              <span class="grey--text text--lighten-1">{{ title }}</span>
            </v-layout>
          </v-layout>
        </v-img>
        <v-form>
          <v-container>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-text-field v-model="name" :disabled="isUpdating" box color="blue-grey lighten-2" label="Name"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field v-model="title" :disabled="isUpdating" box color="blue-grey lighten-2" label="Title"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete v-model="friends" :disabled="isUpdating" :items="people" box chips color="blue-grey lighten-2" label="Select" item-text="name" item-value="name" multiple>
                  <template v-slot:selection="data">
                    <v-chip :selected="data.selected" close class="chip--select-multi" @input="remove(data.item)">
                      <v-avatar>
                        <img :src="data.item.avatar">
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-avatar>
                        <img :src="data.item.avatar">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-switch v-model="autoUpdate" :disabled="isUpdating" class="mt-0" color="green lighten-2" hide-details label="Auto Update"></v-switch>
          <v-spacer></v-spacer>
          <v-btn :disabled="autoUpdate" :loading="isUpdating" color="blue-grey darken-3" depressed @click="isUpdating = true">
            <v-icon left>mdi-update</v-icon>
            Update Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-app>
  </div>
</template>
<script>
export default {

  data() {
    const srcs = {
      1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
    }
    return {
      select: 'Programming',
      selected: null,
      name: null,
      nameCur: '',
      emailCur: '',
      initItems: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify'
      ],
      ItemsCur: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      isEditing: false,
      model: null,
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ],
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      autoUpdate: true,
      friends: ['Sandra Adams', 'Britta Holt'],
      isUpdating: false,
      name: 'Midnight Crew',
      people: [
        { header: 'Group 1' },
        { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
        { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
        { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
        { divider: true },
        { header: 'Group 2' },
        { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
        { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
        { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
        { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] }
      ],
      title: 'The summer breeze',
      valid: false,
      validCur: false,
      firstname: '',
      lastname: '',
      nameCurRules: [
        v => !!v || 'Name is required',
        // v => v.length <= 10 || 'Name must be less than 10 characters'
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailCurRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      checkbox: false
    }
  },
  computed: {
    fields() {
      if (!this.model) return []

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a'
        }
      })
    },
    items() {
      return this.entries.map(entry => {
        const Description = entry.Description.length > this.descriptionLimit ?
          entry.Description.slice(0, this.descriptionLimit) + '...' :
          entry.Description

        return Object.assign({}, entry, { Description })
      })
    }
  },
  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      fetch('https://api.publicapis.org/entries')
        .then(res => res.json())
        .then(res => {
          const { count, entries } = res
          this.count = count
          this.entries = entries
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    }

  },
  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    validateCur() {
      if (this.$refs.formCur.validate()) {
        this.snackbar = true
      }
    },
    resetCUr() {
      this.$refs.formCur.reset()
    },
    resetValidation() {
      this.$refs.formCur.resetValidation()
    }

  }
}

</script>
