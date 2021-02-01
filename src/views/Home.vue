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
    <div>
      <div>遊び方はこのへん</div>
      <ul>
        <li>
          <a href="https://boku-boardgame.net/insider-game" target="_blank">紹介サイト</a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=tnQdtB9uHQw&t=733s" target="_blank">YouTube</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
