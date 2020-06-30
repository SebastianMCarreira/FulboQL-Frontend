<template>
  <q-page class="flex items-center justify-around q-pb-md">
    <div class="column justify-between full-width">
        <span class="text-h4 q-pa-md">Add New Match</span>
        <q-card class="q-ma-sm q-pa-md">
          <span class="text-h3 q-pa-md">{{ clubA.label }}</span>
          <q-select
            filled
            v-model="clubA"
            :options="clubAOptions"
            label="Club A"
            map-options
            class="q-ma-sm"
            @input="inputClubA()"
            />
          <q-select
            filled
            v-model="managerA"
            :options="managerAOptions"
            label="Manager A"
            map-options
            class="q-ma-sm"
            @input="checkCanSubmit()"
            />
          <q-select
            filled
            label="Titulars A"
            v-model="titularsA"
            use-chips
            multiple
            map-options
            :options="titularsAOptions"
            max-values="11"
            class="q-ma-sm"
            @input="inputTitularsA()"
            />
          <q-select
            filled
            label="Substitutes A"
            v-model="substitutesA"
            use-chips
            multiple
            map-options
            :options="substitutesAOptions"
            max-values="7"
            class="q-ma-sm"
            @input="inputSubstituesA()"
            />
        </q-card>
        <q-card class="q-ma-sm q-pa-md">
          <span class="text-h3 q-pa-md">{{ clubB.label }}</span>
          <q-select
            filled
            v-model="clubB"
            :options="clubBOptions"
            label="Club B"
            map-options
            class="q-ma-sm"
            @input="inputClubB()"
            />
          <q-select
            filled
            v-model="managerB"
            :options="managerBOptions"
            label="Manager B"
            map-options
            class="q-ma-sm"
            @input="checkCanSubmit()"
            />
          <q-select
            filled
            label="Titulars B"
            v-model="titularsB"
            use-chips
            multiple
            map-options
            :options="titularsBOptions"
            max-values="11"
            class="q-ma-sm"
            @input="inputTitularsB()"
            />
          <q-select
            filled
            label="Substitutes B"
            v-model="substitutesB"
            use-chips
            multiple
            map-options
            :options="substitutesBOptions"
            max-values="7"
            class="q-ma-sm"
            @input="inputSubstituesB()"
            />
        </q-card>
        <q-card class="row justify-between q-ma-sm q-px-md">
          <q-select
            filled
            v-model="referee"
            :options="refereeOptions"
            label="Referee"
            map-options
            class="q-ma-sm col-md-8 col-sm-12 col-xs-12"
            @input="checkCanSubmit()"
            />
          <q-input filled v-model="date" class="q-ma-sm col-md-3 col-sm-12 col-xs-12">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" mask="YYYY/MM/DD HH:mm"  @input="checkCanSubmit()" />
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="date" mask="YYYY/MM/DD HH:mm" format24h  @input="checkCanSubmit()"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card>
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
      clubA: { label: 'Club A' },
      clubAOptions: [],
      managerA: null,
      managerAOptions: [],
      playersA: [],
      titularsA: [],
      titularsAOptions: [],
      substitutesA: [],
      substitutesAOptions: [],
      clubB: { label: 'Club B' },
      clubBOptions: [],
      managerB: null,
      managerBOptions: [],
      playersB: [],
      titularsB: [],
      titularsBOptions: [],
      substitutesB: [],
      substitutesBOptions: [],
      referee: null,
      refereeOptions: [],
      date: null,
      allClubs: []
    }
  },
  methods: {
    checkCanSubmit () {
      this.canSubmit = this.clubA.value && this.clubB.value &&
        this.managerA && this.managerB && this.titularsA.length === 2 &&
        this.substitutesA.length === 2 && this.titularsB.length === 2 &&
        this.substitutesB.length === 2 && this.referee && this.date
      console.log(this.date)
    },
    async submit () {
      const paramsTeamA = {
        club: this.clubA.value,
        manager: this.managerA.value,
        titulars: this.titularsA.map(p => { return p.value }),
        substitutes: this.substitutesA.map(p => { return p.value })
      }
      const paramsTeamB = {
        club: this.clubB.value,
        manager: this.managerB.value,
        titulars: this.titularsB.map(p => { return p.value }),
        substitutes: this.substitutesB.map(p => { return p.value })
      }
      const teams = {}
      teams.teamA = (await this.$axios.post('/api/team/', paramsTeamA)).data.id
      teams.teamB = (await this.$axios.post('/api/team/', paramsTeamB)).data.id
      this.$axios.post('/api/match/', {
        teamA: teams.teamA,
        teamB: teams.teamB,
        dateOfStart: this.date,
        referee: this.referee.value
      }).then(response => {
        this.goBack()
      })
    },
    goBack () {
      this.$router.push('/matches')
    },
    inputClubA () {
      this.computeClubsB()
      this.loadManagersA()
      this.loadPlayersA()
      this.checkCanSubmit()
    },
    inputTitularsA () {
      this.computeSubstitutesA()
      this.checkCanSubmit()
    },
    inputSubstituesA () {
      this.computeTitularsA()
      this.checkCanSubmit()
    },
    inputClubB () {
      this.computeClubsA()
      this.loadManagersB()
      this.loadPlayersB()
      this.checkCanSubmit()
    },
    inputTitularsB () {
      this.computeSubstitutesB()
      this.checkCanSubmit()
    },
    inputSubstituesB () {
      this.computeTitularsB()
      this.checkCanSubmit()
    },
    loadManagersA () {
      this.managerAOptions = []
      this.$axios.get('/api/club/' + this.clubA.value + '/managers/').then(response => {
        this.managerAOptions = response.data.map(m => {
          return {
            label: m.fullname,
            value: m.id
          }
        })
      })
    },
    loadPlayersA () {
      this.playersA = []
      this.$axios.get('/api/club/' + this.clubA.value + '/players/').then(response => {
        this.playersA = response.data.map(p => {
          return {
            label: p.fullname,
            value: p.id
          }
        })
        this.computeTitularsA()
        this.computeSubstitutesA()
      })
    },
    computeTitularsA () {
      this.titularsAOptions = this.playersA.filter(p => !this.substitutesA.includes(p))
    },
    computeSubstitutesA () {
      this.substitutesAOptions = this.playersA.filter(p => !this.titularsA.includes(p))
    },
    loadManagersB () {
      this.managerBOptions = []
      this.$axios.get('/api/club/' + this.clubB.value + '/managers/').then(response => {
        this.managerBOptions = response.data.map(m => {
          return {
            label: m.fullname,
            value: m.id
          }
        })
      })
    },
    loadPlayersB () {
      this.playersB = []
      this.$axios.get('/api/club/' + this.clubB.value + '/players/').then(response => {
        this.playersB = response.data.map(p => {
          return {
            label: p.fullname,
            value: p.id
          }
        })
        this.computeTitularsB()
        this.computeSubstitutesB()
      })
    },
    computeTitularsB () {
      this.titularsBOptions = this.playersB.filter(p => !this.substitutesB.includes(p))
    },
    computeSubstitutesB () {
      this.substitutesBOptions = this.playersB.filter(p => !this.titularsB.includes(p))
    },
    computeClubsA () {
      this.clubAOptions = this.allClubs.filter(c => c.id !== this.clubB.value).map(c => {
        return {
          label: c.name,
          value: c.id
        }
      })
    },
    computeClubsB () {
      this.clubBOptions = this.allClubs.filter(c => c.id !== this.clubA.value).map(c => {
        return {
          label: c.name,
          value: c.id
        }
      })
    }
  },
  created () {
    this.$axios.get('/api/club/').then(response => {
      this.allClubs = response.data
      this.computeClubsA()
      this.computeClubsB()
    })
    this.$axios.get('/api/referee/').then(response => {
      this.refereeOptions = response.data.map(r => {
        return {
          label: r.fullname,
          value: r.id
        }
      })
    })
  }
}
</script>
