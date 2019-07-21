import PlaceBoard from './board/place-board';
import Component from '../../base/script/component';
import PlaceOut from './out/place-out';

const template = require('./place.pug');

export default class Place extends Component {
  constructor(targetEl, state = {}) {
    super(targetEl, state);
    this.template = template(state);
    this.playerOutWhite = new PlaceOut(this.$refs.outWhite, { playerName: 'white' });
    this.placeBoard = new PlaceBoard(this.$refs.board);
    this.playerOutBlack = new PlaceOut(this.$refs.outBlack, { playerName: 'black' });
  }
}
