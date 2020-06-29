<template>
  <div class="full-width">
    <q-btn
      color="primary"
      class="full-width"
      v-bind:label="label"
      icon="person"
      @click="openDialog()"
      />
    <q-dialog v-model="playerDialog">
      <q-card>
        <q-card-section>
          <q-option-group
            v-model="value"
            :options="players"
            @input="setOption()"
            v-bind:type="selectorType"
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
    }
  },
  created () {
    if (this.teamId === undefined) {
      this.loadPossiblePlayers()
    } else {
      setInterval(() => {
        if (!this.playersLoaded && this.teamId !== null && this.teamId !== undefined) {
          this.loadPossiblePlayers()
        }
      }, 200)
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
      value: null
    }
  }
}
</script>
