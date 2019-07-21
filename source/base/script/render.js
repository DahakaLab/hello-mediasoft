export default class render {
  static insertNewElement(targetEl, info = { tag: 'div' }) {
    if (info && !info.tag) info.tag = 'div';
    const currentEl = document.createElement(info.tag);
    if (info.className) currentEl.classList.add(info.className);
    targetEl.append(currentEl);
    return currentEl;
  }

  static insertHtml(targetEl, html, position = 'beforeend') {
    targetEl.insertAdjacentHTML(position, html);
  }

  static replaceWithHtml(targetEl, currentEl) {
    const template = document.createElement('div');
    template.innerHTML = currentEl;
    targetEl.before(template.firstChild);
    const newTargetEl = targetEl.previousElementSibling;
    targetEl.remove();
    return newTargetEl;
  }
}