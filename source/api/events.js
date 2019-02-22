import $ from 'jquery';

const eventsRoute = `${process.env.API_ENDPOINT}/event/`;
const notificationsRoute = `${process.env.API_ENDPOINT}/notifications/public/`;

const fetchData = () => {
  // Events
  $.get(eventsRoute, ({ events }) => {
    // Remove existing events from DOM
    $('#cur-events-cont').empty();
    $('#upcoming-events-cont').empty();

    const time = new Date().getTime();

    // Sort events chronologically
    events.sort((a, b) => a.startTime - b.startTime);

    // Get relevent events
    const cur = [];
    const upcoming = [];
    events.forEach((event) => {
      if (event.startTime <= time && event.endTime > time) {
        cur.push(event);
      } else if (event.startTime > time && upcoming.length < 4) {
        upcoming.push(event);
      }
    });

    // Add events to dom
    cur.forEach((event) => {
      const loc = event.locations[0].description;
      $('#cur-events-cont').append(`
        <div class="event">
          <p class="name">${event.name}</p>
          <p class="location">${loc}</p>
        </div>
      `);
    });
    upcoming.forEach((event) => {
      const loc = event.locations[0].description;
      $('#upcoming-events-cont').append(`
        <div class="event">
          <p class="name">${event.name}</p>
          <p class="location">${loc}</p>
        </div>
      `);
    });
  });

  $.get(notificationsRoute, ({ notifications }) => {
    if (notifications[0]) {
      $('#announcements-cont').empty();
      $('#announcements-cont').append(`
        <div class="announcement">
          <p class="name">${notifications[0].title}</p>
        </div>
      `);
    }
  });
};

export default fetchData;

