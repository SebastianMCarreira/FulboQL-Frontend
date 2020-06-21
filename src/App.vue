<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'FulboQL',
  apiEndpoint: 'http://localhost:5000'
}
</script>
