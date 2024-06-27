<script setup>
import { ref } from 'vue';

const wheel = ref(null);
const path = '/';
const styleObject = {
  rotate: 0,
  nex: 0,
  degreeAngle: null,
  startTouches: null,
};

const touchStart = (event) => {
  styleObject.nex = wheel.value.style.transform ?? 0;
  styleObject.nex = parseFloat(styleObject.nex.slice(7));
  styleObject.startTouches = {
    x: event.changedTouches[0].pageX,
    y: event.changedTouches[0].pageY,
  };
};

const touchMove = (event) => {
  const touch = {
    x: event.changedTouches[0].pageX,
    y: event.changedTouches[0].pageY,
  };
  // 원의 중심
  const center = {
    x: wheel.value.offsetLeft + wheel.value.offsetWidth / 2,
    y: wheel.value.offsetTop + wheel.value.offsetHeight / 2,
  };
  // 거리 - 최대 +
  const distanceX = (center.x - touch.x) * (center.y - styleObject.startTouches.y) - (center.y - touch.y) * (center.x - styleObject.startTouches.x);
  const distanceY = (center.x - touch.x) * (center.x - styleObject.startTouches.x) + (center.y - touch.y) * (center.y - styleObject.startTouches.y);
  let distance = Math.atan2(distanceX, distanceY);
  distance *= -1;
  styleObject.degreeAngle = distance * (180 / Math.PI);
  styleObject.rotate = styleObject.degreeAngle + styleObject.nex;
  wheel.value.style.transform = `rotate(${styleObject.rotate}deg)`;
};

</script>
<template>
  <div class="container">
    <div class="wheel">
      <span> {{ styleObject }}</span>
      <ul
        class="wheel__content"
        ref="wheel"
        @touchstart="touchStart"
        @touchmove="touchMove"
        :style="{ transform: `rotate(${styleObject.rotate}deg)` }">
        <li class="wheel__item"><router-link v-bind:to="path">linkName1</router-link></li>
        <li class="wheel__item"><router-link v-bind:to="path">linkName2</router-link></li>
        <li class="wheel__item"><router-link v-bind:to="path">linkName3</router-link></li>
        <li class="wheel__item"><router-link v-bind:to="path">linkName4</router-link></li>
        <li class="wheel__item"><router-link v-bind:to="path">linkName5</router-link></li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
@import "~/mixin/br/mixin.scss";
.container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.wheel {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: rgba(0,0,0,.5);
  .wheel__content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: rem(-50);
    max-width: rem(400);
    max-height: rem(400);
    width: 70vw;
    height: 70vw;
    background-color: #f00;
    border-radius: 100%;
    text-align: center;
    &::before {
      content: "돌아라";
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: rem(100);
      height: rem(100);
      background-color: #fff;
      border-radius: 100%;
    }
    .wheel__item {
      position:absolute;
      left:0;
      top:0;
      padding:5px;
      background:rgba(0,0,0,.5);
      color: #fff;
    }
  }
}
</style>