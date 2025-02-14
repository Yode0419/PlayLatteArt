export class FluidSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.setCanvasSize();
    this.drawBackground();
    console.log("🎨 Fluid Simulation Initialized!");
  }

  /** 🎨 設置 Canvas 尺寸，支援高解析度 */
  setCanvasSize() {
    const scale = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * scale;
    this.canvas.height = this.canvas.clientHeight * scale;
    this.ctx.scale(scale, scale);
  }

  /** 🟤 塗滿背景 */
  drawBackground() {
    this.ctx.fillStyle = "#e49d5a";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** 🖼️ 顯示圖片，確保居中並填滿畫布 */
  drawImage(index) {
    const img = new Image();
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground();

      const canvasWidth = this.canvas.width;
      const canvasHeight = this.canvas.height;
      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        // 圖片較寬，以畫布高度為基準縮放
        drawHeight = canvasHeight * 0.5;
        drawWidth = img.width * (canvasHeight / img.height) * 0.5;
        offsetX = 0;
        offsetY = 0;
      } else {
        // 圖片較高，以畫布寬度為基準縮放
        drawWidth = canvasWidth * 0.5;
        drawHeight = img.height * (canvasWidth / img.width) * 0.5;
        offsetX = 0;
        offsetY = 0;
      }

      this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };
    img.src = `assets/img${String(index).padStart(2, "0")}.png`;
  }
}
