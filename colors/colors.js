import { writeFileSync } from 'node:fs';

import { okhsv2rgba, rgba2hex } from './colorconversion.js';

const hues = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Teal',
  'Cyan',
  'Blue',
  'Violet',
  'Magenta',
  'Pink',
];

const hueStart = 29.2;
const hueStep = 360 / hues.length;

const shades = {
  Bright: {
    saturation: 0.95,
    value: 1,
  },
  Deep: {
    saturation: 1,
    value: 0.65,
  },
  Muted: {
    saturation: 0.5,
    value: 0.65,
  },
  Pastel: {
    saturation: 0.35,
    value: 1,
  },
};

const swatches = {};

// Shades
for (const [name, shade] of Object.entries(shades)) {
  swatches[name] = {};

  for (let i = 0; i < hues.length; i++) {
    const hue = hues[i];

    const rgba = okhsv2rgba(
      hueStart + hueStep * i,
      shade.saturation,
      shade.value,
    );

    swatches[name][hue] = rgba2hex(rgba[0], rgba[1], rgba[2]);
  }
}

const size = 100;
const rows = Object.keys(shades).length;
const columns = hues.length;
const width = size / columns;
const height = size / rows;

const favicon = [
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}'>`,
  '<defs>',
  `<rect id='a' width='${width}' height='${height}'/>`,
  '</defs>',
];

let row = 0;

// Generate favicon
for (const swatch of Object.values(swatches)) {
  let column = 0;
  for (const color of Object.values(swatch)) {
    favicon.push(`<use href='#a' x='${column}' y='${row}' fill='${color}'/>`);
    column += width;
  }
  row += height;
}

favicon.push('</svg>');

writeFileSync('./public/favicon.svg', favicon.join(''));

// Grayscale
swatches.Grayscale = {};

for (let i = 0; i < hues.length; i++) {
  let grade = hues.length - (i + 1);

  const rgba = okhsv2rgba(0, 0, grade / (hues.length - 1));

  const hex = rgba2hex(rgba[0], rgba[1], rgba[2]);

  switch (grade) {
    case 0:
      swatches.Grayscale.Black = hex;
      break;

    case hues.length - 1:
      swatches.Grayscale.White = hex;
      break;

    default:
      swatches.Grayscale[`Gray ${grade}`] = hex;
  }
}

writeFileSync('./src/colors.json', JSON.stringify(swatches, null, 2));
