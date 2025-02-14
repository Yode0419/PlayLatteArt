import { FluidSimulation } from "./js/FluidSimulation.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("☕ PlayLatteArt Loaded!");

  const canvasId = "fluidCanvas";
  const button = document.querySelector("button");

  const fluidSim = new FluidSimulation(canvasId);
  let currentIndex = 0;
  const totalImages = 16;

  /** 🔄 切換圖片並更新按鈕文字 */
  function updateImage() {
    fluidSim.drawImage(currentIndex);
    updateButtonText();
    currentIndex = (currentIndex + 1) % totalImages;
  }

  /** 📝 更新按鈕文字 */
  function updateButtonText() {
    if (currentIndex === 0) {
      button.textContent = "🥛開始拉花🥛";
    } else if (currentIndex === 15) {
      button.textContent = "❤️再拉一次❤️";
    } else {
      button.textContent = "✨拉~✨";
    }
  }

  button.addEventListener("click", updateImage);
});
