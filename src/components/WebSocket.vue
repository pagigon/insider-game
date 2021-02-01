<template>
  <div></div>
</template>
<script>
export default {
  name: 'WebSocket',
  mounted() {
    if (this.$store.getters.getWebSocket == null) {
      let websocket = new WebSocket('wss://uynhuto1e2.execute-api.ap-northeast-1.amazonaws.com/dev');
      this.$store.dispatch("setWebSocket", websocket);
    }
  }
}
</script>
