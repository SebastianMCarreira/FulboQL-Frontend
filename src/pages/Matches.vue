<template>
  <q-page class="flex" v-bind:class="{ 'flex-center': !matchesLoaded }">
    <q-circular-progress
      indeterminate
      size="50px"
      color="primary"
      class="q-ma-md absolute-center"
      v-bind:class="{ hidden: matchesLoaded }"
    />
    <div v-bind:class="{ hidden: !matchesLoaded }" class="row full-width">
      <q-item v-for="(match, index) in matches" v-bind:key="index" class="full-width">
        <q-card
          class="my-card full-width cursor-pointer relative-position list-bar"
          @click="goToMatch(match.id)">
          <q-card-section>
            <span class="text-bold">{{ match.teamA.club.name }}</span>
             vs.
            <span class="text-bold">{{ match.teamB.club.name }}</span>
            <span class="float-right">{{ match.dateOfStart }}</span>
          </q-card-section>
        </q-card>
      </q-item>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      matchesLoaded: false,
      matches: []
    }
  },
  methods: {
    loadMatches () {
      this.matchesLoaded = false
      this.$axios.get('/api/match').then(response => {
        this.matchesLoaded = true
        console.log(response.data)
        this.matches = response.data
      })
    },
    goToMatch (id) {
      this.$router.push('/match/' + id)
    }
  },
  created () {
    this.loadMatches()
  }
}
</script>
