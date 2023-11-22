import { Duck } from "./Duck";
import { LensGun } from "./LensGun";
import { Source, loadSource } from "./source";

/**
 * 鸭子射手
 */
export class DuckShooter {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  keydowns: { [key: string]: boolean } = {};
  lensGun: LensGun;
  ducks: Duck[] = [];
  suspend = false;
  animationId?: number;
  source?: Source;
  //监听root尺寸变化
  sizeObserver: ResizeObserver;

  stat = {
    /**击中数 */
    shotHit: 0,
  };
  constructor(public root: HTMLDivElement) {
    // 创建画布
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    this.root.appendChild(this.canvas);

    // 设置画布宽高
    const { width, height } = this.root.getBoundingClientRect();
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.canvas.style.border = "1px solid #000";
    this.canvas.style.borderRadius = "4px";

    //创建枪镜头
    this.lensGun = new LensGun(this, 150, 150);

    // 监听root
    this.sizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        //会默认执行一次，导致canvas初始视图内容丢失
        //检测有变化才执行resize
        if (
          Math.round(this.width) === Math.round(entry.contentRect.width) &&
          Math.round(this.height) === Math.round(entry.contentRect.height)
        ) {
          return;
        }
        this.resize(entry.contentRect.width, entry.contentRect.height);
      }
    });
    this.sizeObserver.observe(root);

    // 绑定键盘事件
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  async play() {
    //加载资源
    this.ctx.fillStyle = "#000";
    this.ctx.font = "20px Verdana";
    this.ctx.fillText("source loading...", 100, 100);
    //模拟慢速
    // await new Promise((r) => setTimeout(r, 1000));
    this.source = await loadSource();

    //清理画布
    this.clearCanvas();

    //开始渲染游戏
    this.render();

    //生成鸭子
    this.createDuck();
  }

  drawStat() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, 30);
    this.ctx.fillStyle = "red";
    this.ctx.fillText(`击中: ${this.stat.shotHit}`, 100, 20);
    this.ctx.fillText(
      `控制方位：w、a、s、d；发射：space；创建鸭子：g`,
      600,
      20
    );
  }

  render = () => {
    //更新数据
    this.update();
    //清空上一次的画布
    this.clearCanvas();

    //渲染统计信息
    this.drawStat();

    // 渲染鸭子
    this.drawDuck();

    //渲染枪视野
    this.drawLensGun();

    //开始下一帧
    this.animationId = requestAnimationFrame(this.render);
  };

  update() {
    //更新按键操作
    this.updateKeydowns();

    //更新开火进度
    if (this.lensGun.fireing) {
      this.lensGun.updateFireProgress();
    }

    //更新鸭子飞行状态
    this.ducks.forEach((duck) => duck.update());

    //删除无效的鸭子
    this.ducks = this.ducks.filter((d) => !d.invalid);
  }

  updateKeydowns() {
    Object.keys(this.keydowns).forEach((key) => {
      if (!this.keydowns[key]) return;
      switch (key) {
        case "a":
          return this.lensGun.moveLeft();
        case "d":
          return this.lensGun.moveRight();
        case "w":
          return this.lensGun.moveTop();
        case "s":
          return this.lensGun.moveBottom();
        default:
      }
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawDuck() {
    this.ducks.forEach((duck) => {
      let key = "duck" + duck.type;
      const image = (this.source as any)![key];
      const duckmap = duck.dead
        ? duck.deadPosition[duck.deadProgress]
        : duck.livePosition[duck.liveProgress];
      const { width, height } = duck;
      this.ctx.save();
      if (duck.direction) {
        this.ctx.scale(-1, 1);
        this.ctx.translate(-this.width, 0);
      }
      this.ctx.drawImage(
        image,
        duckmap[0],
        duckmap[1],
        width,
        height,
        duck.x,
        duck.y,
        width,
        height
      );
      this.ctx.restore();
    });
  }

  destroy() {
    //停止动画
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    //停止监控dom尺寸变化
    this.sizeObserver.disconnect();
    //停止键盘监听
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }

  drawLensGun() {
    this.ctx.drawImage(
      this.source!.gunlens,
      this.lensGun.x,
      this.lensGun.y,
      this.lensGun.width,
      this.lensGun.height
    );
    //渲染烟火
    if (!this.lensGun.fireing) return;
    const firemap = this.lensGun.firePosition[this.lensGun.fireProgress];
    this.ctx.drawImage(
      this.source!.blast,
      firemap[0],
      firemap[1],
      200,
      200,
      this.lensGun.x,
      this.lensGun.y,
      this.lensGun.width,
      this.lensGun.height
    );
  }

  keyDownHandle(evt: KeyboardEvent) {
    //开火
    if (evt.code === "Space") {
      evt.preventDefault();
      this.lensGun.fired(this.ducks);
      return;
    }

    //创建鸭子
    if (evt.code === "KeyG") {
      this.createDuck();
      return;
    }

    //切换暂停
    if (evt.code === "KeyX") {
      this.suspend = !this.suspend;
      if (this.suspend) {
        if (this.animationId) {
          cancelAnimationFrame(this.animationId);
        }
      } else {
        this.render();
      }
      return;
    }
  }

  createDuck(count?: number) {
    //随机创建
    count = count ?? ~~(Math.random() * 10) + 1;
    for (let i = 0; i < count; i++) {
      const duck = new Duck(this);
      this.ducks.push(duck);
    }
  }

  //播放射击音效
  playAudioShot() {
    const { ad_shot } = this.source!;
    ad_shot.volume = 0.3;
    ad_shot.currentTime = 0;
    ad_shot.play();
  }

  //播放击中音效
  playAudioDuckHit() {
    const { ad_duck_hit } = this.source!;
    ad_duck_hit.volume = 0.3;
    ad_duck_hit.currentTime = 0;
    ad_duck_hit.play();
  }

  onKeyUp = (evt: KeyboardEvent) => {
    this.keydowns[evt.key] = false;
  };

  onKeyDown = (evt: KeyboardEvent) => {
    this.keydowns[evt.key] = true;
    //处理一些其他按键的功能
    this.keyDownHandle(evt);
  };

  resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;

    //更新枪位置
    this.lensGun.moveCenter();
  }
}
