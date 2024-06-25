<script setup>
import CompHeader from '&/components/CompHeader.vue';
import CompFooter from '&/components/CompFooter.vue';
</script>

<template>
  <div class="wrap default">
    <CompHeader>(퍼블리싱)Default 헤더컴포넌트 대체</CompHeader>
    <slot />
    <CompFooter>(퍼블리싱)Default 푸터컴포넌트 대체</CompFooter>
  </div>
</template>

<style lang="scss" scoped>

</style>