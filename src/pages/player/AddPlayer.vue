<template>
  <q-page class="flex items-center justify-around">
    <div class="column justify-between">
        <span class="text-h4">Add New Player</span>
        <q-input filled v-model="name"
          label="Name" class="q-ma-sm" @input="checkCanSubmit()"/>
        <q-input filled v-model="surname"
          label="Surname" class="q-ma-sm" @input="checkCanSubmit()"/>
        <q-select filled v-model="position"
          :options="positionOptions" label="Position" class="q-ma-sm" @input="checkCanSubmit()"/>
        <q-select filled v-model="club" :options="clubOptions"
          label="Club" class="q-ma-sm" emit-value map-options @input="checkCanSubmit()"/>
        <div class="row justify-around">
            <q-btn color="negative" label="Cancel" @click="goBack()"/>
            <q-btn color="primary" label="Submit" @click="submit()" :disable="!canSubmit"/>
        </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      positionOptions: ['GOALKEEPER', 'DEFENSE', 'MIDFIELDER', 'FORWARD'],
      clubOptions: [],
      canSubmit: false,
      club: null,
      name: '',
      surname: '',
      position: null
    }
  },
  methods: {
    checkCanSubmit () {
      this.canSubmit = this.name !== '' && this.surname !== '' && this.position !== null
    },
    submit () {
      const params = {
        name: this.name,
        surname: this.surname,
        position: this.position
      }
      if (this.club) {
        params.club = this.club
      }
      this.$axios.post('/api/player/', params).then(response => { this.goBack() })
    },
    goBack () {
      this.$router.push('/players')
    }
  },
  created () {
    this.$axios.get('/api/club/').then(response => {
      for (const club of response.data) {
        this.clubOptions.push({
          label: club.name,
          value: club.id
        })
      }
    })
  }
}
</script>
