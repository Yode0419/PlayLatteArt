import { FluidSimulation } from "./js/FluidSimulation.js";

// 初始化流體模擬
const simulation = new FluidSimulation("fluidCanvas");

// 添加視窗大小變化監聽
simulation.addResizeListener();

// 獲取元素
const canvas = document.getElementById("fluidCanvas");
const instruction = document.getElementById("instruction");
const restartButton = document.getElementById("restartButton");

// 控制變數
let currentPhase = "pour";
let isPouring = false;
let pourTimer = null;
let currentIndex = 0;

// 更新提示文字
function updateInstruction() {
  switch (currentPhase) {
    case "pour":
      instruction.textContent = "🥛 按住咖啡杯倒牛奶 🥛";
      restartButton.classList.add("hidden"); // 確保按鈕隱藏
      break;
    case "cocoa":
      instruction.textContent = "🍫 點擊撒上可可粉 🍫";
      restartButton.classList.add("hidden"); // 確保按鈕隱藏
      break;
    case "complete":
      instruction.textContent = "❤️ 完成了好香！ ❤️";
      restartButton.classList.remove("hidden"); // 只在完成時顯示按鈕
      break;
  }
}

// 監聽畫布事件
canvas.addEventListener("mousedown", startPouring);
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startPouring();
});

canvas.addEventListener("mouseup", stopPouring);
canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  stopPouring();
});

canvas.addEventListener("mouseleave", stopPouring);
canvas.addEventListener("touchcancel", stopPouring);

// 監聽重新開始按鈕
restartButton.addEventListener("click", () => {
  currentIndex = 0;
  currentPhase = "pour";
  simulation.drawImage(0);
  restartButton.classList.add("hidden");
  updateInstruction();
});

// 開始倒奶
function startPouring() {
  if (currentPhase === "pour" && !isPouring) {
    isPouring = true;
    // 立即顯示下一幀
    if (currentIndex < 10) {
      currentIndex++;
      simulation.drawImage(currentIndex);
    }
    // 設置定時器，每 500ms 切換一次圖片
    pourTimer = setInterval(() => {
      if (currentIndex < 10) {
        currentIndex++;
        simulation.drawImage(currentIndex);
        if (currentIndex >= 10) {
          stopPouring();
        }
      }
    }, 500);
  } else if (currentPhase === "cocoa") {
    // 撒可可粉階段，每次點擊前進一張
    if (currentIndex < 15) {
      currentIndex++;
      simulation.drawImage(currentIndex);
      if (currentIndex >= 15) {
        currentPhase = "complete";
        updateInstruction();
      }
    }
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
    updateInstruction();
    restartButton.classList.add("hidden"); // 確保按鈕隱藏
  }
}

// 初始化提示文字
updateInstruction();
