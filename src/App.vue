<script setup>
import PublishingDefaultLayout from '&/layouts/DefaultLayout.vue';
import PublishingBlankLayout from '&/layouts/BlankLayout.vue';

/**
 * 모바일(태블릿 포함) 또는 DESKTOP 구분
 * @return 'mobile' 또는 'desktop'을 바노한합니다.
*/
const detectMobile = () => {
  const toMatchMobile = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];
  const mobileCond = toMatchMobile.some((toMatchItem) => navigator.userAgent.match(toMatchItem));

  return mobileCond ? 'mobile' : 'desktop';
};

const checkDevice = ref(detectMobile());

/**
 * meta에 layout 속성에 매칭되는 레이아웃 Component를 불러옵니다.
 * @return 매칭되는 레이아웃 컴퍼넌트를 반환
*/
const getLayout = () => {
  const route = useRoute();

  if (typeof route === 'undefined') {
    return Default;
  }
  switch (route.meta.layout) {
    case 'default':
      return PublishingDefaultLayout;
    case 'blank':
      return PublishingBlankLayout;
    default:
      return PublishingDefaultLayout;
  }
};

const layout = computed(() => getLayout());

/**
 * meta에 layout 속성에 매칭되는 레이아웃 Component를 불러옵니다.
 * @return 매칭되는 레이아웃 컴퍼넌트를 반환
*/
const setVh = () => {
  document.documentElement.classList.add(checkDevice.value);
  // document.body.classList.add(checkDevice);
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
};
window.addEventListener('resize', setVh);
setVh();
</script>
<template>
  <router-view v-slot="{ Component, route }">
    <component :is="layout" :class="[route.meta.wrapClass]">
      <component :is="Component" class="container" :class="[route.meta.containerClass]" />
    </component>
  </router-view>
</template>
<style lang="scss" scoped></style>
