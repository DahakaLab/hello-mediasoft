import render from "./render";

export default class Component {
  constructor(targetEl, state) {
    this._targetEl = targetEl;
    this._state = state;
    this._template = '';
    this.$refs = {};
  }

  get template() {
    return this._template;
  }

  set template(val) {
    this._template = val;
    this._render();
  }

  _render(targetEl = this._targetEl, template = this.template) {
    this._targetEl = render.replaceWithHtml(targetEl, template);
    this._updated();
  }

  _updated() {
    this._uppdateRefs();
  }

  _uppdateRefs() {
    const refsEls = Array.from(this._targetEl.querySelectorAll('[data-ref]'));
    refsEls.forEach((refsEl) => {
      const currentAttr = refsEl.dataset.ref;
      const currentRef = this.$refs[currentAttr];
      if (!currentRef) {
        this.$refs[currentAttr] = refsEl;
      } else if (Array.isArray(currentRef)) {
        currentRef.push(refsEl);
      } else {
        this.$refs[currentAttr] = [currentRef, refsEl];
      }
    });
  }
}