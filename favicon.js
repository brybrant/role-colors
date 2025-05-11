import { writeFile } from 'node:fs';

import { hues, shades, swatches } from './src/colors.js';

const size = 100;
const rows = Object.keys(shades).length;
const columns = Object.keys(hues).length;
const width = size / columns;
const height = size / rows;

export default function favicon() {
  return {
    name: 'favicon',

    buildEnd(/* error */) {
      const favicon = [
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}'>`,
        '<defs>',
        `<rect id='a' width='${width}' height='${height}'/>`,
        '</defs>',
      ];

      let row = 0;

      // Generate favicon
      for (const shade of Object.keys(shades)) {
        let column = 0;

        const swatch = swatches[shade];

        for (const color of Object.values(swatch)) {
          favicon.push(
            `<use href='#a' x='${column}' y='${row}' fill='${color}'/>`,
          );
          column += width;
        }

        row += height;
      }

      favicon.push('</svg>');

      writeFile('./public/favicon.svg', favicon.join(''), (error) => {
        if (error) return console.error(error);

        console.log('Favicon generated!');
      });
    },
  };
}
