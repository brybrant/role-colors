import { Horizontal } from '@brybrant/fade-scroll';

import { swatches } from './colors.js';

import { createSection } from './_utils.js';

import GitHubSVG from '../node_modules/@brybrant/svg-icons/GitHub.svg';

import './app.scss';

const app = document.getElementById('app');

// Nickname input
const textboxContainer = document.createElement('div');
textboxContainer.className = 'textbox-container';

const textbox = document.createElement('input');
textbox.type = 'text';
textbox.maxLength = textbox.size = 32;
textbox.placeholder = 'Your Nickname';
textbox.className = 'preview-input';
textboxContainer.appendChild(textbox);

if (window.location.hash) {
  textbox.value = window.location.hash.slice(1);
}

// Theme buttons
const themeContainer = document.createElement('div');
themeContainer.className = 'theme-container';

const themes = ['light', 'ash', 'dark', 'onyx'];

for (const theme of themes) {
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'theme-button theme-button--' + theme;

  const themeButton = document.createElement('input');
  themeButton.name = 'theme';
  themeButton.type = 'radio';
  themeButton.value = theme;

  buttonContainer.appendChild(themeButton);

  themeButton.addEventListener('click', () => {
    document.documentElement.className = theme + '-theme';
  });

  const themeTooltip = document.createElement('div');
  themeTooltip.className = 'tooltip';

  const tooltipArrow = document.createElement('div');
  tooltipArrow.className = 'tooltip__arrow';

  const tooltipInner = document.createElement('div');
  tooltipInner.className = 'tooltip__inner';
  tooltipInner.innerText = theme;

  themeTooltip.appendChild(tooltipArrow);
  themeTooltip.appendChild(tooltipInner);

  buttonContainer.appendChild(themeTooltip);

  themeContainer.appendChild(buttonContainer);
}

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches
) {
  document.documentElement.className = 'light-theme';
}

app.appendChild(textboxContainer);

app.appendChild(themeContainer);

/**
 * @type {Horizontal[]}
 */
const previews = [];

/**
 * @param {string} name - Name of the color
 * @param {string} color - HEX color code string (like `#fff` or `#ff0000`)
 */
function createSwatch(name, color) {
  const container = document.createElement('div');
  container.className = 'container';

  const swatch = document.createElement('div');
  swatch.className = 'swatch';
  swatch.style.color = color;
  container.appendChild(swatch);

  const preview = document.createElement('div');
  preview.className = 'swatch-preview';
  swatch.appendChild(preview);

  const previewContent = document.createElement('span');
  previewContent.innerText = textbox.value || textbox.placeholder;
  preview.appendChild(previewContent);

  const previewScroller = new Horizontal(previewContent, {
    captureWheel: true,
  });

  previews.push(previewScroller);

  const label = document.createElement('span');
  label.className = 'swatch-label';
  label.innerText = name;
  container.appendChild(label);

  const code = document.createElement('code');
  code.className = 'swatch-code';
  code.innerText = color;
  container.appendChild(code);

  app.appendChild(container);

  previewScroller.options.hideScrollbar = true;

  previewScroller.mount();
}

// Colors
for (const [shadeName, hues] of Object.entries(swatches)) {
  app.appendChild(createSection(shadeName));

  for (const [hueName, color] of Object.entries(hues)) {
    if (shadeName === 'Grayscale') {
      createSwatch(hueName, color);
      continue;
    }

    createSwatch(`${shadeName} ${hueName}`, color);
  }
}

textbox.addEventListener('input', (event) => {
  window.history.replaceState(null, '', `#${event.target.value}`);

  for (const preview of previews) {
    preview.content.innerText = event.target.value || textbox.placeholder;
  }
});

const footer = document.createElement('footer');

const githubLink = document.createElement('a');
githubLink.className = 'github-link';
githubLink.href = 'https://github.com/brybrant/role-colors';
githubLink.target = '_blank';
githubLink.innerHTML = GitHubSVG;

footer.appendChild(githubLink);

app.appendChild(footer);
