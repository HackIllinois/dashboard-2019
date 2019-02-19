import $ from 'jquery';

import './styles/reset.css';
import './styles/normalize.css';
import './styles/skeleton.css';
import './styles/dashboard.scss';

$(document).ready(() => {
  const x = 33 * 20;
  console.log('doc ready');
  console.log(`x is ${x}`);

  // Events
  $.get('/api/event/', ({ events }) => {
    const time = new Date().getTime();

    // Sort events chronologically
    events.sort((a, b) => a.startTime - b.startTime);

    // Get relevent events
    const cur = [];
    const upcoming = [];
    events.forEach((event) => {
      if (event.startTime <= time && event.endTime > time) {
        cur.push(event);
      } else if (event.startTime > time) {
        upcoming.push(event);
      }
    });

    // Add events to dom
    cur.forEach((event) => {
      const loc = event.locationDescription;
      $('#cur-events-cont').append(`
        <div class="event">
          <p class="name">${event.name}</p>
          <p class="location">${loc}</p>
        </div>
      `);
    });
    upcoming.forEach((event) => {
      const loc = event.locationDescription;
      $('#upcoming-events-cont').append(`
        <div class="event">
          <p class="name">${event.name}</p>
          <p class="location">${loc}</p>
        </div>
      `);
    });
  });

  $.get('/api/notifications/all', ({ notifications }) => {
    notifications.forEach((el) => {
      $('#announcements-cont').append(`
        <div class="event">
          <p class="name">${notification.title}</p>
        </div>
      `);
    });
  });
});
