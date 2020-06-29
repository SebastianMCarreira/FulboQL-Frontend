<template>
  <div class="q-pa-lg">
    <span class="text-h4">Injury</span>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Injured:</q-item-label>
          <player-selector
            v-bind:valueId="injuredValueId"
            v-bind:matchId="this.$store.state.matchId"
            v-bind:timestamp="this.$store.state.timestamp"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Severity:</q-item-label>
          <q-select
            filled
            v-model="type"
            :options="injuryTypeOptions"
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
      await this.$axios.post('/api/match/' + this.$store.state.matchId + '/events/' + this.$store.state.timestamp + '/injury/',
        {
          severity: this.type,
          injured_id: this.$store.state.eventForms[this.injuredValueId].id
        }
      )
      this.$store.state.eventForms[this.injuredValueId] = undefined
      this.$store.state.closeLogEvent()
    }
  },
  data () {
    return {
      injuredValueId: 'injury-injured',
      injuryTypeOptions: ['LOW', 'MED', 'HIG', 'OUT'],
      type: null
    }
  }
}
</script>
