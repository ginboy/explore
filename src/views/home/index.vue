<template>
  <div class="home-box">
    <div class="home-title">首页页面</div>
    <div class="home-content">
      <div class="first item">
        <div class="content-title">测试vuex</div>
        <div class="user-name">{{ userObj.userName }}</div>
      </div>
      <div class="second item">
        <div class="content-title">测试vant按需引入</div>
        <van-button type="success">成功按钮</van-button>
      </div>
      <div class="third item">
        <div class="content-title">测试vue-router页面路由</div>
        <button class="home-btn" @click="goToMine">前往我的页面</button>
      </div>
      <div class="fouth item">
        <div class="content-title">测试vw的适配222</div>
        <img src="@/assets/img/pic.jpeg" alt="" class="img-test" />
      </div>
      <div class="five item">
        <div class="content-title">测试axios请求数据</div>
        <van-button type="success" class="home-btn" @click="testAxios">
          发送请求
        </van-button>
        <div class="content-request">{{ renderTest }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { httpGet } from "@/api/http.js";
import Toast from '../../components/my-toast/index.js'
const router = useRouter();
const store = useStore();
const userObj = computed(() => store.state.user.userInfo);
store.dispatch("user/getUserInfo");

let renderTest = ref("这里将显示请求回来的数据");
//路由跳转
function goToMine() {
  const toast1=new Toast({
    message:'竹杖芒鞋轻胜马',
    showLoad:true
  })
  const toast2=new Toast({
    message:'也无风雨也无晴',
    showLoad:true
  })
  setTimeout(()=>{
    toast1.destory()
  },2000)
  console.log(toast1===toast2)//true
}
//发送请求
async function testAxios() {
  try {
    let params = {};
    const res = await httpGet(params, "/justtest");
    renderTest.value = res.data.content;
  } catch (error) {}
}
</script>
<style lang="scss" scoped>
.home-box {
  width: 100%;
  height: 100vh;
  padding: 20px;
  overflow: hidden;
  box-sizing: border-box;
  .home-title {
    width: 400px;
    height: 60px;
    margin: 0 auto;
    font-size: 30px;
    text-align: center;
    line-height: 60px;
  }
  .home-content {
    width: 100%;
    text-align: center;
    .item {
      box-sizing: border-box;
      overflow: hidden;
      margin: 15px;
      border: 1px solid #55b3ff;
      border-radius: 10px;
      padding: 10px;
      .content-title {
        font-size: 10px;
        margin-bottom: 15px;
      }
      .img-test {
        width: 300px;
      }
    }
  }
}
</style>
