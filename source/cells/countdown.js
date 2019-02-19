const to = new Date('2019-02-22T20:00:00-0600');

const adjust = (t) => t < 10 ? '0' + t : t;

const setTime = (d, h, m, s) => {
  document.getElementById('d-prev').innerHTML = adjust(d === 0 ? 0 : d - 1);
  document.getElementById('h-prev').innerHTML = adjust((h - 1 + 24) % 24);
  document.getElementById('m-prev').innerHTML = adjust((m - 1 + 60) % 60);
  document.getElementById('s-prev').innerHTML = adjust((s - 1 + 60) % 60);

  document.getElementById('d-cur').innerHTML = adjust(d);
  document.getElementById('h-cur').innerHTML = adjust(h);
  document.getElementById('m-cur').innerHTML = adjust(m);
  document.getElementById('s-cur').innerHTML = adjust(s);

  document.getElementById('d-next').innerHTML = adjust(d + 1);
  document.getElementById('h-next').innerHTML = adjust((h + 1) % 24);
  document.getElementById('m-next').innerHTML = adjust((m + 1) % 60);
  document.getElementById('s-next').innerHTML = adjust((s + 1) % 60);
};

const tick = () => {
  const now = new Date();
  let delta = (to - now) / 1000;

  if (delta < 0) {
    setTime(0,0,0,0);
    return;
  }

  const days = Math.floor(delta / 86400);
  delta -= days * 86400;

  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  const seconds = Math.floor(delta % 60);

  setTime(days, hours, minutes, seconds);
}

export const startCountdown = () => {
  return setInterval(tick, 200);
}