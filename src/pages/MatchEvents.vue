<template>
  <q-page class="column justify-between q-pa-lg">
    <div class="row justify-around clock-row">
      <clock minutesIn="0" secondsIn="0"/>
    </div>
    <div class="row events-list flex justify-around scroll" style="flex-grow: 1" v-bind:class="{ 'items-center': !eventsLoaded }">
      <q-circular-progress
      indeterminate
      size="50px"
      color="primary"
      class="q-ma-md"
      v-bind:class="{ hidden: eventsLoaded }"
      />
      <div v-bind:class="{ hidden: !eventsLoaded }" class="fit">
        <q-item v-for="(event, index) in events" v-bind:key="index" class="full-width list-bar">
          <event-row v-bind:eventData="event"/>
        </q-item>
      </div>
    </div>
    <div class="flex justify-around">
      <q-btn color="primary" label="Log Event" @click="openLogEvent()"/>
    </div>
    <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 100%; height: 70vh; max-width: 600px" >
        <q-card-section>
          <div class="fit event-type-btns column justify-around" v-bind:class="{ hidden: !chooseEventType }">
            <div class="full-width flex justify-around q-pa-md">
              <q-btn color="primary" label="Time End/Start" @click="uploadMatchMoment()"/>
              <q-btn color="primary" label="Restart" :disable="!canLoadNormalEvents"  @click="restartForm()"/>
            </div>
            <div class="full-width flex justify-around q-pa-md">
              <q-btn color="primary" label="Highlight" :disable="!canLoadNormalEvents"/>
              <q-btn color="primary" label="Foul" :disable="!canLoadNormalEvents"/>
            </div>
            <div class="full-width flex justify-around q-pa-md">
              <q-btn color="primary" label="On Goal" :disable="!canLoadNormalEvents"/>
              <q-btn color="primary" label="Substitution" :disable="!canLoadNormalEvents"/>
            </div>
            <div class="full-width flex justify-around q-pa-md">
              <q-btn color="primary" label="Injury" :disable="!canLoadNormalEvents"/>
              <q-btn color="primary" label="Cancel" @click="closeLogEvent()"/>
            </div>
          </div>
          <div v-bind:class="{ hidden: chooseEventType }" ref="formContainer">
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Vue from 'vue'
import Clock from 'components/Clock.vue'
import EventRow from 'components/EventRow.vue'
import RestartForm from 'components/RestartForm.vue'
export default {
  name: 'PageIndex',
  components: {
    Clock,
    EventRow
  },
  data () {
    return {
      eventsLoaded: false,
      events: [],
      dialog: false,
      position: 'bottom',
      chooseEventType: true,
      matchTime: -1,
      pause: true,
      lastMatchMoment: null,
      MATCH_MOMENTS_ORDER: [
        'FIRSTTIMESTART',
        'FIRSTTIMEEND',
        'SECONTIMESTART',
        'SECONTIMEEND',
        'FIRSTEXTRASTART',
        'FIRSTEXTRAEND',
        'SECONEXTRASTART',
        'SECONEXTRAEND'
      ],
      STOPPED_MATCH_MOMENTS: [1, 3, 5, 7],
      canLoadNormalEvents: false
    }
  },
  methods: {
    loadEvents () {
      this.eventsLoaded = false
      this.$axios.get('/api/match/' + this.$route.params.id + '/events').then(response => {
        this.eventsLoaded = true
        this.events = response.data
      })
    },
    openLogEvent () {
      this.dialog = true
      this.chooseEventType = true
    },
    closeLogEvent () {
      this.dialog = false
      for (const child of this.$refs.formContainer.children) {
        child.remove()
      }
      this.loadEvents()
    },
    uploadMatchMoment () {
      if (this.$store.state.matchTime < 7) {
        this.$store.state.matchTime++
      }
      this.$store.state.clockPlay = !this.STOPPED_MATCH_MOMENTS.includes(this.$store.state.matchTime)
      this.canLoadNormalEvents = !this.STOPPED_MATCH_MOMENTS.includes(this.$store.state.matchTime)
      console.log(this.canLoadNormalEvents)
      this.$axios.post('/api/match/' + this.$route.params.id + '/events/' + this.$store.state.timestamp + '/matchmoment/',
        {
          momentType: this.MATCH_MOMENTS_ORDER[this.$store.state.matchTime]
        })
        .then(response => {
          this.closeLogEvent()
        })
    },
    restartForm () {
      this.chooseEventType = false
      const ComponentClass = Vue.extend(RestartForm)
      const instance = new ComponentClass({
        propsData: {}
      })
      instance.$store = this.$store
      instance.$mount()
      this.$refs.formContainer.appendChild(instance.$el)
    }
  },
  created () {
    this.$store.state.matchTime = -1
    this.$store.state.clockPlay = false
    this.$store.state.eventForms = {}
    this.$store.state.matchId = parseInt(this.$route.params.id)
    this.$store.state.closeLogEvent = this.closeLogEvent
    this.loadEvents()
  }
}
</script>
