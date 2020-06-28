<template>
  <q-page class="flex items-center justify-between">
    <clock timeIn="2" minutesIn="10" secondsIn="20"/>
    <!-- <q-btn @click="test()">test</q-btn> -->
  </q-page>
</template>

<script>
import Clock from 'components/Clock.vue'
export default {
  name: 'PageIndex',
  components: {
    Clock
  },
  data () {
    return {
      matchLoaded: false,
      match: null,
      teamAPlayersLoaded: false,
      teamBPlayersLoaded: false,
      teamAPlayers: { titulars: [], substitutes: [] },
      teamBPlayers: { titulars: [], substitutes: [] }
    }
  },
  methods: {
    test () {
      console.log('test')
      console.log(this.$store.state.timestamp)
    }
  }
}
</script>
