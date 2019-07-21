import Component from "../../../base/script/component";

const template = require('./place-board.pug');

export default class PlaceBoard extends Component {
  constructor (targetEl, state) {
    super(targetEl, state);
    this.template = template();
  }
}
