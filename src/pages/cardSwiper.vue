<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const modules = [Autoplay, Pagination, Navigation];
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  class: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
});
const toggleDetail = (index) => {
  if (expandedDetails.value.includes(index)) {
    expandedDetails.value = expandedDetails.value.filter((item) => item !== index);
  } else {
    expandedDetails.value.push(index);
  }
};

</script>
<template>
  <div class="container">
    <div class="card-swiper-wrap">
      <swiper
        :slidesPerView="'auto'"
        :spaceBetween="10"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="mySwiper">
        <swiper-slide
          v-for="(item, index) in props.items"
          :key="index"
          :class="props.type"
          :style="getSlideStyle(item, index)"
        >
          <div class="card">
            <div class="card-info">
              <div class="text-top">
                <p>{{ item.eyebrow }}</p>
                <h2 v-html="item.title" />
                <div v-if="item.detail" @click="toggleDetail(index)">
                  <button type="button">{{ expandedDetails.includes(index) ? '접기' : '펼치기' }}</button>
                </div>
              </div>
              <img :src="item.image" :alt="item.title" class="img" />
              <div class="text-bottom">
                <p>{{ item.contents }}</p>
              </div>
            </div>
            <div v-if="item.detail && expandedDetails.includes(index)" class="detailSwiperWrapper">
              <swiper
                :modules="modules"
                :slidesPerView="3"
                :spaceBetween="10"
                :navigation="{
                  nextEl: `.swiper-button-next-${index}`,
                  prevEl: `.swiper-button-prev-${index}`,
                }"
                class="detailSwiper"
              >
                <swiper-slide v-for="(detailItem, detailIndex) in item.detail" :key="detailIndex">
                  <img :src="detailItem.image" :alt="detailItem.title" class="img-sub" />
                </swiper-slide>
              </swiper>
              <div class="button-group">
                <button type="button" :class="`swiper-button-prev swiper-button-prev-${index}`" />
                <button type="button" :class="`swiper-button-next swiper-button-next-${index}`" />
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<style lang="scss">

</style>