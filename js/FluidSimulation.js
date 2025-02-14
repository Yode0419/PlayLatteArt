export class FluidSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.currentOpacity = 1;
    this.fadeSpeed = 0.02;
    this.currentImage = null;
    this.isTransitioning = false;
    this.imageCache = new Map();

    this.setCanvasSize();
    this.drawBackground();

    // 預加載所有圖片
    this.preloadImages().then(() => {
      this.drawImage(0);
      console.log("🎨 Fluid Simulation Initialized!");
    });
  }

  /** 預加載所有圖片 */
  async preloadImages() {
    const totalImages = 16;
    for (let i = 0; i < totalImages; i++) {
      await this.loadImage(i);
    }
  }

  /** 加載單張圖片 */
  loadImage(index) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.imageCache.set(index, img);
        resolve(img);
      };
      img.src = `assets/img${String(index).padStart(2, "0")}.png`;
    });
  }

  /** 🎨 設置 Canvas 尺寸，支援高解析度 */
  setCanvasSize() {
    const scale = window.devicePixelRatio || 1;
    const displayWidth = this.canvas.clientWidth;
    const displayHeight = this.canvas.clientHeight;

    this.canvas.width = displayWidth * scale;
    this.canvas.height = displayHeight * scale;
    this.canvas.style.width = `${displayWidth}px`;
    this.canvas.style.height = `${displayHeight}px`;
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

  /** 🎨 繪製圖片 */
  drawImageToCanvas(img, opacity = 1) {
    const displayWidth = this.canvas.width / (window.devicePixelRatio || 1);
    const displayHeight = this.canvas.height / (window.devicePixelRatio || 1);

    const scale = Math.min(
      displayWidth / img.width,
      displayHeight / img.height
    );

    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;
    const offsetX = (displayWidth - drawWidth) / 2;
    const offsetY = (displayHeight - drawHeight) / 2;

    this.ctx.save();

    if (this.currentImage && opacity < 1) {
      this.ctx.globalAlpha = 1;
      this.ctx.drawImage(
        this.currentImage,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );
    } else {
      this.drawBackground();
    }

    this.ctx.globalAlpha = opacity;
    this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    this.ctx.restore();
  }

  /** 🖼️ 顯示圖片 */
  async drawImage(index) {
    if (this.isTransitioning) return;

    const img = this.imageCache.get(index);
    if (!img) {
      console.warn(`Image ${index} not found in cache`);
      return;
    }

    if (!this.currentImage) {
      this.currentImage = img;
      this.drawImageToCanvas(img);
    } else {
      this.isTransitioning = true;
      let opacity = 0;

      while (opacity < 1) {
        opacity += this.fadeSpeed;
        if (opacity > 1) opacity = 1;

        this.drawImageToCanvas(img, opacity);
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }

      this.currentImage = img;
      this.isTransitioning = false;
    }
  }

  /** 🔄 監聽視窗大小變化 */
  addResizeListener() {
    window.addEventListener("resize", () => {
      this.setCanvasSize();
      if (this.currentImage) {
        this.drawImageToCanvas(this.currentImage);
      }
    });
  }
}
