import { convertOkhsvToOklab, convertOklabToRgb, formatHex } from 'culori';

export const hues = [
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

export const shades = {
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

export const swatches = {};

// Shades
for (const [shadeName, shade] of Object.entries(shades)) {
  swatches[shadeName] = {};

  for (let i = 0; i < hues.length; i++) {
    const hueName = hues[i];

    const hex = formatHex(
      convertOklabToRgb(
        convertOkhsvToOklab({
          h: hueStart + hueStep * i,
          s: shade.saturation,
          v: shade.value,
        }),
      ),
    );

    swatches[shadeName][hueName] = hex;
  }
}

// Grayscale
swatches.Grayscale = {};

for (let i = 0; i < hues.length; i++) {
  const grade = hues.length - (i + 1);

  const octet = `0${Math.round(
    Math.max((grade / (hues.length - 1)) * 255, 1),
  ).toString(16)}`.slice(-2);

  const hex = `#${octet}${octet}${octet}`;

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
