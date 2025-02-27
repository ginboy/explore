<template>
  <div class="circular-progress-container">
    <svg
      class="circular-progress"
      width="200"
      height="200"
      viewBox="0 0 100 100"
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
    >
      <!-- 背景圆环 -->
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        stroke="#e0e0e0"
        stroke-width="5"
      />
      <!-- 进度圆环 -->
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        stroke="#007bff"
        stroke-width="5"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        stroke-linecap="round"
        style="transition: stroke-dashoffset 0.2s ease"
      />
      <!-- 滑块 -->
      <circle
        cx="50"
        cy="5"
        r="8"
        fill="#007bff"
        :transform="sliderTransform"
        style="transition: transform 0.2s ease"
      />
    </svg>
    <div class="degree-display">{{ degrees }}°</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const degrees = ref(0);
const circumference = 2 * Math.PI * 45;
const dashOffset = ref(circumference);
const sliderTransform = ref('');

const containerRef = ref(null);

const calculateDegrees = (x, y) => {
  const centerX = 100;
  const centerY = 100;
  let angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
  angle = (angle + 360 + 90) % 360;
  degrees.value = Math.round(angle);
  dashOffset.value = circumference - (circumference * degrees.value) / 360;
  sliderTransform.value = `rotate(${degrees.value}, 50, 50)`;
};

const onMouseDown = (event) => {
  calculateDegrees(event.clientX, event.clientY);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const onTouchStart = (event) => {
  calculateDegrees(event.touches[0].clientX, event.touches[0].clientY);
  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', onTouchEnd);
};

const onMouseMove = (event) => {
  calculateDegrees(event.clientX, event.clientY);
};

const onTouchMove = (event) => {
  calculateDegrees(event.touches[0].clientX, event.touches[0].clientY);
};

const onMouseUp = () => {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

const onTouchEnd = () => {
  document.removeEventListener('touchmove', onTouchMove);
  document.removeEventListener('touchend', onTouchEnd);
};

onMounted(() => {
  containerRef.value = document.querySelector('.circular-progress-container');
});
</script>

<style scoped>
.circular-progress-container {
  position: relative;
  width: 80vw;
  max-width: 200px;
  height: 80vw;
  max-height: 200px;
  margin: 50px auto;
}

.degree-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
</style>