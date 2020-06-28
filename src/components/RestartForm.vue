<template>
  <div class="q-pa-lg">
    <span class="text-h4">Restart</span>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Executor:</q-item-label>
          <player-selector
            v-bind:valueId="executorValueId"
            v-bind:matchId="this.$store.state.matchId"
            v-bind:timestamp="this.$store.state.timestamp"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Restart Type:</q-item-label>
          <q-select
            filled
            v-model="type"
            :options="restartTypeOptions"
            @input="setRestartType()"
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
    setRestartType () {
      this.$store.state.eventForms[this.restartTypeValueId] = this.type
    },
    async submit () {
      await this.$axios.post('/api/match/' + this.$store.state.matchId + '/events/' + this.$store.state.timestamp + '/restart/',
        {
          restartType: this.type,
          executor_id: this.$store.state.eventForms[this.executorValueId]
        }
      )
      this.$store.state.closeLogEvent()
    }
  },
  data () {
    return {
      executorValueId: 'restart-executor',
      restartTypeValueId: 'restart-type',
      restartTypeOptions: [
        'FREEKICK', 'PENALTY', 'GOALKICK',
        'DROPBALL', 'CORNER', 'KICKOFF', 'THROWIN'
      ],
      type: null
    }
  }
}
</script>
