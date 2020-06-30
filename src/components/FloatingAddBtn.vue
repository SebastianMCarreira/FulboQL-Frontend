<template>
  <div class="q-pa-lg fixed-bottom-right floating-btn">
    <q-btn round size="1.5em" class="" icon="add" color="primary" @click="goTo()"/>
  </div>
</template>

<script>
export default {
  name: 'FloatinAddBtn',
  props: {
    route: {
      type: String,
      required: true
    }
  },
  methods: {
    goTo () {
      this.$router.push(this.route)
    }
  }
}
</script>
