<template>
  <q-page class="flex items-center justify-around">
    <div class="column justify-between full-width">
        <span class="text-h4 q-ma-md">Add New Club</span>
        <q-input filled v-model="name"
          label="Name" class="q-ma-sm" @input="checkCanSubmit()"/>
        <div class="row justify-between">
          <q-input filled v-model="fullname"
            label="Full Name" class="q-ma-sm" @input="computeAcronym()" style="width: 70%"/>
          <q-input filled v-model="acronym"
            label="Acronym" class="q-ma-sm" @input="checkCanSubmit()" style="width: 20%"/>
        </div>
        <q-input filled v-model="stadium"
          label="Stadium" class="q-ma-sm" @input="checkCanSubmit()"/>
        <q-input filled v-model="city"
          label="City" class="q-ma-sm" @input="checkCanSubmit()"/>
        <q-select
          filled
          label="Players"
          v-model="players"
          use-input
          use-chips
          multiple
          map-options
          input-debounce="0"
          :options="filterPlayersOptions"
          @filter="filterFn"
          class="q-ma-sm"
          />
        <div class="row justify-around">
            <q-btn color="negative" label="Cancel" @click="goBack()"/>
            <q-btn color="primary" label="Submit" @click="submit()" :disable="!canSubmit"/>
        </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      canSubmit: false,
      name: '',
      fullname: '',
      acronym: '',
      city: '',
      stadium: '',
      players: [],
      allPlayers: [],
      filterPlayersOptions: []
    }
  },
  methods: {
    checkCanSubmit () {
      this.canSubmit = this.name !== '' && this.fullname !== '' && this.acronym !== '' && this.city !== '' && this.stadium !== ''
    },
    submit () {
      const params = {
        name: this.name,
        stadium: this.stadium,
        city: this.city,
        full_name: this.fullname,
        acronym: this.acronym
      }
      this.$axios.post('/api/club/', params).then(response => {
        const clubId = response.data.id
        for (const playerToAdd of this.players) {
          this.$axios.put('/api/club/' + clubId + '/addplayer/' + playerToAdd.value + '/')
        }
        this.goBack()
      })
    },
    goBack () {
      this.$router.push('/clubs')
    },
    filterFn (val, update) {
      update(() => {
        if (val.length > 2) {
          const needle = val.toLowerCase()
          this.filterPlayersOptions = this.allPlayers.filter(
            v => v.label.toLowerCase().indexOf(needle) > -1
          )
        } else {
          this.filterPlayersOptions = []
        }
      })
    },
    computeAcronym () {
      const fullnameParts = this.fullname.split(' ')
      this.acronym = ''
      for (const part of fullnameParts) {
        if (part) {
          this.acronym += part[0]
        }
      }
    }
  },
  created () {
    this.$axios.get('/api/player/')
      .then(response => {
        this.allPlayers = response.data.map(player => {
          return {
            label: player.fullname,
            value: player.id
          }
        })
      })
  }
}
</script>
