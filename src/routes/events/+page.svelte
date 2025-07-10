<script>
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  const upcomingEvents = [
    { date: '2025-07-12', title: 'Ideathon Launch' },
    { date: '2025-07-15', title: 'Guest Lecture on AI' },
    { date: '2025-07-19', title: 'Startup Networking' },
    { date: '2025-07-22', title: 'Tech Bootcamp' },
    { date: '2025-07-25', title: 'Pitch Day' },
  ];

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  function generateCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(month, year);
    let calendar = [];
    let week = [];

    for (let i = 0; i < firstDay; i++) week.push(null);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(new Date(year, month, day));
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length) calendar.push(week);
    return calendar;
  }

  function getMonthName(monthIndex) {
    return new Date(2000, monthIndex, 1).toLocaleString('default', { month: 'long' });
  }

  let selectedEvent = '';

  function handleClick(date) {
    if (!date) return;
    const day = date.getDay();
    if (day === 1) selectedEvent = 'Masterclass on Root Cause Analysis';
    else if (day === 5) selectedEvent = 'Seminar on Startups';
    else selectedEvent = '';
  }

  $: calendarPairs = [0, 1].map(offset => {
    const newMonth = currentMonth + offset;
    const monthIndex = newMonth % 12;
    const year = currentYear + Math.floor(newMonth / 12);
    return { offset, monthIndex, year };
  });
</script>

<style>
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #f0f4f8;
  }

  .calendar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
  }

  .month-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 700px;
    width: 100%;
    margin-bottom: 20px;
  }

  .arrows {
    font-size: 1.5rem;
    cursor: pointer;
    user-select: none;
    color: #1e40af;
  }

  .calendars {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
  }

  .calendar {
    background: white;
    border: 1px solid #e0e7ff;
    border-radius: 12px;
    padding: 20px;
    width: 320px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    animation: fadeInUp 0.6s ease;
  }

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .calendar h3 {
    text-align: center;
    color: #1d4ed8;
    margin-bottom: 10px;
  }

  .weekdays, .week {
    display: flex;
    justify-content: space-between;
  }

  .weekdays div {
    font-weight: bold;
    color: #475569;
    width: 36px;
    text-align: center;
  }

  .day {
    width: 36px;
    height: 36px;
    margin: 2px;
    border-radius: 6px;
    text-align: center;
    line-height: 36px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .day:hover {
    background: #e0f2fe;
  }

  .blue-day {
    background-color: #2563eb;
    color: white;
  }

  .event-box {
    margin-top: 30px;
    text-align: center;
    padding: 20px;
    background: #f8fafc;
    border-radius: 10px;
    width: 100%;
    max-width: 700px;
    border: 1px solid #dbeafe;
  }

  .upcoming {
    margin-top: 40px;
    text-align: left;
    max-width: 700px;
    width: 100%;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  ul {
    padding-left: 20px;
  }

  li {
    margin-bottom: 10px;
    font-size: 0.95rem;
  }

  @media (max-width: 700px) {
    .calendars {
      flex-direction: column;
      align-items: center;
    }
  }
</style>

<div class="calendar-container">
  <div class="month-header">
    <div class="arrows" on:click={() => currentMonth--}>&larr;</div>
    <h2>{getMonthName(currentMonth)} & {getMonthName((currentMonth + 1) % 12)} {currentYear}</h2>
    <div class="arrows" on:click={() => currentMonth++}>&rarr;</div>
  </div>

  <div class="calendars">
    {#each calendarPairs as { offset, monthIndex, year } (offset)}
      <div class="calendar">
        <h3>{getMonthName(monthIndex)} {year}</h3>
        <div class="weekdays">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>
        {#each generateCalendar(monthIndex, year) as week}
          <div class="week">
            {#each week as day}
              <div
                class="day {day && (day.getDay() === 5 ? 'blue-day' : '')}"
                on:click={() => handleClick(day)}
              >
                {day ? day.getDate() : ''}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  </div>

  {#if selectedEvent}
    <div class="event-box">
      <strong>Event:</strong> {selectedEvent}
    </div>
  {/if}

  <div class="upcoming">
    <h3>Upcoming Events</h3>
    <ul>
      {#each upcomingEvents as event}
        <li><strong>{event.date}:</strong> {event.title}</li>
      {/each}
    </ul>
  </div>
</div>
