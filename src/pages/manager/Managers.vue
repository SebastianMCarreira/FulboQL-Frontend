<template>
  <q-page class="flex" v-bind:class="{ 'flex-center': !managersLoaded }">
    <q-circular-progress
      indeterminate
      size="50px"
      color="primary"
      class="q-ma-md absolute-center"
      v-bind:class="{ hidden: managersLoaded }"
    />
    <div v-bind:class="{ hidden: !managersLoaded }" class="column full-width items-start">
      <q-item v-for="(manager, index) in managers" v-bind:key="index" class="full-width">
        <q-card
          class="my-card full-width cursor-pointer relative-position list-bar"
          @click="goToManager(manager.id)">
          <q-card-section class="row justify-between q-pt-sm">
            <q-icon name="engineering" size="30px"/>
            <span class="q-pt-sm">{{ manager.fullname }}</span>
            <span class="q-pt-sm">{{ manager.club.name }}</span>
          </q-card-section>
        </q-card>
      </q-item>
    </div>
    <floating-add-btn route="/addManager"/>
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
      managersLoaded: false,
      managers: []
    }
  },
  methods: {
    loadManagers () {
      this.managersLoaded = false
      this.$axios.get('/api/manager/').then(response => {
        this.managersLoaded = true
        this.managers = response.data
      })
    },
    goToManager (id) {
      this.$router.push('/editManager/' + id)
    }
  },
  created () {
    this.loadManagers()
  }
}
</script>
