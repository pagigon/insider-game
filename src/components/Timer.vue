<template>
  <div class="confirm-role">
    <div>{{ this.message }}</div>
    <div>{{ this.timer }}</div>
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

    this.timerObj = setInterval(this.showPassage, 1000);
  },
  methods: {
    showPassage() {
      if (this.timer > 0) {
        this.timer--;
        this.$emit("getElapsedTime", this.constTime - this.timer)
      } else {
        alert("時間切れです...");
        clearInterval(this.timerObj);
      }
    },
    finishTimer() {
      clearInterval(this.timerObj);
    }
  }
}
</script>
