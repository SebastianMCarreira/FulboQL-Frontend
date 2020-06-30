<template>
  <q-page class="flex items-center justify-around">
    <div class="column justify-between">
        <span class="text-h4">Edit {{ name }} {{ surname }}</span>
        <q-input filled v-model="name"
          label="Name" class="q-ma-sm" @input="checkCanSubmit()"/>
        <q-input filled v-model="surname"
          label="Surname" class="q-ma-sm" @input="checkCanSubmit()"/>
        <q-select filled v-model="club" :options="clubOptions"
          label="Club" class="q-ma-sm" emit-value map-options @input="checkCanSubmit()"/>
        <div class="row justify-around">
            <q-btn class="q-ma-sm" color="negative" label="Cancel" @click="goBack()"/>
            <q-btn class="q-ma-sm" color="negative" label="Delete" @click="del()"/>
            <q-btn class="q-ma-sm" color="primary" label="Submit" @click="submit()" :disable="!canSubmit"/>
        </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      clubOptions: [],
      canSubmit: false,
      club: null,
      name: '',
      surname: ''
    }
  },
  methods: {
    checkCanSubmit () {
      this.canSubmit = this.name !== '' && this.surname !== ''
    },
    submit () {
      const params = {
        name: this.name,
        surname: this.surname
      }
      if (this.club) {
        params.club = this.club
      }
      this.$axios.put('/api/manager/' + this.$route.params.id + '/', params).then(response => { this.goBack() })
    },
    goBack () {
      this.$router.push('/managers')
    },
    del () {
      this.$axios.delete('/api/manager/' + this.$route.params.id + '/')
        .then(this.goBack)
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
    this.$axios.get('/api/manager/' + this.$route.params.id)
      .then(response => {
        this.name = response.data.name
        this.surname = response.data.surname
        if (response.data.club) {
          this.club = response.data.club.id
        }
      })
  }
}
</script>
