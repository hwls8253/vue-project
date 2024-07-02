<script setup>
import { ref, onMounted } from 'vue';

const wheel = ref(null);
const styleObject = {
  rotate: 0,
  nex: 0,
  degreeAngle: null,
  startTouches: null,
  centerX: 0,
  centerY: 0,
};

const circleItems = [
  {
    name: 'item1',
    path: '/',
    className: 'wheel__item1',
  },
  {
    name: 'item2',
    path: '/',
    className: 'wheel__item2',
  },
  {
    name: 'item3',
    path: '/',
    className: 'wheel__item3',
  },
  {
    name: 'item4',
    path: '/',
    className: 'wheel__item4',
  },
  {
    name: 'item5',
    path: '/',
    className: 'wheel__item5',
  },
];

// 초기 각도와 각도 증가량을 계산하는 함수
const calculateAngles = (num) => {
  const initialAngle = -90; // 12시 방향을 시작점으로 설정
  const angleIncrement = 360 / num;
  return { initialAngle, angleIncrement };
};

const circleFunc = () => {
  const buttonBox = document.querySelectorAll('.wheel__content > li');
  const radius = wheel.value.offsetWidth / 2; // 원 반지름
  const boxLength = buttonBox.length;

  const { initialAngle, angleIncrement } = calculateAngles(boxLength);

  for (let i = 0; i < boxLength; i += 1) {
    const angle = i * angleIncrement - initialAngle; // -90은 시계방향을 위함
    const radians = angle * (Math.PI / 180);

    const x = radius * Math.cos(radians) * 0.8;
    const y = radius * Math.sin(radians) * 0.8;
    buttonBox[i].style.transform = `translate(${x}px, ${y}px)`;
  }
};

const touchStart = (event) => {
  styleObject.nex = wheel.value.style.transform;
  styleObject.nex = parseFloat(styleObject.nex.slice(7)) ?? styleObject.rotate;
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

  // 거리 - 최대 +
  const distanceX = (styleObject.centerX - touch.x) * (styleObject.centerY - styleObject.startTouches.y) - (styleObject.centerY - touch.y) * (styleObject.centerX - styleObject.startTouches.x);
  const distanceY = (styleObject.centerX - touch.x) * (styleObject.centerX - styleObject.startTouches.x) + (styleObject.centerY - touch.y) * (styleObject.centerY - styleObject.startTouches.y);
  let distance = Math.atan2(distanceX, distanceY);
  distance *= -1;
  styleObject.degreeAngle = distance * (180 / Math.PI);
  styleObject.rotate = styleObject.degreeAngle + styleObject.nex;
  wheel.value.style.transform = `rotate(${styleObject.rotate}deg)`;

  const buttonItems = document.querySelectorAll('.wheel__content > li > a');
  buttonItems.forEach((e) => {
    e.style.transform = `rotate(${styleObject.rotate * -1}deg)`;
  });
};

const touchEnd = (event) => {
  const currentRotate = parseFloat(wheel.value.style.transform.slice(7));
  console.log(currentRotate);
};

onMounted(() => {
  // 원의 중심
  styleObject.centerX = wheel.value.offsetLeft + wheel.value.offsetWidth / 2;
  styleObject.centerY = wheel.value.offsetTop + wheel.value.offsetHeight / 2;

  // 버튼 위치
  circleFunc();
});
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
        @touchend="touchEnd"
        :style="{ transform: `rotate(${styleObject.rotate}deg)` }">
        <li
          v-for="item in circleItems"
          :key="item"
          :class="[item.className]"
          :style="{ }">
          <router-link
            :to="item.path"
            :style="{ transform: `rotate(${styleObject.rotate}deg)` }">
            {{ item.name }}
          </router-link>
        </li>
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
    bottom: rem(-20);
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
      width: calc(70vw / 3);
      height: calc(70vw / 3);
      max-width: rem(130);
      max-height: rem(130);
      background-color: #fff;
      border-radius: 100%;
    }
    [class*='wheel__item'] {
      position:absolute;
      color: #fff;
      a {
        display: block;
        padding:5px;
        background:rgba(0,0,0,.5);
      }
    }
  }
}
</style>