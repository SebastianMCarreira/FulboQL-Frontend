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
        <q-card class="my-card full-width">
          <q-card-section>
            {{ match.teamA.club.name }} vs. {{ match.teamB.club.name }}
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
    }
  },
  created () {
    this.loadMatches()
  }
}
</script>
