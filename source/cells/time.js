const adjust = (t) => t < 10 ? '0' + t : t;

export const startTime = () => {
  const calcTime = () => {
    const today = new Date();
    const H = today.getHours();
    const m = adjust(today.getMinutes());

    const meridian = H > 12 ? 'PM' : 'AM';

    let h = H;
    if (H == 0) {
      h = 12;
    } else if (H > 12) {
      h = H % 12;
    }
    h = adjust(h);

    document.getElementById('time').innerHTML = h + ":" + m;
    document.getElementById('meridian').innerHTML = meridian;
  }

  return setInterval(calcTime, 200);
}