<template>
  <q-page class="flex" v-bind:class="{ 'flex-center': !playersLoaded }">
    <q-circular-progress
      indeterminate
      size="50px"
      color="primary"
      class="q-ma-md absolute-center"
      v-bind:class="{ hidden: playersLoaded }"
    />
    <div v-bind:class="{ hidden: !playersLoaded }" class="row full-width">
      <q-item v-for="(player, index) in players" v-bind:key="index" class="full-width">
        <q-card
          class="my-card full-width cursor-pointer relative-position list-bar"
          @click="goToPlayer(player.id)">
          <q-card-section class="row justify-between q-pt-sm">
            <q-icon name="perm_identity" size="30px"/>
            <span class="q-pt-sm">{{ player.fullname }}</span>
            <q-chip> {{ player.position }} </q-chip>
            <span class="q-pt-sm">{{ player.club.name }}</span>
          </q-card-section>
        </q-card>
      </q-item>
    </div>
    <floating-add-btn route="/addPlayer"/>
  </q-page>
</template>

<script>
import FloatingAddBtn from 'components/FloatingAddBtn.vue'
export default {
  name: 'PageIndex',
  components: {
    FloatingAddBtn
  },
  data () {
    return {
      playersLoaded: false,
      players: []
    }
  },
  methods: {
    loadMatches () {
      this.playersLoaded = false
      this.$axios.get('/api/player/').then(response => {
        this.playersLoaded = true
        this.players = response.data
      })
    },
    goToMatch (id) {
      this.$router.push('/match/' + id)
    },
    goToPlayer (id) {
      this.$router.push('/editPlayer/' + id)
    }
  },
  created () {
    this.loadMatches()
  }
}
</script>
