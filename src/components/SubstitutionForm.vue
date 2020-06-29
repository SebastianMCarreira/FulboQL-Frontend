<template>
  <div class="q-pa-lg">
    <span class="text-h4">Substitution</span>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Player In:</q-item-label>
          <player-selector
            v-bind:valueId="playerInValueId"
            v-bind:matchId="this.$store.state.matchId"
            v-bind:timestamp="this.$store.state.timestamp"
            v-bind:as_substitute="true"
            title="Player In"/>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Player Out:</q-item-label>
          <player-selector
            v-bind:valueId="playerOutValueId"
            v-bind:matchId="this.$store.state.matchId"
            v-bind:timestamp="this.$store.state.timestamp"
            v-bind:teamId="this.playerOutTeamId"
            :disable="!this.canLoadPOut"
            title="Player Out"/>
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
  name: 'OnGoalForm',
  props: {},
  components: {
    PlayerSelector
  },
  created () {
    this.intervalId = setInterval(() => {
      const playerIn = this.$store.state.eventForms[this.playerInValueId]
      if (playerIn) {
        this.canLoadPOut = true
        const teams = [this.$store.state.match.teamA, this.$store.state.match.teamB]
        this.playerOutTeamId = teams.filter(team => { return team.club.id === playerIn.club.id })[0].id
        const playerOut = this.$store.state.eventForms[this.playerOutValueId]
        this.canSubmit = Boolean(playerOut)
      }
    }, 200)
  },
  methods: {
    async submit () {
      const parameters = {
        inPlayer_id: this.$store.state.eventForms[this.playerInValueId].id,
        outPlayer_id: this.$store.state.eventForms[this.playerOutValueId].id
      }
      await this.$axios.post('/api/match/' + this.$store.state.matchId + '/events/' + this.$store.state.timestamp + '/substitution/',
        parameters
      )
      this.close()
    },
    close () {
      this.$store.state.eventForms[this.playerInValueId] = undefined
      this.$store.state.eventForms[this.playerOutValueId] = undefined
      clearInterval(this.intervalId)
      this.$store.state.closeLogEvent()
    }
  },
  data () {
    return {
      playerInValueId: 'substitution-in',
      playerOutValueId: 'substitution-out',
      playerOutTeamId: null,
      canSubmit: false,
      intervalId: null,
      canLoadPOut: false
    }
  }
}
</script>
