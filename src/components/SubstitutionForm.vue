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
            v-bind:as_substitute="true"/>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Player Out:</q-item-label>
          <player-selector
            v-bind:valueId="playerOutValueId"
            v-bind:matchId="this.$store.state.matchId"
            v-bind:timestamp="this.$store.state.timestamp"
            v-bind:teamId="this.playerOutTeamId"/>
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
  name: 'OnGoalForm',
  props: {},
  components: {
    PlayerSelector
  },
  created () {
    setInterval(() => {
      const playerIn = this.$store.state.eventForms[this.playerInValueId]
      if (playerIn) {
        const teams = [this.$store.state.match.teamA, this.$store.state.match.teamB]
        this.playerOutTeamId = teams.filter(team => { return team.club.id === playerIn.club.id })[0].id
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
      this.$store.state.eventForms[this.playerInValueId] = undefined
      this.$store.state.eventForms[this.playerOutValueId] = undefined
      this.$store.state.closeLogEvent()
    }
  },
  data () {
    return {
      playerInValueId: 'substitution-in',
      playerOutValueId: 'substitution-out',
      playerOutTeamId: null
    }
  }
}
</script>
