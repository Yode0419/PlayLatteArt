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

    // 獲取容器的實際大小
    const displayWidth = this.canvas.clientWidth;
    const displayHeight = this.canvas.clientHeight;

    // 設置畫布的緩衝區大小
    this.canvas.width = displayWidth * scale;
    this.canvas.height = displayHeight * scale;

    // 設置畫布的顯示大小
    this.canvas.style.width = `${displayWidth}px`;
    this.canvas.style.height = `${displayHeight}px`;

    // 調整繪圖環境比例
    this.ctx.scale(scale, scale);
  }

  /** 🟤 塗滿背景 */
  drawBackground() {
    this.ctx.fillStyle = "#e49d5a";
    this.ctx.fillRect(
      0,
      0,
      this.canvas.width / (window.devicePixelRatio || 1),
      this.canvas.height / (window.devicePixelRatio || 1)
    );
  }

  /** 🖼️ 顯示圖片，確保居中並填滿畫布 */
  drawImage(index) {
    const img = new Image();
    img.onload = () => {
      // 清除畫布並重繪背景
      const displayWidth = this.canvas.width / (window.devicePixelRatio || 1);
      const displayHeight = this.canvas.height / (window.devicePixelRatio || 1);

      this.ctx.clearRect(0, 0, displayWidth, displayHeight);
      this.drawBackground();

      // 計算縮放比例（保持圖片比例）
      const scale = Math.min(
        (displayWidth * 1) / img.width,
        (displayHeight * 1) / img.height
      );

      // 計算縮放後的尺寸
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      // 計算置中位置
      const offsetX = (displayWidth - drawWidth) / 2;
      const offsetY = (displayHeight - drawHeight) / 2;

      // 繪製圖片
      this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };
    img.src = `assets/img${String(index).padStart(2, "0")}.png`;
  }
}
