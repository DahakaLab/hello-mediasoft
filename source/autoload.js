import chess from './blocks/chess/chess'
import './autoload.scss';

const chessEl = document.getElementById('chess');
(chessEl && chess(chessEl));
