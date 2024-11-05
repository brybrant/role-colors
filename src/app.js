import { Horizontal } from '@brybrant/fade-scroll';

import Colors from './colors.json';

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

// Lightmode toggle
const lightModeToggle = document.createElement('div');
lightModeToggle.className = 'lightmode-toggle';

const lightModeLabel = document.createElement('label');
lightModeLabel.htmlFor = 'lightmode-checkbox';
lightModeLabel.innerText = 'Light mode?';
lightModeToggle.appendChild(lightModeLabel);

const lightModeCheckbox = document.createElement('input');
lightModeCheckbox.type = 'checkbox';
lightModeCheckbox.id = 'lightmode-checkbox';
lightModeToggle.appendChild(lightModeCheckbox);

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light').matches
) {
  document.documentElement.className = 'light-mode';
  lightModeCheckbox.checked = true;
}

lightModeCheckbox.addEventListener('change', (event) => {
  if (event.target.checked) {
    document.documentElement.className = 'light-mode';
  } else {
    document.documentElement.className = 'dark-mode';
  }
});

textboxContainer.appendChild(lightModeToggle);

app.appendChild(textboxContainer);

/**
 * @type {Horizontal[]}
 */
const previews = [];

/**
 * @param {string} name - Name of the section
 */
function createSection(name) {
  const hr = document.createElement('div');
  hr.className = 'hr';

  hr.appendChild(document.createElement('hr'));

  const hrLabel = document.createElement('h2');
  hrLabel.innerText = name;
  hr.appendChild(hrLabel);

  app.appendChild(hr);
}

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
for (const [shade, hues] of Object.entries(Colors)) {
  createSection(shade);

  for (const [hue, color] of Object.entries(hues)) {
    createSwatch(`${shade} ${hue}`, color);
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
