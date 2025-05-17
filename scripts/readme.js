import { writeFileSync } from 'node:fs';

import { swatches } from '../src/colors.js';

function commandTable({ title = '', type = '', trigger = '', response = '' }) {
  return `
> #### ${title}
>
>  |Type|Trigger|Response|
>  |----|-------|--------|
>  |${type}|${trigger}|${response}|`;
}

const readme = [
  '# Role Colors',

  'Custom Command code for [YAGPDB.xyz](https://yagpdb.xyz/) to facilitate self-assignable color roles in [Discord](https://discord.com/).',

  '[Preview the colors](https://brybrant.github.io/role-colors/)',

  '## Setup',

  '### 1. Create 50 roles in your Discord server:',
];

let index = 1;

const roleTable = [
  `<details>
  <summary>Roles</summary>
  <table>
    <tr>
      <th>Role #</th>
      <th>Role Name</th>
      <th>Role Color</th>
    </tr>`,
];

const svgSize = 14;
const circleSize = svgSize / 2;

for (const [shadeName, hues] of Object.entries(swatches)) {
  roleTable.push(`<tr><th colspan="3">${shadeName}</th></tr>`);

  for (const [hueName, color] of Object.entries(hues)) {
    const svg = [
      `<svg viewBox="0 0 ${svgSize} ${svgSize}" width="${svgSize}" height="${svgSize}" xmlns="http://www.w3.org/2000/svg">`,
      `<circle fill="${color}" cx="${circleSize}" cy="${circleSize}" r="${circleSize}"/>`,
      '</svg>',
    ];

    const name = (shadeName === 'Grayscale' ? '' : `${shadeName} `) + hueName;

    writeFileSync(`./public/readme/${name}.svg`, svg.join(''));

    const roleTableRow = [];

    roleTableRow.push(
      index++,
      name,
      `<code>${color}</code> <img src="./public/readme/${name}.svg">`,
    );

    roleTable.push(
      `<tr><td align="right">${roleTableRow.join('</td><td>')}</td></tr>`,
    );
  }
}

roleTable.push('</table></details>');

readme.push(
  roleTable.join('\n'),

  '### 2. Create two Custom Commands for your Discord server in the YAGPDB.xyz control panel with the following settings:',

  commandTable({
    title: 'Custom Command 1: Post/update the color menu message',
    type: 'Command',
    trigger: '`colors`',
    response: '[color-menu.yag](./yagpdb-custom-commands/color-menu.yag)',
  }),

  '- Make sure to replace `<color channel id>` with the ID of the channel that the color menu message will be posted. ([How to acquire Discord channel IDs](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID))',

  '- You must give the bot permission to post messages to the designated channel or else the command will fail.',

  commandTable({
    title: 'Custom Command 2: Set color role on interacting user',
    type: 'Message Component',
    trigger: '`^color-menu-\\d$`',
    response: '[interaction.yag](./yagpdb-custom-commands/interaction.yag)',
  }),

  '## gg sans',

  'This project uses Discord\'s proprietary font ["gg sans"](https://support.discord.com/hc/en-us/articles/9507780972951-gg-sans-Font-Update-FAQ) which is Copyright &copy; Discord Inc.',
);

writeFileSync('./README.md', readme.join('\n\n'));
