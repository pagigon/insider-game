<template>
  <div class="regist-player">
    <form name="timer">
      <p>{{ timer }}</p>
      <input type="button" value="スタート" v-on:click="countStart()">
      <input type="button" value="ストップ" v-on:click="countStop()">
      <input type="button" value="次へ">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Battle',
  data() {
    return {
      timer: 10,
      timerObj: null,
    };
  },
  methods: {
    showPassage() {
      if (this.timer > 0) {
        this.timer--;
      } else {
        alert("You're Loser...");
        clearInterval(this.timerObj);
      }
    },
    countStart() {
      this.timerObj = setInterval(this.showPassage, 1000);
    },
    countStop() {
      clearInterval(this.timerObj);
    }
  }
}
</script>
