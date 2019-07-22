import Component from "../../../base/script/component";
import './place-board.scss';

const template = require('./place-board.pug');

export default class PlaceBoard extends Component {
  constructor (targetEl, state) {
    super(targetEl, state);
    this.sections = [];
    this.state = {
      sections: PlaceBoard._createSections(),
    }
    this.template = template({ state: this.state });
    console.log(this.state.sections);
  }

  static _createSections() {
    const sections = [];
    for (let rowIndex = 0; rowIndex < 8; rowIndex+=1) {
      if (!sections[rowIndex]) sections[rowIndex] = [];
      for (let colemnIndex = 0; colemnIndex < 8; colemnIndex+=1) {
        const currentRow = sections[rowIndex];
        const elem = {
          white: ((rowIndex % 2 === 0) ^ (colemnIndex % 2 === 0)) ? true : false,
          phrase: `Section ${rowIndex}:${colemnIndex}`,
        };
        currentRow.push(elem)
      }
    }
    return sections;
  }

  clickSection(event) {
    console.log(this, event);
  }
}
