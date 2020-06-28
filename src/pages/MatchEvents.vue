<template>
  <q-page class="column justify-between q-pa-lg">
    <div class="row justify-around clock-row">
      <clock timeIn="0" minutesIn="0" secondsIn="0" v-bind:startPause="true"/>
    </div>
    <div class="row events-list flex justify-around " style="flex-grow: 1" v-bind:class="{ 'items-center': !eventsLoaded }">
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
      <q-card style="width: 100%; height: 70vh; max-width: 100vw" >
        <q-card-section>
          test
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Clock from 'components/Clock.vue'
import EventRow from 'components/EventRow.vue'
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
      position: 'bottom'
    }
  },
  methods: {
    loadEvents () {
      this.eventsLoaded = false
      this.$axios.get('/api/match/' + this.$route.params.id + '/events').then(response => {
        this.eventsLoaded = true
        console.log(response.data)
        this.events = response.data
      })
    },
    openLogEvent () {
      console.log('test')
      this.dialog = true
    }
  },
  created () {
    this.loadEvents()
  }
}
</script>
