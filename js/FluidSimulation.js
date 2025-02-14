export class FluidSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.startSimulation();
  }

  /** 🖌️ 塗滿背景 */
  drawBackground() {
    this.ctx.fillStyle = "#D2B48C"; // 咖啡色背景
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** 🎬 啟動流體模擬（未來可用來繪製動畫） */
  startSimulation() {
    console.log("🌊 Starting fluid simulation...");
    this.drawBackground();
    this.drawHeart(); // 繪製愛心
  }

  /** ❤️ 在畫布中央畫一顆愛心 */
  drawHeart() {
    const ctx = this.ctx;
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2.8;
    const size = 50; // 愛心大小

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);

    // 左半邊
    ctx.bezierCurveTo(
      x - size,
      y - size / 2, // 控制點 1
      x - size * 1.5,
      y + size / 3, // 控制點 2
      x,
      y + size // 終點
    );

    // 右半邊
    ctx.bezierCurveTo(
      x + size * 1.5,
      y + size / 3, // 控制點 3
      x + size,
      y - size / 2, // 控制點 4
      x,
      y + size / 4 // 回到起點
    );

    ctx.fill();
    console.log("❤️ Heart drawn!");
  }
}
