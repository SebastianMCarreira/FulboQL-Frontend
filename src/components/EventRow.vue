<template>
  <q-card class="full-width">
    <q-card-section class="q-pa-sm">
      <span class="float-left">{{ this.eventData.timestamp }}</span>
      <span class="float-right">{{ this.label }}</span>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'EventRow',
  props: {
    eventData: {
      type: Object,
      required: true
    }
  },
  created () {
    if (this.eventData.matchmoment !== undefined) {
      this.label = this.eventData.matchmoment.momentType
    } else if (this.eventData.foul !== undefined) {
      this.label = 'foul by ' + this.eventData.foul.perpetrator.surname
    } else if (this.eventData.highlight !== undefined) {
      this.label = 'highlight'
    } else if (this.eventData.ongoal !== undefined) {
      this.label = 'on goal by ' + this.eventData.ongoal.shooter.surname
    } else if (this.eventData.restart !== undefined) {
      this.label = this.eventData.restart.restartType + ' by ' + this.eventData.restart.executor.surname
    } else if (this.eventData.substitution !== undefined) {
      this.label = 'out: ' + this.eventData.substitution.outPlayer.surname + ' - in: ' + this.eventData.substitution.inPlayer.surname
    } else if (this.eventData.injury !== undefined) {
      this.label = this.eventData.injury.injured.surname + ' injured'
    }
  },
  methods: {},
  data () {
    return {
      label: ''
    }
  }
}
</script>
