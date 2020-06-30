<template>
  <q-page class="flex items-center justify-around">
    <div class="column justify-between">
        <span class="text-h4">Add New Referee</span>
        <q-input filled v-model="name"
          label="Name" class="q-ma-sm" @input="checkCanSubmit()"/>
        <q-input filled v-model="surname"
          label="Surname" class="q-ma-sm" @input="checkCanSubmit()"/>
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
      canSubmit: false,
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
      this.$axios.post('/api/referee/', params).then(response => { this.goBack() })
    },
    goBack () {
      this.$router.push('/referees')
    }
  },
  created () {}
}
</script>
