<template>
  <q-page class="flex" v-bind:class="{ 'flex-center': !matchLoaded }">
    <q-circular-progress
      indeterminate
      size="50px"
      color="primary"
      class="q-ma-md absolute-center"
      v-bind:class="{ hidden: matchLoaded }"
    />
    <div v-bind:class="{ hidden: !matchLoaded }" class="full-width q-gutter-sm" style="padding: 15px;">
      <div class="row text-h5 sub-header">
        <div class="col-5">
          {{ match.teamA.club.name }}
        </div>
        <div class="col-2 text-center">VS.</div>
        <div class="col-5 text-right">
          {{ match.teamB.club.name }}
        </div>
      </div>
      <q-list>
        <q-item>
          <q-item-label>Referee: <span class="text-bold">{{ match.referee.name }} {{match.referee.surname }}</span></q-item-label>
        </q-item>
        <q-item>
          <q-item-label>Date of Start: <span class="text-bold">{{ match.dateOfStart }}</span></q-item-label>
        </q-item>
        <q-expansion-item
          expand-separator
          icon="perm_identity"
          v-bind:label="match.teamA.club.name + ' players'"
          class="full-width"
          @click="loadTeamA(match.teamA.id)"
        >
        <div class="flex q-px-xl" v-bind:class="{ 'justify-center': !teamAPlayersLoaded }">
          <q-circular-progress
                indeterminate
                color="primary"
                class="q-ma-md "
                size="50px"
                v-bind:class="{ hidden: teamAPlayersLoaded }"
              />
          <div v-bind:class="{ hidden: !teamAPlayersLoaded }"  class="full-width">
            <div class="text-h6">Titulars</div>
            <q-list>
              <q-item v-for="(player, index) in teamAPlayers.titulars" v-bind:key="index">
                <q-item-section>{{ player.name }} {{ player.surname }}</q-item-section>
                <q-item-section avatar><q-chip>{{ player.position }}</q-chip></q-item-section>
              </q-item>
            </q-list>
            <div class="text-h6">Substitutes</div>
            <q-list>
              <q-item v-for="(player, index) in teamAPlayers.substitutes" v-bind:key="index">
                <q-item-section>{{ player.name }} {{ player.surname }}</q-item-section>
                <q-item-section avatar><q-chip>{{ player.position }}</q-chip></q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="perm_identity"
          v-bind:label="match.teamB.club.name + ' players'"
          class="full-width"
          @click="loadTeamB(match.teamB.id)"
        >
        <div class="flex q-px-xl" v-bind:class="{ 'justify-center': !teamBPlayersLoaded }">
          <q-circular-progress
                indeterminate
                color="primary"
                class="q-ma-md "
                size="50px"
                v-bind:class="{ hidden: teamBPlayersLoaded }"
              />
          <div v-bind:class="{ hidden: !teamBPlayersLoaded }"  class="full-width">
            <div class="text-h6">Titulars</div>
            <q-list>
              <q-item v-for="(player, index) in teamBPlayers.titulars" v-bind:key="index">
                <q-item-section>{{ player.name }} {{ player.surname }}</q-item-section>
                <q-item-section avatar><q-chip>{{ player.position }}</q-chip></q-item-section>
              </q-item>
            </q-list>
            <div class="text-h6">Substitutes</div>
            <q-list>
              <q-item v-for="(player, index) in teamBPlayers.substitutes" v-bind:key="index">
                <q-item-section>{{ player.name }} {{ player.surname }}</q-item-section>
                <q-item-section avatar><q-chip>{{ player.position }}</q-chip></q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        </q-expansion-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
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
    loadMatch (id) {
      this.matchLoaded = false
      this.$axios.get('/api/match/' + id).then(response => {
        this.matchLoaded = true
        console.log(response.data)
        this.match = response.data
      })
    },
    loadTeamA (teamId) {
      if (!this.teamAPlayersLoaded) {
        this.$axios.get('/api/team/' + teamId + '/players').then(response => {
          this.teamAPlayers = response.data
          this.teamAPlayersLoaded = true
        })
      }
    },
    loadTeamB (teamId) {
      if (!this.teamBPlayersLoaded) {
        this.$axios.get('/api/team/' + teamId + '/players').then(response => {
          this.teamBPlayers = response.data
          this.teamBPlayersLoaded = true
        })
      }
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.loadMatch(this.$route.params.id)
  }
}
</script>
