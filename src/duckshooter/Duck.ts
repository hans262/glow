import { DuckShooter } from "./DuckShooter";

/**
 * 鸭子
 */
export class Duck {
  id = Date.now() + Math.random();
  x = 0;
  y = 0;
  width = 200;
  height = 200;
  /**是否水平翻转渲染 */
  direction: 0 | 1 = 0;
  type: 1 | 2 | 3 | 4 = 1; //鸭子图片类型
  liveProgress = 0; //活着画面进度 0 - 7
  livePosition = [
    [0, 0],
    [200, 0],
    [400, 0],
    [600, 0],
    [800, 0],
    [1000, 0],
    [1200, 0],
    [1400, 0],
  ];
  deadProgress = 0; //死亡画面进度 0 - 36
  deadPosition = [
    [1600, 0],
    [0, 200],
    [200, 200],
    [400, 200],
    [600, 200],
    [800, 200],
    [1000, 200],
    [1200, 200],
    [1400, 200],
    [1600, 200],
    [0, 400],
    [200, 400],
    [400, 400],
    [600, 400],
    [800, 400],
    [1000, 400],
    [1200, 400],
    [1400, 400],
    [1600, 400],
    [0, 600],
    [200, 600],
    [400, 600],
    [600, 600],
    [800, 600],
    [1000, 600],
    [1200, 600],
    [1400, 600],
    [1600, 600],
    [0, 800],
    [200, 800],
    [400, 800],
    [600, 800],
    [800, 800],
    [1000, 800],
    [1200, 800],
    [1400, 800],
    [1600, 800],
  ];
  speedX = Math.random() * 2;
  speedY = Math.random() * 2.5 + 0.5;
  invalid = false; // 超出边界
  dead = false; // 击中死亡

  constructor(public ds: DuckShooter) {
    //初始化方位
    this.direction = ~~(Math.random() * 2) as 0 | 1;
    //初始化位置，全部朝左半场随机分布
    const maxX = ds.width - this.width;
    this.x = (maxX / 2) * Math.random() + maxX / 2;
    this.y = ds.height - this.height;
    //初始化鸭子类型
    this.type = (~~(Math.random() * 4) + 1) as 1 | 2 | 3 | 4;
  }

  //以鸭子中心，取n*n的矩形
  getCenterBox(n: number) {
    let { x, y } = this;
    if (this.direction) {
      x = this.getDirectionX();
    }
    const center = [x + this.width / 2, y + this.height / 2];
    return { x: center[0] - n / 2, y: center[1] - n / 2, width: n, height: n };
  }

  //水平翻转后，鸭子的实际x坐标
  getDirectionX() {
    return this.ds.width / 2 - (this.x + this.width - this.ds.width / 2);
  }

  updateDead() {
    this.dead = true;
    //播放死亡音频
    this.ds.playAudioDuckHit();
    this.ds.stat.shotHit += 1;
  }

  move() {
    if (this.dead) {
      this.y += 6;
    } else {
      this.x -= this.speedX;
      this.y -= this.speedY;
    }
    //判定 鸭子是否超出边界
    if (
      this.x < 0 - this.width ||
      this.y < 0 - this.height ||
      this.y > this.ds.height
    ) {
      // console.log("飞出一只");
      this.invalid = true;
      this.ds.createDuck(1);
    }
  }
  update() {
    if (this.dead) {
      this.updateDeadProgress();
    } else {
      this.updateLiveProgress();
    }
    this.move();
  }

  updateDeadProgress() {
    let nextProgress = this.deadProgress + 1;
    nextProgress = nextProgress > 36 ? 36 : nextProgress;
    this.deadProgress = nextProgress;
  }
  updateLiveProgress() {
    let nextProgress = this.liveProgress + 1;
    nextProgress = nextProgress > 7 ? 0 : nextProgress;
    this.liveProgress = nextProgress;
  }
}
