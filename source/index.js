import $ from 'jquery';

import { startCountdown } from './cells/countdown';
import { init as initSponsors, start as startSponsors } from './cells/sponsors';
import { startTime } from './cells/time';
import fetchData from './api/events';

import './styles/reset.css';
import './styles/normalize.css';
import './styles/skeleton.css';
import './styles/dashboard.scss';

const reload = () => {
  window.location.reload(true);
}

$(document).ready(() => {
  startCountdown();
  startTime();
  initSponsors();
  setTimeout(startSponsors, 1000);
  fetchData();
  setInterval(fetchData, 10000);

  setInterval(reload, 60000);
});
