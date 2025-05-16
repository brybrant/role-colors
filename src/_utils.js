/**
 * @param {string} name - Name of the section
 */
export function createSection(name) {
  const hr = document.createElement('div');
  hr.className = 'hr';

  hr.appendChild(document.createElement('hr'));

  const hrLabel = document.createElement('h2');
  hrLabel.innerText = name;
  hr.appendChild(hrLabel);

  return hr;
}
