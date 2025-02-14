import { FluidSimulation } from "./js/FluidSimulation.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("📜 PlayLatteArt Loaded!");

  // 初始化流體模擬
  const fluidSim = new FluidSimulation("fluidCanvas");
  console.log("🎨 Fluid Simulation Initialized!");

  // 綁定按鈕事件
  document.getElementById("testButton").addEventListener("click", () => {
    alert("Clicked!");
  });
});
