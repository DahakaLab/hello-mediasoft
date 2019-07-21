import Component from "../../../base/script/component";

const template = require('./place-out.pug');

export default class PlaceOut extends Component {
  constructor (targetEl, state) {
    super(targetEl, state);
    this.template = template(state);
  }
}
