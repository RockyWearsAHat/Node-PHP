const generateRandomSeed = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

const svgBackground = document.getElementById("svgBackground");
svgBackground.setAttribute("seed", generateRandomSeed());
