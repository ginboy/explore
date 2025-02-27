class DragAcr {
    constructor(param) {
        this.initParam(param)
        this.draw(this.value)
    }
    initParam(param) {
    const {
        el,
        startDeg = 0,
        endDeg = 1,
        innerColor = "transparent",
        outColor = "#c0c0c0",
        innerLineWidth = 0,
        outLineWidth = 25,
        counterclockwise = true,
        slider = 10,
        color = "rgb(121, 123, 125)",
        sliderColor = "#fff",
        sliderBorderColor = "rgb(121, 123, 125)",
        value = 0,
        change = (v)=> { console.log(v) },
        mouseDown=()=>{console.log("点击")},
        mouseUp=()=>{console.log("离开")},
        textShow = true
    } = param;

    this.el = el;
    this.width = el.offsetWidth;
    this.height = el.offsetHeight;
    this.center = this.width / 2
    this.radius = this.width / 2 - 30; //滑动路径半径
    this.initCanvas(el);

    this.startDeg = startDeg;
    this.endDeg = endDeg;
    this.innerColor = innerColor;
    this.outColor = outColor;
    this.innerLineWidth = innerLineWidth;
    this.outLineWidth = outLineWidth;
    this.counterclockwise = counterclockwise;
    this.slider = slider;
    this.color = color;
    this.sliderColor = sliderColor;
    this.sliderBorderColor = sliderBorderColor;
    this.value = value;
    this.textShow = textShow;
    

    this.change = change;
    this.mouseDown = mouseDown;
    this.mouseUp = mouseUp;

    this.isDown = false;
    this.event(el)

    }
    initCanvas(dom) {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "dragArc");
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.width);
    dom.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    }
    //绘图
    draw(value) {

        this.ctx.clearRect(0, 0, this.width, this.width);

        this.ctx.save();

        let startDeg = this.counterclockwise ? Math.PI * (2 - this.startDeg) : Math.PI * this.startDeg
        let endDeg = this.counterclockwise ? Math.PI * (2 - this.endDeg) : Math.PI * this.endDeg
        // 绘制内层圆弧
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.arc(this.center, this.center, this.radius - 20, startDeg, endDeg, this.counterclockwise); // 绘制内层圆弧
        this.ctx.strokeStyle = this.innerColor;
        this.ctx.stroke();

        // 绘制外侧圆弧
        this.ctx.beginPath();
        this.ctx.arc(this.center, this.center, this.radius, startDeg, endDeg, this.counterclockwise); // 绘制外侧圆弧
        this.ctx.strokeStyle = this.outColor;
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = this.outLineWidth;
        this.ctx.stroke();

        let Deg = this.valToDeg(value)


        // 绘制可变圆弧
        let themeColor = this.color
        this.ctx.beginPath();
        this.ctx.arc(this.center, this.center, this.radius, startDeg, Deg, this.counterclockwise); // 可变圆弧
        this.ctx.strokeStyle =  themeColor;
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = this.outLineWidth;
        this.ctx.stroke();

        // 绘制滑块
        this.P = this.DegToXY(Deg)
        this.ctx.beginPath();
        this.ctx.moveTo(this.center, this.center, );
        this.ctx.arc(this.P.x, this.P.y, this.slider + 5, 0, Math.PI * 2, false); // 绘制滑块内侧
        this.ctx.fillStyle = this.sliderBorderColor;
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.moveTo(this.center, this.center);
        this.ctx.arc(this.P.x, this.P.y, this.slider, 0, Math.PI * 2, false); // 绘制滑块
        this.ctx.fillStyle = this.sliderColor;;
        this.ctx.fill();

        // 文字
        if(!this.textShow) return;
        this.ctx.font = `${this.center/4}px serif`;
        this.ctx.fillStyle = themeColor;
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "bottom";
        this.ctx.fillText(Math.round(this.value*360/100)+'°', this.center+this.center/8, this.center+this.center/10);

        }
        //将值转化为弧度
        valToDeg(v) {
        let range = this.endDeg - this.startDeg;
        let val = range / 100 * v;
        if(this.counterclockwise && (val !=0) ) val = 2 -val;
        let startDeg = this.counterclockwise ? (2 - this.startDeg) : this.startDeg;
        return (startDeg + val) * Math.PI;
        }
        // 弧度转化为对应坐标值
        DegToXY(deg) {
        let d = 2 * Math.PI - deg;
        return this.respotchangeXY({
            x: this.radius * Math.cos(d),
            y: this.radius * Math.sin(d)
        })
        }

        //canvas坐标转化为中心坐标
        spotchangeXY(point) {
        const spotchangeX = (i) => {
            return i - this.center
        }
        const spotchangeY = (i) => {
            return this.center - i
        }
        return {
            x: spotchangeX(point.x),
            y: spotchangeY(point.y)
        }
        }

        //中心坐标转化为canvas坐标
        respotchangeXY(point) {
        const spotchangeX = (i) => {
            return i + this.center
        }
        const spotchangeY = (i) => {
            return this.center - i
        }
        return {
            x: spotchangeX(point.x),
            y: spotchangeY(point.y)
        }
    }


    event(dom) {  //事件绑定
        if(this.isMobile){
            dom.addEventListener("touchstart", this.OnMouseDown.bind(this), false);
            dom.addEventListener("touchmove", this.throttle(this.OnMouseMove.bind(this)), false);
            dom.addEventListener("touchend", this.OnMouseUp.bind(this), false);
            return
        }
        dom.addEventListener("mousedown", this.OnMouseDown.bind(this), false);
        dom.addEventListener("mousemove", this.throttle(this.OnMouseMove.bind(this)), false);
        dom.addEventListener("mouseup", this.OnMouseUp.bind(this), false);
    }

    OnMouseMove(evt) {
        if (!this.isDown) return;
        let evpoint = {};
        evpoint.x = this.getx(evt);
        evpoint.y = this.gety(evt);
        
        let point = this.spotchangeXY(evpoint);
        let deg = this.XYToDeg(point.x, point.y);
        deg = this.counterclockwise ? deg : Math.PI * 2 - deg;
        let val = (deg/ Math.PI - this.startDeg) / (this.endDeg - this.startDeg)  * 100
        if(val<0) val = 100 + val;
        if(val >= 100) val = 100;
        if(val <= 0) val = 0;
        if(Math.abs (val - this.value) > 10) return;
        this.animate = requestAnimationFrame(this.draw.bind(this,val));
        if(Math.abs (val - this.value)>0.2){
            this.value = val;
            this.change(Math.round(this.value*360/100)+'°')
        }
    }

    OnMouseDown(evt) {
        let range = 10;
        let X = this.getx(evt);
        let Y = this.gety(evt);
        let P = this.P 
        let minX = P.x - this.slider - range;
        let maxX = P.x + this.slider + range;
        let minY = P.y - this.slider - range;
        let maxY = P.y + this.slider + range;
        if (minX < X && X < maxX && minY < Y && Y < maxY) {   //判断鼠标是否在滑块上 
            this.isDown = true;
            this.mouseDown()
        } else {
            this.isDown = false;
        }
    }

    OnMouseUp() {  //鼠标释放
        const _this = this
        cancelAnimationFrame(_this.animate);
        if(this.isDown){
            this.mouseUp()
        }
        this.isDown = false
    }

    // 将坐标点转化为弧度
    XYToDeg(lx, ly) {
        let adeg = Math.atan(ly / lx)
        let deg;
        if (lx >= 0 && ly >= 0) {
            deg = adeg ;
        }
        if (lx <= 0 && ly >= 0) {
            deg = adeg + Math.PI;
        }
        if (lx <= 0 && ly <= 0) {
            deg = adeg + Math.PI;
        }
        if (lx > 0 && ly < 0) {
            deg = adeg + Math.PI * 2;
        }
        return deg
    }

    //获取鼠标在canvas内坐标x
    getx(ev) {
        if(!this.isMobile) return ev.clientX - this.el.getBoundingClientRect().left;
        return ev.touches[0].pageX - this.el.getBoundingClientRect().left;
    }

    //获取鼠标在canvas内坐标y
    gety(ev) {
        if(!this.isMobile) return ev.clientY - this.el.getBoundingClientRect().top;
        return ev.touches[0].pageY - this.el.getBoundingClientRect().top;
    }
    //重置到0点
    init(){
        this.value=0
        this.draw(this.value)
    }
    //节流
    throttle(func) {
        let previous = 0;
        return function() {
            let now = Date.now();
            let context = this;
            let args = arguments;
            if (now - previous > 10) {
                func.apply(context, args);
                previous = now;
            }
        }
    }
}
  
  
  export default DragAcr