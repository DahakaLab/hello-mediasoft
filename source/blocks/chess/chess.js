import render from "../../base/script/render";
import Place from "../place/place";

export default function chess(targetEl) {
  const containerEl = render.insertNewElement(targetEl, { className: 'container' });
  const placeEl =  render.insertNewElement(containerEl, { className: 'place' });
  new Place(placeEl);
};
