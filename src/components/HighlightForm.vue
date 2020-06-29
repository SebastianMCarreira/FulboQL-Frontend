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
          <q-item-label>Involved Players:</q-item-label>
          <player-selector
            v-bind:valueId="selectedPlayersValueId"
            v-bind:matchId="this.$store.state.matchId"
            v-bind:timestamp="this.$store.state.timestamp"
          />
        </q-item-section>
      </q-item>
      <q-item class="flex justify-end">
        <q-btn label="Submit" color="primary" @click="submit()"/>
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
  created () {},
  methods: {
    async submit () {
      await this.$axios.post('/api/match/' + this.$store.state.matchId + '/events/' + this.$store.state.timestamp + '/highlight/',
        {
          description: this.description,
          players: [this.$store.state.eventForms[this.selectedPlayersValueId].id]
        }
      )
      this.$store.state.eventForms[this.selectedPlayersValueId] = undefined
      this.$store.state.closeLogEvent()
    }
  },
  data () {
    return {
      description: '',
      selectedPlayersValueId: 'highlight-players'
    }
  }
}
</script>
