<template>
  <q-page class="flex" v-bind:class="{ 'flex-center': !refereesLoaded }">
    <q-circular-progress
      indeterminate
      size="50px"
      color="primary"
      class="q-ma-md absolute-center"
      v-bind:class="{ hidden: refereesLoaded }"
    />
    <div v-bind:class="{ hidden: !refereesLoaded }" class="column full-width items-start">
      <q-item v-for="(referee, index) in referees" v-bind:key="index" class="full-width">
        <q-card
          class="my-card full-width cursor-pointer relative-position list-bar"
          @click="goToReferee(referee.id)">
          <q-card-section class="row justify-between q-pt-sm">
            <q-icon name="sports" size="30px"/>
            <span class="q-pt-sm">{{ referee.fullname }}</span>
          </q-card-section>
        </q-card>
      </q-item>
    </div>
    <floating-add-btn route="/addReferee"/>
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
      refereesLoaded: false,
      referees: []
    }
  },
  methods: {
    loadReferees () {
      this.refereesLoaded = false
      this.$axios.get('/api/referee/').then(response => {
        this.refereesLoaded = true
        this.referees = response.data
      })
    },
    goToReferee (id) {
      this.$router.push('/editReferee/' + id)
    }
  },
  created () {
    this.loadReferees()
  }
}
</script>
