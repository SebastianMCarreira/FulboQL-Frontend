<template>
  <div class="q-pa-lg">
    <span class="text-h4">Highlight</span>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Description:</q-item-label>
          <q-input
          v-model="description"
          filled
          autogrow
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Involved Player:</q-item-label>
          <player-selector
            v-bind:valueId="selectedPlayersValueId"
            v-bind:matchId="this.$store.state.matchId"
            v-bind:timestamp="this.$store.state.timestamp"
            title="Involved Player"
          />
        </q-item-section>
      </q-item>
      <q-item class="flex justify-between">
        <q-btn label="Cancel" color="negative" @click="close()"/>
        <q-btn label="Submit" color="primary" @click="submit()" :disable="!canSubmit"/>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import PlayerSelector from 'components/PlayerSelector.vue'
export default {
  name: 'RestartForm',
  props: {},
  components: {
    PlayerSelector
  },
  created () {
    this.intervalId = setInterval(() => {
      const player = this.$store.state.eventForms[this.selectedPlayersValueId]
      this.canSubmit = player && this.description
    }, 200)
  },
  methods: {
    async submit () {
      await this.$axios.post('/api/match/' + this.$store.state.matchId + '/events/' + this.$store.state.timestamp + '/highlight/',
        {
          description: this.description,
          players: [this.$store.state.eventForms[this.selectedPlayersValueId].id]
        }
      )
      this.close()
    },
    close () {
      this.$store.state.eventForms[this.selectedPlayersValueId] = undefined
      clearInterval(this.intervalId)
      this.$store.state.closeLogEvent()
    }
  },
  data () {
    return {
      description: '',
      selectedPlayersValueId: 'highlight-players',
      canSubmit: false,
      intervalId: null
    }
  }
}
</script>
