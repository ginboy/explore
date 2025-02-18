<template>
  <div class="mine-box">
    <div class="mine-title">我的页面</div>
    <button class="mine-btn" @click="goToHome">前往首页</button>
    <van-field
      is-link
      readonly
      label="地区"
      placeholder="请选择所在地区"
      @click="show = true"
    />
    <van-popup v-model:show="show" round position="bottom">
      <van-picker ref="picker" :columns="columns" @change="onChange" @confirm="onConfirm"/>
    </van-popup>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref } from 'vue';
const router = useRouter();
function goToHome() {
  router.push("/home");
}
const show = ref(false);
const result = ref('');
const picker = ref(null);

const cities = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};
const xian={
  县:['霞浦','莆田']
}
const columns = [
  { values: Object.keys(cities) },
  { values: cities['浙江'] },
  { values: xian['县'] },
];

const onChange = (values) => {
  picker.value.setColumnValues(1, cities[values[0]]);
};
const onConfirm = (value, index) => {
      console.log(`当前值: ${value}, 当前索引: ${index}`);
    };
</script>
<style></style>