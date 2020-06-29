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
            title="Executor"
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
      const executor = this.$store.state.eventForms[this.executorValueId]
      this.canSubmit = executor && this.type
    }, 200)
  },
  methods: {
    async submit () {
      await this.$axios.post('/api/match/' + this.$store.state.matchId + '/events/' + this.$store.state.timestamp + '/restart/',
        {
          restartType: this.type,
          executor_id: this.$store.state.eventForms[this.executorValueId].id
        }
      )
      this.close()
    },
    close () {
      this.$store.state.eventForms[this.executorValueId] = undefined
      clearInterval(this.intervalId)
      this.$store.state.closeLogEvent()
    }
  },
  data () {
    return {
      executorValueId: 'restart-executor',
      restartTypeOptions: [
        'FREEKICK', 'PENALTY', 'GOALKICK',
        'DROPBALL', 'CORNER', 'KICKOFF', 'THROWIN'
      ],
      type: null,
      intervalId: null,
      canSubmit: false
    }
  }
}
</script>
