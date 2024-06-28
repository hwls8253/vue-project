<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const cursor = ref(null);
const mouse = reactive({
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
});

const update = (event) => {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
};

const lerp = (start, current, speed) => {
  const a = start + (current - start) * speed;
  return a;
};

const frame = () => {
  requestAnimationFrame(frame);
  mouse.startX = lerp(mouse.startX, mouse.x, 0.1);
  mouse.startY = lerp(mouse.startY, mouse.y, 0.1);
};
requestAnimationFrame(frame);

onMounted(() => window.addEventListener('mousemove', update));
onUnmounted(() => window.removeEventListener('mousemove', update));
</script>

<template>
  <div class="container">
    <h1>Lerp - 선형 보간법</h1>
    <div
      class="circle"
      ref="cursor"
      :style="{ transform: `translate(${mouse.startX}px, ${mouse.startY}px)` }">
      커서
    </div>
  </div>
</template>

<style lang="scss">
  html,body {
    width:100%;
    height:100%;
  }
  .container {
    width:100%;
    height:100%;
  }
  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    position:absolute;
    width:50px;
    height:50px;
    margin-left: -25px;
    margin-top: -25px;
    background-color: hotpink;
    border-radius: 50%;
  }
</style>
