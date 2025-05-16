import { writeFile } from 'node:fs';

// import { wcagContrast } from 'culori';

import { swatches } from '../src/colors.js';

function commandTable(details = { type: '', trigger: '', response: '' }) {
  return `
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Trigger</th>
        <th>Response</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${details.type}</td>
        <td>${details.trigger}</td>
        <td>${details.response}</td>
      </tr>
    </tbody>
  </table>`;
}

const readme = [
  '# Role Colors',

  'Custom Command code for [YAGPDB.xyz](https://yagpdb.xyz/) to facilitate self-assignable color roles in [Discord](https://discord.com/).',

  '[Preview the colors](https://brybrant.github.io/role-colors/)',

  '## Setup',

  '### Create 50 roles in your Discord server:',
];

let index = 1;

const roleTable = [
  `<details>
  <summary>Roles</summary>

  |Role #|Role Name|Role Color|
  |  ---:|---------|----------|`,
];

for (const [shadeName, hues] of Object.entries(swatches)) {
  for (const [hueName, color] of Object.entries(hues)) {
    // const whiteContrast = wcagContrast(color, '#ffffff');

    // const blackContrast = wcagContrast(color, '#000000');

    roleTable.push(
      `|${index++}|${
        shadeName === 'Grayscale' ? '' : shadeName
      } ${hueName}|\`${color}\`|`,
    );

    // color:${whiteContrast > blackContrast ? '#fff' : '#000'}
  }
}

roleTable.push('</details>');

readme.push(
  roleTable.join('\n  '),

  '### Create two Custom Commands in the YAGPDB.xyz control panel for your Discord server with the following settings:',

  '#### Custom Command 1: Post/update the color menu message',

  commandTable({
    type: 'Command',
    trigger: '<code>colors</code>',
    response:
      '<a href="./yagpdb-custom-commands/color-menu.yag">color-menu.yag</a>',
  }),

  '- **Make sure to replace `<color channel id>` with the ID of the channel that the color menu message will be posted to.**',

  '- **You must afford the bot permission to post messages to the designated channel or else the command will fail.**',

  '#### Custom Command 2: Set color role on interacting user',

  commandTable({
    type: 'Message Component',
    trigger: '<code>^color-menu-\\d$</code>',
    response:
      '<a href="./yagpdb-custom-commands/interaction.yag">interaction.yag</a>',
  }),

  '## gg sans',

  'This project uses Discord\'s proprietary font ["gg sans"](https://support.discord.com/hc/en-us/articles/9507780972951-gg-sans-Font-Update-FAQ) which is Copyright &copy; Discord Inc.',
);

writeFile('./README.md', readme.join('\n\n'), (error) => {
  if (error) return console.error(error);

  console.log('Generated README.md');
});
