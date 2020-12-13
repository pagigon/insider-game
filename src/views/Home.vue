<template>
  <div class="home">
    <div>
      <img alt="Insider logo" src="../assets/insider.jpg">
    </div>
    <div>
      <router-link :to="{ name: 'Entry'}">オンラインの友達と遊ぶ</router-link>
    </div>
    <div>
      <router-link :to="{ name: 'RegistPlayer'}">隣の友達と遊ぶ</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
