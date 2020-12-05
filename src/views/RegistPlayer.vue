<template>
  <div class="regist-player">
    <form>
      <ul>
        <li v-for="n in 10">
          <label>Player {{ n }} : </label>
          <input v-model="message" placeholder="Name">
        </li>
      </ul>
      <div class="btn-container">
        <button type="submit" class="btn btn-primary">送信</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegistPlayer',
  methods: {
    regist() {
      
    },
    mockRegist() {
      return 1;
    }
  }
}
</script>

<style>
ul {
  list-style: none;
}
</style>
