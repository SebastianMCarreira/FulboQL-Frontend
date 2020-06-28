<template>
  <div>
    <div class="flex items-center justify-between clock" v-bind:style="{ height: totalHeight, width: totalWidth }">
        <q-icon :name="matAccessTime" :size="iconsSize"/>
        <div v-bind:style="{ fontSize: textSize }" @click="open('bottom')">{{ timestamp }}</div>
        <q-icon v-bind:class="{ hidden: play }" :name="matPlayArrow" @click="togglePlay()" :size="iconsSize"/>
        <q-icon v-bind:class="{ hidden: !play }" :name="matPause" @click="togglePlay()" :size="iconsSize"/>
    </div>
    <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 350px">
        <q-card-section class="flex justify-around items-center no-wrap">
          <q-btn flat round icon="replay_10" @click="increaseTime(-10)" :size="'30px'"/>
          <q-icon v-bind:class="{ hidden: play }" :name="matPlayArrow" @click="togglePlay()" :size="'50px'"/>
          <q-icon v-bind:class="{ hidden: !play }" :name="matPause" @click="togglePlay()" :size="'50px'"/>
          <q-btn flat round icon="forward_10" @click="increaseTime(10)" :size="'30px'"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { matAccessTime, matPlayArrow, matPause } from '@quasar/extras/material-icons'
export default {
  name: 'Clock',
  props: {
    minutesIn: {
      type: String,
      required: true
    },
    secondsIn: {
      type: String,
      required: true
    },
    timeIn: {
      type: String,
      required: true
    },
    milisecondsIn: {
      type: String,
      required: false,
      default: '0'
    },
    size: {
      type: String,
      default: '60'
    }
  },
  created () {
    this.seconds = parseInt(this.secondsIn)
    this.minutes = parseInt(this.minutesIn)
    this.time = parseInt(this.timeIn)
    this.miliseconds = parseInt(this.milisecondsIn)
    this.matAccessTime = matAccessTime
    this.matPlayArrow = matPlayArrow
    this.matPause = matPause
    this.iconsSize = this.size + 'px'
    this.textSize = Math.floor(this.size * 0.65) + 'px'
    this.totalHeight = Math.floor(this.size * 1.4) + 'px'
    this.totalWidth = Math.floor(this.size * 5.5) + 'px'
    this.computeTimestamp()
    setInterval(() => {
      this.increaseTime()
      this.computeTimestamp()
    }, 10)
  },
  methods: {
    computeTimestamp () {
      let baseMinutes = 0
      let timeMinutes = 45
      if (this.time === 1) {
        baseMinutes = 45
      } else if (this.time === 2) {
        baseMinutes = 90
        timeMinutes = 15
      } else if (this.time === 3) {
        baseMinutes = 105
        timeMinutes = 15
      }
      const extraMinutes = this.minutes - timeMinutes
      let minutePart = ''
      if (extraMinutes >= 0) {
        const totalTimeMinutes = baseMinutes + timeMinutes
        minutePart = totalTimeMinutes + '+' + extraMinutes
      } else {
        minutePart = baseMinutes + this.minutes + ''
      }
      let secondsPart = ''
      if (this.seconds < 10) {
        secondsPart = '0' + this.seconds
      } else {
        secondsPart = this.seconds
      }
      const timestamp = minutePart + ':' + secondsPart
      this.timestamp = timestamp
      this.$store.state.timestamp = timestamp
    },
    increaseTime (times) {
      times = times || 1
      if (times !== 1) {
        this.seconds += times
        if (this.seconds >= 60) {
          this.seconds = this.seconds - 60
          this.minutes++
        } else if (this.seconds < 0) {
          this.seconds = 60 + this.seconds
          this.minutes--
        }
      }
      if (this.play) {
        this.miliseconds += 10 * times
        if (this.miliseconds >= 1000) {
          this.miliseconds = 0
          this.seconds++
          if (this.seconds >= 60) {
            this.seconds = 0
            this.minutes++
          }
        }
      }
    },
    togglePlay () {
      this.play = !this.play
    },
    open (position) {
      this.position = position
      this.dialog = true
    }
  },
  data () {
    return {
      timestamp: '',
      seconds: 0,
      minutes: 0,
      time: 0,
      miliseconds: 0,
      play: true,
      dialog: false,
      position: 'bottom'
    }
  }
}
</script>
