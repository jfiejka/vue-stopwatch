<template>
  <div v-if="laptimes.length">
    <div class="labels">
      <span>Index</span>
      <span>Full time</span>
      <span>Lap time</span>
    </div>
    <ul class="lap-times">
      <li v-for="(lapTime, index) in laptimes" :key="index">
        <span>{{index}}</span>
        <span>{{formatTime(lapTime, index)}}</span>
        <span>{{getOffsetFromPrevious(lapTime, index)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import getFormatedTimer from "./../utils/getFormatedTimer.js";
export default {
  name: "lapTimeList",
  props: { laptimes: Array },
  methods: {
    formatTime(lapTime) {
      const timer = {
        hours: lapTime.getUTCHours(),
        minutes: lapTime.getUTCMinutes(),
        seconds: lapTime.getUTCSeconds(),
        miliseconds: lapTime.getUTCMilliseconds()
      };
      return getFormatedTimer(timer);
    },
    getOffsetFromPrevious(lapTime, index) {
      const diffrenceFromPrevious =
        index !== 0
          ? new Date(lapTime - this.$props.laptimes[index - 1])
          : lapTime;
      const timer = {
        hours: diffrenceFromPrevious.getUTCHours(),
        minutes: diffrenceFromPrevious.getUTCMinutes(),
        seconds: diffrenceFromPrevious.getUTCSeconds(),
        miliseconds: diffrenceFromPrevious.getUTCMilliseconds()
      };

      return getFormatedTimer(timer);
    }
  }
};
</script>

<style scoped lang="scss">
.labels {
  border-bottom: 1px solid #f5f5f5;
}
.lap-times {
  margin: 0;
  padding: 0;
}
li,
.labels {
  display: flex;
  padding: 1em;
  span:nth-of-type(1) {
    width: 20%;
  }
  span:nth-of-type(2) {
    width: 40%;
  }
  span:nth-of-type(3) {
    width: 40%;
  }
  &:nth-child(even) {
    background-color: #f5f5f5;
  }
}
</style>