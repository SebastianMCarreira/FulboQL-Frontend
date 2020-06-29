<template>
  <div class="q-pa-lg">
    <span class="text-h4">Foul</span>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Perpetrator:</q-item-label>
          <player-selector
            v-bind:valueId="perpetratorValueId"
            v-bind:matchId="this.$store.state.matchId"
            v-bind:timestamp="this.$store.state.timestamp"/>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Punishment:</q-item-label>
          <q-select
            filled
            v-model="punishment"
            :options="punishmentOptions"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Foul Type:</q-item-label>
          <q-select
            filled
            v-model="foulType"
            :options="foulTypeOptions"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Victim:</q-item-label>
          <player-selector
            v-bind:valueId="victimValueId"
            v-bind:matchId="this.$store.state.matchId"
            v-bind:timestamp="this.$store.state.timestamp"
            v-bind:teamId="this.victimTeamId"/>
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
  created () {
    setInterval(() => {
      const perpetrator = this.$store.state.eventForms[this.perpetratorValueId]
      if (perpetrator) {
        const teams = [this.$store.state.match.teamA, this.$store.state.match.teamB]
        this.victimTeamId = teams.filter(team => { return team.club.id !== perpetrator.club.id })[0].id
      }
    }, 200)
  },
  methods: {
    async submit () {
      const params = {
        perpetrator_id: this.$store.state.eventForms[this.perpetratorValueId].id,
        foulType: this.foulType,
        punishment: this.punishment
      }
      const victim = this.$store.state.eventForms[this.victimValueId]
      if (victim) {
        params.victim_id = victim.id
      }
      await this.$axios.post('/api/match/' + this.$store.state.matchId + '/events/' + this.$store.state.timestamp + '/foul/',
        params
      )
      this.$store.state.eventForms[this.perpetratorValueId] = undefined
      this.$store.state.eventForms[this.victimValueId] = undefined
      this.$store.state.closeLogEvent()
    }
  },
  data () {
    return {
      punishment: null,
      foulType: null,
      punishmentOptions: ['NONE', 'WARNING', 'YELLOW', 'RED'],
      foulTypeOptions: [
        'HAND', 'VIOLENTKICK', 'OTHERVIOLENCE', 'HOLDPLAYER',
        'CHARGEPLAYER', 'BACKPASS', 'REFEREEINSULT', 'OFFSIDE'
      ],
      perpetratorValueId: 'foul-perpetrator',
      victimValueId: 'foul-victim',
      victimTeamId: null
    }
  }
}
</script>
