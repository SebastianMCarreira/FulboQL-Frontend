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
      default: null
    },
    as_substitute: {
      type: Boolean,
      default: false
    }
  },
  created () {
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
          label: player.name + ' ' + player.surname,
          value: player.id
        })
      }
    })
  },
  methods: {
    openDialog () {
      this.playerDialog = true
    },
    setOption () {
      this.playerDialog = false
      this.label = this.players.filter(p => { return p.value === this.value })[0].label
      this.$store.state.eventForms[this.valueId] = this.value
    }
  },
  data () {
    return {
      label: 'Choose player',
      playerDialog: false,
      players: [],
      value: null
    }
  }
}
</script>
