<template>
  <div class="toast-box" v-if="showLoad">
    <div class="toast-value" :style="{ background: background }">
      <div class="loading"></div>
      <div class="content" v-if="message">{{ message }}</div>
    </div>
  </div>
</template>
<script setup>
let props = defineProps({
  message: {
    type: String,
    default: ''
  },
  background: {
    type: String,
    default: 'rgba(0,0,0,0.7)'
  },
  showLoad: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.toast-box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.toast-value {
  width: 220px;
  height: 220px;
  padding: 8px 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  animation: anim 0.5s;
  .content {
    text-align: center;
    margin-top: 30px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
@keyframes anim {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.toast-value.reomve {
  animation: reomve 0.5s;
}
@keyframes reomve {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.loading {
  width: 60px;
  height: 60px;
  border: 3px solid rgb(253, 252, 252);
  border-top-color: transparent;
  border-radius: 100%;
  text-align: center;
  animation: circle infinite 1s linear;
}

// 转转转动画
@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
