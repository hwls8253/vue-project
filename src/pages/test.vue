<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const container = ref(null);

onMounted(() => {
  if (container.value) {
    // Three.js scene, camera, renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.value.appendChild(renderer.domElement);

    // Load OBJ model
    const loader = new OBJLoader(); // Three.js OBJLoader 사용
    const modelPath = '/src/publishing/pages/bugatti.obj';

    loader.load(
      modelPath, // 실제 모델 파일 경로로 변경
      (obj) => {
        scene.add(obj); // 씬에 모델 추가
      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error('Error loading OBJ file:', error);
      },
    );

    // Camera position
    camera.position.z = 5;

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }
});
</script>
<template>
  <div class="container" ref="container"></div>
</template>
<style lang="scss">
@import "~/scss/mixin/br/mixin.scss";
.container {
  width: 100%;
  height: 100vh;
}

.wheel {
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: rgba(0,0,0,.5);
  .wheel__content {
    position: fixed;
    left:50%;
    bottom: rem(-100);
    transform: translate(-50%,0);
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
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
      border-radius: 100%;
    }
    .wheel__item {
      position:absolute;
    }
  }
}
</style>