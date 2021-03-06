import chroma from "chroma-js";

const levels = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const getRange = (hexColor) => [
  chroma(hexColor).darken(1.4).hex(),
  hexColor,
  chroma(hexColor).brighten(1.4).hex(),
];

const getScale = (hexColor, numberOfColors) =>
  chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors).reverse();

const generatePalette = function (starterPalette) {
  const newPalette = { ...starterPalette, colors: {} };

  for (let level of levels) {
    newPalette.colors[level] = [];
  }

  for (let color of starterPalette.colors) {
    const scales = getScale(color.color, 9);

    for (let [i, scale] of scales.entries()) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replaceAll(" ", "-"),
        hex: scale,
        rgb: chroma(scale).css(),
        rgba: chroma(scale).css().replace("rgb", "rgba").replace(")", ", 1.0)"),
      });
    }
  }

  return newPalette;
};

export { generatePalette };
