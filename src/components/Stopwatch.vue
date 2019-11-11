<template>
  <div class="container" id="stopwatch">
    <div>
      <span class="timer">{{timerFormated}}</span>
    </div>
    <div class="controls">
      <button v-if="!running" @click="startTimer">Start</button>
      <button v-else @click="stopTimer">Stop</button>
      <button @click="resetTimer">Reset</button>
      <button @click="getLapTime">Lap</button>
    </div>
    <LapTimeList :laptimes="lapTimes" />
  </div>
</template>

<script>
import LapTimeList from "./LapTimeList.vue";
import getFormatedTimer from "./../utils/getFormatedTimer.js";

export default {
  name: "Stopwatch",
  components: { LapTimeList },
  data() {
    return {
      timer: {
        miliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0
      },
      startTime: null,
      stopTime: null,
      elapsedTime: null,
      stopDuration: 0,
      lapTimes: [],
      interval: null,
      running: false
    };
  },
  computed: {
    timerFormated() {
      return getFormatedTimer(this.timer);
    }
  },
  methods: {
    startTimer() {
      if (this.running) {
        return;
      }
      if (this.startTime === null) {
        this.resetTimer();
        this.startTime = new Date();
      }
      if (this.stopTime !== null) {
        this.stopDuration += new Date() - this.stopTime;
      }
      this.running = true;
      this.interval = setInterval(this.updateTimer, 10);
    },
    getLapTime() {
      if (this.running) {
        this.lapTimes.push(this.elapsedTime);
      }
    },
    stopTimer() {
      this.running = false;
      this.stopTime = new Date();
      clearInterval(this.interval);
      this.interval = null;
    },
    resetTimer() {
      this.stopTimer();
      this.timer = {
        miliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0
      };
      this.startTime = null;
      this.stopTime = null;
      this.stopDuration = 0;
      this.lapTimes = [];
    },
    updateTimer() {
      const currentTime = new Date();
      const elapsedTime = new Date(
        currentTime - this.startTime - this.stopDuration
      );
      this.elapsedTime = elapsedTime;
      this.timer.hours = elapsedTime.getUTCHours();
      this.timer.minutes = elapsedTime.getUTCMinutes();
      this.timer.seconds = elapsedTime.getUTCSeconds();
      this.timer.miliseconds = elapsedTime.getUTCMilliseconds();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Inconsolata|Roboto+Slab&display=swap");
.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  font-family: "Roboto Slab", serif;
}
.timer {
  font-size: 4rem;
  font-family: "Inconsolata", monospace;
}
.controls {
  button {
    margin: 5px;
    background: transparent;
    outline: none;
    border: none;
    padding: 0.5em 1em;
    color: #5a5a5a;
    cursor: pointer;
    font-size: 2rem;
  }
}
</style>
