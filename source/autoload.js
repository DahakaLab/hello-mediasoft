import Place from './blocks/place/place';
import './autoload.scss';

const rootEl = document.getElementById('rootEl');
const place = new Place();

console.log(rootEl);

rootEl.appendChild(place.parentEl);
