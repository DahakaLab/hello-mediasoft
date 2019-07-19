const template = require('./place.pug');

export default class Place {
  constructor() {
    this._place = document.createElement('div');
    this._place.innerText = 'test';
    this._place.innerHTML = template({phrase: 'pug is coll work!'});
  }

  get parentEl() {
    return this._place;
  }
}
