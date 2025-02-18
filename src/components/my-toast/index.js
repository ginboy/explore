import { createVNode, render } from 'vue';
import toastTemplate from './MyToast.vue';
let modal = null
class Toast {
  constructor(options){
    if(!Toast.instance){
      modal = document.createElement('div');
      const opt = { ...options };
      let vm = createVNode(toastTemplate, opt); // 创建vNode,就是把参数传入,创建一个游离的dom
      render(vm, modal);//render方法会在指定dom节点下挂虚拟dom
      document.body.appendChild(modal); // 添加到body上
      Toast.instance = this; 
    }else{
      const opt = { ...options };
      let vm = createVNode(toastTemplate, opt); 
      render(vm, modal);
      document.body.appendChild(modal);
      return Toast.instance;  
    }
  }
  destory(){
    if (modal) {
      let myDom = document.querySelector('.toast-value');
      myDom && myDom.classList.add('reomve');
      const t = setTimeout(() => {
        // 淡入淡出效果之后删除dom节点
        render(null, modal);
        document.body.removeChild(modal);
        clearTimeout(t);
      }, 500);
    }else{
      return
    }
  }
}
export default Toast;
