<template>
  <div class="full-width">
    <q-btn
      color="primary"
      class="full-width"
      v-bind:label="label"
      icon="person"
      @click="openDialog()"
      :disable="disable"
      />
    <q-dialog v-model="playerDialog">
      <q-card>
        <q-card-section>
          <div class="text-h5">
            {{ title }}
          </div>
          <div class="full-width row justify-around">
            <q-circular-progress
                indeterminate
                color="primary"
                class="q-ma-md "
                size="50px"
                v-bind:class="{ hidden: playersLoaded }"
              />
          </div>
          <q-option-group
            v-model="value"
            :options="players"
            @input="setOption()"
            v-bind:type="selectorType"
            v-bind:class="{ hidden: !playersLoaded }"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'PlayerSelector',
  props: {
    valueId: {
      type: String,
      required: true
    },
    matchId: {
      type: Number,
      required: true
    },
    timestamp: {
      type: String,
      required: true
    },
    teamId: {
      type: Number,
      default: undefined
    },
    as_substitute: {
      type: Boolean,
      default: false
    },
    selectorType: {
      type: String,
      default: 'radio'
    },
    title: {
      type: String,
      required: true
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  created () {
    if (this.teamId === undefined) {
      this.loadPossiblePlayers()
    } else {
      this.intervalId = setInterval(() => {
        if (!this.playersLoaded && this.teamId !== null && this.teamId !== undefined) {
          this.loadPossiblePlayers()
        }
      }, 50)
    }
  },
  methods: {
    openDialog () {
      this.playerDialog = true
    },
    setOption () {
      this.playerDialog = false
      this.label = this.players.filter(p => { return p.value === this.value })[0].label
      this.$store.state.eventForms[this.valueId] = this.value
    },
    loadPossiblePlayers () {
      clearInterval(this.intervalId)
      const getPlayersParams = {}
      if (this.teamId) {
        getPlayersParams.teamId = this.teamId
      }
      if (this.as_substitute) {
        getPlayersParams.as_substitute = this.as_substitute + ''
      }
      this.$axios.get('/api/match/' + this.$store.state.matchId + '/players/' + this.timestamp + '/',
        {
          params: getPlayersParams
        }).then(response => {
        this.players = []
        for (const player of response.data) {
          this.players.push({
            label: player.club.acronym + ' - ' + player.position + ' - ' + player.name + ' ' + player.surname,
            value: player
          })
        }
        this.playersLoaded = true
      })
    }
  },
  data () {
    return {
      label: 'Choose player',
      playerDialog: false,
      players: [],
      playersLoaded: false,
      value: null,
      intervalId: null
    }
  }
}
</script>
