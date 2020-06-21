<template>
  <div class="row vertical-middle absolute-center justify-center">
            <div class="q-gutter-md" style="max-width: 300px">
                <q-input filled v-model="username" label="Username" />
                <q-input filled v-model="password" label="Password" :type="isPwd ? 'password' : 'text'">
                    <template v-slot:append>
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                        />
                    </template>
                </q-input>
                <div class="row">
                    <div class="col-3"></div>
                    <q-btn class="col-6" color="primary" label="Login" @click="login()"/>
                    <div class="col-3"></div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  name: 'LoginLayout',
  data () {
    return {
      password: '',
      isPwd: true,
      username: ''
    }
  },
  methods: {
    login () {
      this.$axios.post('/api/login/', {
        username: this.username,
        password: this.password
      }).then(response => {
        if (response.data === 'OK') {
          this.$router.push('/match')
        }
      }).catch(response => {
        console.log(response)
      })
    }
  }
}
</script>
