import { FluidSimulation } from "./js/FluidSimulation.js";

// 初始化流體模擬
const simulation = new FluidSimulation("fluidCanvas");

// 添加視窗大小變化監聽
simulation.addResizeListener();

// 獲取按鈕元素
const button = document.getElementById("testButton");

// 設置按鈕初始文字
button.textContent = "按住倒牛奶 🥛";

// 監聽按鈕事件
let currentPhase = "pour";
let isPouring = false;
let pourTimer = null;
let currentIndex = 0;

// 按住按鈕開始倒奶
button.addEventListener("mousedown", startPouring);
button.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startPouring();
});

// 放開按鈕停止倒奶
button.addEventListener("mouseup", stopPouring);
button.addEventListener("touchend", (e) => {
  e.preventDefault();
  stopPouring();
});

// 滑鼠/手指離開按鈕也要停止
button.addEventListener("mouseleave", stopPouring);
button.addEventListener("touchcancel", stopPouring);

// 開始倒奶
function startPouring() {
  if (currentPhase === "pour" && !isPouring) {
    isPouring = true;
    // 立即顯示下一幀
    if (currentIndex < 10) {
      currentIndex++;
      simulation.drawImage(currentIndex);
    }
    // 設置定時器，每 300ms 切換一次圖片
    pourTimer = setInterval(() => {
      if (currentIndex < 10) {
        currentIndex++;
        simulation.drawImage(currentIndex);
        if (currentIndex >= 10) {
          stopPouring();
        }
      }
    }, 300);
  }
}

// 停止倒奶
function stopPouring() {
  if (pourTimer) {
    clearInterval(pourTimer);
    pourTimer = null;
  }

  isPouring = false;

  if (currentPhase === "pour" && currentIndex >= 10) {
    currentPhase = "cocoa";
    button.textContent = "撒上可可粉 🍫";
  } else if (currentPhase === "cocoa") {
    // 撒可可粉階段，每次點擊前進一張
    if (currentIndex < 15) {
      currentIndex++;
      simulation.drawImage(currentIndex);
      if (currentIndex >= 15) {
        currentPhase = "restart";
        button.textContent = "再拉一次 ❤️";
      }
    }
  } else if (currentPhase === "restart") {
    // 重新開始
    currentIndex = 0;
    currentPhase = "pour";
    simulation.drawImage(currentIndex);
    button.textContent = "按住倒牛奶 🥛";
  }
}
