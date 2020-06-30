<template>
  <q-page class="flex" v-bind:class="{ 'flex-center': !clubsLoaded }">
    <q-circular-progress
      indeterminate
      size="50px"
      color="primary"
      class="q-ma-md absolute-center"
      v-bind:class="{ hidden: clubsLoaded }"
    />
    <div v-bind:class="{ hidden: !clubsLoaded }" class="column full-width items-start">
      <q-item v-for="(club, index) in clubs" v-bind:key="index" class="full-width">
        <q-card
          class="my-card full-width cursor-pointer relative-position list-bar"
          @click="goToClub(club.id)">
          <q-card-section class="row justify-between q-pt-sm">
            <q-icon name="security" size="30px"/>
            <span class="q-pt-sm">{{ club.full_name }}</span>
            <span class="q-pt-sm">{{ club.city }}</span>
          </q-card-section>
        </q-card>
      </q-item>
    </div>
    <floating-add-btn route="/addClub"/>
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
      clubsLoaded: false,
      clubs: []
    }
  },
  methods: {
    loadClubs () {
      this.clubsLoaded = false
      this.$axios.get('/api/club/').then(response => {
        this.clubsLoaded = true
        this.clubs = response.data
      })
    },
    goToClub (id) {
      this.$router.push('/editClub/' + id)
    }
  },
  created () {
    this.loadClubs()
  }
}
</script>
