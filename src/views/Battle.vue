<template>
  <div class="regist-player">
    <form name="first-timer">
      <p>{{ firstTimer }}</p>
      <input type="button" value="スタート" v-on:click="countStartFirst()">
      <input type="button" value="ストップ" v-on:click="countStop()">
      <input type="button" value="次へ" v-on:click="nextStage()">
    </form>
    <form name="second-timer">
      <p>{{ secondTimer }}</p>
      <input type="button" value="スタート" v-on:click="countStartSecond()">
      <input type="button" value="ストップ" v-on:click="countStop()">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Battle',
  data() {
    return {
      constTime: 300,
      firstTimer: 0,
      secondTimer: 0,
      timerObj: null,
    };
  },
  mounted() {
    this.firstTimer = this.constTime;
  },
  methods: {
    showFirstPassage() {
      if (this.firstTimer > 0) {
        this.firstTimer--;
      } else {
        alert("You're Loser...");
        clearInterval(this.timerObj);
      }
    },
    countStartFirst() {
      this.timerObj = setInterval(this.showFirstPassage, 1000);
    },
    countStop() {
      clearInterval(this.timerObj);
    },
    nextStage() {
      this.secondTimer = this.constTime - this.firstTimer;
    },
    showSecondPassage() {
      if (this.secondTimer > 0) {
        this.secondTimer--;
      } else {
        alert("Vote!");
        clearInterval(this.timerObj);
      }
    },
    countStartSecond() {
      this.timerObj = setInterval(this.showSecondPassage, 1000);
    },
  }
}
</script>
