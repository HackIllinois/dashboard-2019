import $ from 'jquery';

import Amadeus from '../assets/Sponsors/Amadeus.png';
import C1 from '../assets/Sponsors/C1.png';
import Caterpillar from '../assets/Sponsors/Caterpillar.png';
import Citadel from '../assets/Sponsors/Citadel.png';
import Facebook from '../assets/Sponsors/Facebook.png';
import Fulcrum from '../assets/Sponsors/Fulcrum.png';
import Google from '../assets/Sponsors/Google.png';
import IMC from '../assets/Sponsors/IMC.png';
import Jackson from '../assets/Sponsors/Jackson.png';
import Mirus from '../assets/Sponsors/MirusResearch.png';
import Mozilla from '../assets/Sponsors/Mozilla.png';
import NPM from '../assets/Sponsors/npm.svg';
import Nvisia from '../assets/Sponsors/Nvisia.png';
import Optum from '../assets/Sponsors/Optum.png';
import Particle from '../assets/Sponsors/Particle.png';
import RC from '../assets/Sponsors/RC.png';
import Schlum from '../assets/Sponsors/Schlum.png';
import SNL from '../assets/Sponsors/SNL.png';
import TwoSigma from '../assets/Sponsors/TwoSigma.png';
import Zeit from '../assets/Sponsors/Zeit.svg';

let sponsors = [
  Amadeus, C1, Caterpillar, Citadel, Facebook, Fulcrum, Google, IMC, Jackson, Mirus,
  Mozilla, NPM, Nvisia, Optum, Particle, RC, Schlum, SNL, TwoSigma, Zeit,
];
const order = [6, 2, 4, 1, 7, 8, 5, 0, 3]
let count = 0;

const shuffle = () => {
  let j, x, i;
  for (i = sponsors.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = sponsors[i];
    sponsors[i] = sponsors[j];
    sponsors[j] = x;
  }
}

export const init = () => {
  shuffle();
}

const ANIMATION_DURATION = 840;
const tick = () => {
  count = (count + 1) % (9 * sponsors.length);
  const target = $(`#sponsor-${order[count % 9]}`);
  target.animate({ opacity: 0 }, ANIMATION_DURATION, () => {
    target.attr('src', sponsors[count % sponsors.length]);
    target.animate({ opacity: 1 }, ANIMATION_DURATION);
  });
}

export const start = () => {
  return setInterval(tick, 4000);
}
