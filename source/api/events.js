import $ from 'jquery';

const eventsRoute = `${process.env.API_ENDPOINT}/event/`;
const notificationsRoute = `${process.env.API_ENDPOINT}/notifications/public/`;

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function formatTime(d) {
  const hh = d.getHours();
  let m = d.getMinutes();
  let dd = "AM";
  let h = hh;
  if (h >= 12) {
    h = hh - 12;
    dd = "PM";
  }
  if (h == 0) {
    h = 12;
  }
  m = m < 10 ? "0" + m : m;

  return `${h}:${m} ${dd}`
}

const formatDate = (time) => {
  const td = new Date(time);
  return `${days[td.getDay()]} ${formatTime(td)}`
};

const fetchData = () => {
  // Events
  $.get({ url: eventsRoute, crossDomain: true }, ({ events }) => {
    // Remove existing events from DOM
    $('#cur-events-cont').empty();
    $('#upcoming-events-cont').empty();

    const time = Math.floor(new Date().getTime() / 1000);

    if (events === null) { return; }
    // Sort events chronologically
    events.sort((a, b) => a.startTime - b.startTime);

    // Get relevent events
    const cur = [];
    const upcoming = [];
    events.forEach((event) => {
      if (event.startTime <= time && event.endTime > time) {
        cur.push(event);
      } else if (event.startTime > time && upcoming.length < 11) {
        upcoming.push(event);
      }
    });

    // Add events to dom
    cur.forEach((event) => {
      if (!event.locations || event.locations.length === 0) {
        return;
      }

      const loc = event.locations[0].description;
      $('#cur-events-cont').append(`
        <div class="event">
          <p class="name">${event.name}</p>
          <p class="location">${loc}</p>
        </div>
      `);
    });
    upcoming.forEach((event) => {
      if (!event.locations || event.locations.length === 0) {
        return;
      }

      const loc = event.locations[0].description;
      $('#upcoming-events-cont').append(`
        <div class="event">
          <p class="name">${event.name}</p>
          <p class="location">${loc} | ${formatDate(event.startTime * 1000)}</p>
        </div>
      `);
    });
  });

  $.get({ url: notificationsRoute, crossDomain: true }, ({ notifications }) => {
    if (notifications === null || notifications === undefined) { return; }
    $('#announcements-cont').empty();
    notifications.forEach(notification => {
      $('#announcements-cont').append(`
        <div class="announcement">
          <p class="name">${notification.title}</p>
        </div>
      `);
    });
  });
};

export default fetchData;

