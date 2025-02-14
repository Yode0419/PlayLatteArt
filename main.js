import { FluidSimulation } from "./js/FluidSimulation.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("🎨 PlayLatteArt Loaded!");

  const fluidSim = new FluidSimulation("fluidCanvas");

  document.querySelector("button").addEventListener("click", () => {
    fluidSim.toggleShape();
  });
});
