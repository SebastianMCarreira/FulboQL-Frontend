<template>
  <div class="q-pa-lg">
    <span class="text-h4">On Goal</span>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Shooter:</q-item-label>
          <player-selector
            v-bind:valueId="shooterValueId"
            v-bind:matchId="this.$store.state.matchId"
            v-bind:timestamp="this.$store.state.timestamp"/>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Goalkeeper:</q-item-label>
          <player-selector
            v-bind:valueId="goalkeeperValueId"
            v-bind:matchId="this.$store.state.matchId"
            v-bind:timestamp="this.$store.state.timestamp"
            v-bind:teamId="this.goalkeeperTeamId"/>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Assist:</q-item-label>
          <player-selector
            v-bind:valueId="assistValueId"
            v-bind:matchId="this.$store.state.matchId"
            v-bind:timestamp="this.$store.state.timestamp"
            v-bind:teamId="this.assistTeamId"/>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="row justify-between">
          <q-checkbox v-model="goal" label="Goal"/>
          <q-checkbox v-model="penalty" label="Penalty"/>
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
      const shooter = this.$store.state.eventForms[this.shooterValueId]
      if (shooter) {
        const teams = [this.$store.state.match.teamA, this.$store.state.match.teamB]
        this.goalkeeperTeamId = teams.filter(team => { return team.club.id !== shooter.club.id })[0].id
        this.assistTeamId = teams.filter(team => { return team.club.id === shooter.club.id })[0].id
      }
    }, 200)
  },
  methods: {
    async submit () {
      const parameters = {
        shooter_id: this.$store.state.eventForms[this.shooterValueId].id,
        goalkeeper_id: this.$store.state.eventForms[this.goalkeeperValueId].id,
        goal: this.goal,
        penalty: this.penalty
      }
      const assist = this.$store.state.eventForms[this.assistValueId]
      if (assist) {
        parameters.assist_id = assist.id
      }
      await this.$axios.post('/api/match/' + this.$store.state.matchId + '/events/' + this.$store.state.timestamp + '/ongoal/',
        parameters
      )
      this.$store.state.eventForms[this.shooterValueId] = undefined
      this.$store.state.eventForms[this.goalkeeperValueId] = undefined
      this.$store.state.eventForms[this.assistValueId] = undefined
      this.$store.state.closeLogEvent()
    }
  },
  data () {
    return {
      shooterValueId: 'ongoal-shooter',
      assistValueId: 'ongoal-assist',
      goalkeeperValueId: 'ongoal-goalkeeper',
      goalkeeperTeamId: null,
      assistTeamId: null,
      goal: false,
      penalty: false
    }
  }
}
</script>
