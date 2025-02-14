export class FluidSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.isHeart = true; // 初始狀態為愛心
    this.drawBackground();
    this.drawHeart();

    console.log("🎨 Fluid Simulation Initialized!");
  }

  /** 🖌️ 塗滿背景 */
  drawBackground() {
    this.ctx.fillStyle = "#D2B48C"; // 咖啡色背景
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** ❤️ 畫愛心 */
  drawHeart() {
    const ctx = this.ctx;
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 3.8;
    const size = 50;

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(
      x + size,
      y - size,
      x + 2.5 * size,
      y + size / 2,
      x,
      y + 2 * size
    );
    ctx.bezierCurveTo(
      x - 2.5 * size,
      y + size / 2,
      x - size,
      y - size,
      x,
      y + size / 4
    );
    ctx.fill();
  }

  /** ⭐ 畫星星 */
  drawStar() {
    const ctx = this.ctx;
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;
    const size = 50;

    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      let angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      let outerX = x + Math.cos(angle) * size;
      let outerY = y + Math.sin(angle) * size;
      ctx.lineTo(outerX, outerY);

      angle += Math.PI / 5;
      let innerX = x + Math.cos(angle) * (size / 2);
      let innerY = y + Math.sin(angle) * (size / 2);
      ctx.lineTo(innerX, innerY);
    }
    ctx.closePath();
    ctx.fill();
  }

  /** 🎬 切換圖案 */
  toggleShape() {
    this.drawBackground(); // 清除畫布
    if (this.isHeart) {
      this.drawStar();
    } else {
      this.drawHeart();
    }
    this.isHeart = !this.isHeart; // 切換狀態
  }
}
