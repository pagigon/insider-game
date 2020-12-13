<template>
  <div class="confirm-role">
    <div>{{ this.message }}</div>
    <div>{{ this.timer }}</div>
    <input type="button" value="スタート" v-on:click="countStart()">
    <input type="button" value="ストップ" v-on:click="countStop()">
  </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    message: String,
    constTime: Number
  },
  data() {
    return {
      timer: 0,
      timerObj: null
    };
  },
  mounted() {
    this.timer = this.constTime;
  },
  methods: {
    showPassage() {
      if (this.timer > 0) {
        this.timer--;
        this.$emit("getElapsedTime", this.constTime - this.timer)
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
