import { Duck } from "./Duck";
import { DuckShooter } from "./DuckShooter";

/**
 * 枪镜头
 */
export class LensGun {
  x: number;
  y: number;
  speed = 10;
  fireProgress = 24; //开火进度 0 - 24
  firePosition = [
    //开火图片定位
    [0, 0],
    [200, 0],
    [400, 0],
    [600, 0],
    [800, 0],
    [0, 200],
    [200, 200],
    [400, 200],
    [600, 200],
    [800, 200],
    [0, 400],
    [200, 400],
    [400, 400],
    [600, 400],
    [800, 400],
    [0, 600],
    [200, 600],
    [400, 600],
    [600, 600],
    [800, 600],
    [0, 800],
    [200, 800],
    [400, 800],
    [600, 800],
    [800, 800],
  ];
  fireing = false; //开火状态
  constructor(
    public ds: DuckShooter,
    public width: number,
    public height: number
  ) {
    this.x = (ds.width - this.width) / 2;
    this.y = (ds.height - this.height) / 2;
  }
  moveCenter() {
    this.x = (this.ds.width - this.width) / 2;
    this.y = (this.ds.height - this.height) / 2;
  }
  updateFireProgress() {
    let nextProgress = this.fireProgress + 1;
    if (nextProgress > 24) {
      nextProgress = 24;
      this.fireing = false;
    }
    this.fireProgress = nextProgress;
  }
  //以镜头中心，取n*n的矩形
  getCenterBox(n: number): Rect {
    const center = [this.x + this.width / 2, this.y + this.height / 2];
    return { x: center[0] - n / 2, y: center[1] - n / 2, width: n, height: n };
  }
  fired(ducks: Duck[]) {
    this.fireing = true;
    this.fireProgress = 0;
    this.ds.playAudioShot();
    //判定是否击中鸭子
    ducks.forEach((duck) => {
      const a = this.getCenterBox(10);
      //鸭子是100x100的矩形
      const b = duck.getCenterBox(100);
      if (this.collide(a, b)) {
        duck.updateDead();
      }
    });
  }
  collide(a: Rect, b: Rect) {
    //两个矩形中心点 x轴距离 <= 两个矩形宽和的一半 &&
    //两个矩形中心点 y轴距离 <= 两个矩形高和的一半
    const cond1 = [a.x + a.width / 2, a.y + a.height / 2];
    const cond2 = [b.x + b.width / 2, b.y + b.height / 2];
    const cx = Math.abs(cond1[0] - cond2[0]);
    const cy = Math.abs(cond1[1] - cond2[1]);
    if (cx <= (a.width + b.width) / 2 && cy <= (a.height + b.height) / 2) {
      return true;
    }
    return false;
  }
  moveLeft() {
    let nextX = this.x - this.speed;
    if (nextX < 0) nextX = 0;
    this.x = nextX;
  }
  moveRight() {
    let nextX = this.x + this.speed;
    if (nextX > this.ds.width - this.width) nextX = this.ds.width - this.width;
    this.x = nextX;
  }
  moveTop() {
    let nextY = this.y - this.speed;
    if (nextY < 0) nextY = 0;
    this.y = nextY;
  }
  moveBottom() {
    let nextY = this.y + this.speed;
    if (nextY > this.ds.height - this.height)
      nextY = this.ds.height - this.height;
    this.y = nextY;
  }
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
