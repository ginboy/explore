<template>
  <div class="home-box" >
      <div class="content">
          <div class="first item">
            <div class="header-box">
              <div class="content-title">Operation time</div>
              <div class="user-name">{{ moveTime}}s</div>
            </div>
            <div class="sliderValue">{{ processNum }}%</div>
            <div class="sliderValue">{{ touchValue }}</div>
        </div>
        <div class="second item">
        
          <van-slider v-model="processNum" @change="onChange" @drag-start="dragStart" @drag-end="dragEnd" />
        </div>
        <div class="third item">
          <div class="third-box">
            <div ref="myParagraph"></div>
          </div>
        </div>
      </div>
      <van-button type="primary" @click="init">Reset</van-button>
  </div>
</template>
<script setup>
import { ref,onMounted} from "vue";
import DragArc from './circle.js';
 const myParagraph = ref(null);
const canvasDom=ref(null)
const pressTime=ref(0)//手指按下滑块的时刻
const moveTime=ref(0)//滑动持续时间
const processNum = ref(0);//横向进度条当前值
const touchValue = ref(0);//横向进度条当前值
const isOrientation = ref(false);//横向进度条当前值
const mediaQuery = window.matchMedia("(orientation: landscape)");
mediaQuery.addEventListener("change", handleOrientationChange);

// 初始检查
handleOrientationChange(mediaQuery);

onMounted(() => {
  if (myParagraph.value) {
    canvasDom.value=new DragArc({
      el: myParagraph.value,
      startDeg: 1.5,
      endDeg: 3.5,
      outColor: '#eee',
      sliderBorderColor:'rgb(121, 123, 125)',
      counterclockwise: false,
      textShow:false,
      change: (v)=> {
          console.log(`value:${v}`)
          touchValue.value=v
      },
      mouseDown:()=>{
        console.log("点击")
        moveTime.value=0
        pressTime.value=new Date().getTime();
      },
      mouseUp:()=>{
        console.log("离开")
          // 记录结束时间
        const endTime = new Date().getTime();
        // 计算持续时间（毫秒）
        const durationInMs = endTime - pressTime.value;
        // 将持续时间转换为秒并保留两位小数
        moveTime.value = (durationInMs / 1000).toFixed(2);
      }
    })
    init();
  }
});

function init(){
  pressTime.value=0
  moveTime.value=0
  processNum.value=0
  touchValue.value=0
  canvasDom.value.init()
}
//手指离开横向进度条的时
function onChange(){
  console.log("-进度值--",processNum.value)
}
function dragStart(){
  console.log("开始触碰")
  moveTime.value=0
  pressTime.value=new Date().getTime();
}
function dragEnd(){
  console.log("触碰结束")
  // 记录结束时间
  const endTime = new Date().getTime();
  // 计算持续时间（毫秒）
  const durationInMs = endTime - pressTime.value;
  // 将持续时间转换为秒并保留两位小数
  moveTime.value = (durationInMs / 1000).toFixed(2);
}
function handleOrientationChange(event) {
    if (event.matches) {
      isOrientation.value=true
    } else {
      isOrientation.value=false
    }
}


</script>
<style lang="scss" scoped>


.home-box {
  width: 100%;
  height: 100vh;
  padding: 20px;
  overflow: hidden;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  align-items: center;
  line-height: 100vh;
  .content{
    // background: transparent;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .item {
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 10px;
      padding: 10px;
    }
    .first{
      width: 40vw;
      text-align: center;
      // background-color: blue;
      box-sizing: border-box;
      min-height: 200px;
      .header-box{
        border: 2px solid #4ea9f3;
          .content-title{
            font-size: 20px;
            height: 60px;
            line-height: 60px;
          }
          .user-name{
            font-size: 18px;
            height: 60px;
            line-height: 60px;
          }
        }
        .sliderValue{
          height: 50px;
          line-height:50px;
          font-size: 14px;
        }
    }
    .second{
        width: 30vw;
        // background: yellow;
        position: relative;
        box-sizing: border-box;
        overflow: hidden;
        :deep() .van-slider{
          position: absolute;
          width: 60%;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          height: 20px;
          .van-slider__button{
            background: rgb(121, 123, 125);
            height: 40px;
            border-radius: 10px;
            width: 15px;
          }
          .van-slider__bar{
            background: rgb(121, 123, 125);
          }
        }
    }
    .third{
      width: 30vw;
      // background: pink;
      position: relative;
      .third-box{
        width: 80%;
        height: auto;
        // background: green;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  :deep() .van-button{
    height: 40px;
  }
}
</style>
