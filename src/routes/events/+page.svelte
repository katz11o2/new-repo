
<script>
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  const pastEvents = [
    { date: '2025-01-28', title: 'Inauguration of Cambrian Incubation Center' },
    { date: '2025-01-10', title: 'One Day Design Awareness Program' },
    { date: '2025-02-14', title: 'Problem Statement & RCA Review' },
    { date: '2025-03-12', title: 'Mentoring on Data collection & Analysis' },
    { date: '2025-04-08', title: 'Data process & review and Drone Tech Mentoring' }
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
      const date = new Date(year, month, day);
      week.push(date);
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
    if (date.getDay() === 5) {
      selectedEvent = 'Root Cause Analysis';
    } else {
      selectedEvent = '';
    }
  }

  $: calendarPairs = [0, 1].map(offset => {
    const newMonth = currentMonth + offset;
    const monthIndex = newMonth % 12;
    const yearOffset = Math.floor(newMonth / 12);
    const year = currentYear + yearOffset;
    const calendar = generateCalendar(monthIndex, year);

    return {
      monthIndex,
      year,
      calendar
    };
  });
</script>

<style>
  .calendar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 1rem;
    background: linear-gradient(to right, #e0f2fe, #f8fafc);
    font-family: 'Poppins', sans-serif;
  }

  .month-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 720px;
    width: 100%;
    margin-bottom: 1.5rem;
    position: relative;
  }

  .rca-label {
    position: absolute;
    top: -10px;
    right: 0;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.9rem;
    color: #1d4ed8;
  }

  .rca-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #2563eb;
  }

  .arrows {
    font-size: 2rem;
    cursor: pointer;
    color: #1d4ed8;
    user-select: none;
  }

  .calendars {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }

  .calendar {
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid #dbeafe;
    border-radius: 16px;
    padding: 1.5rem;
    width: 320px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(8px);
    animation: fadeInUp 0.6s ease;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .calendar h3 {
    text-align: center;
    color: #1e3a8a;
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }

  .weekdays, .week {
    display: flex;
    justify-content: space-between;
  }

  .weekdays div {
    font-weight: 600;
    font-size: 0.85rem;
    color: #475569;
    width: 36px;
    text-align: center;
  }

  .day {
    width: 36px;
    height: 36px;
    margin: 2px;
    border-radius: 8px;
    text-align: center;
    line-height: 36px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .day:hover {
    background: #dbeafe;
  }

  .blue-day {
    background-color: #2563eb;
    color: white;
  }

  .event-box {
    margin-top: 2rem;
    background: white;
    border: 1px solid #dbeafe;
    padding: 1.25rem;
    border-radius: 12px;
    width: 100%;
    max-width: 720px;
    text-align: center;
    color: #0f172a;
    font-weight: 500;
    font-size: 1rem;
  }

  .upcoming {
    margin-top: 3rem;
    text-align: left;
    max-width: 720px;
    width: 100%;
    background: white;
    padding: 1.5rem;
    border-radius: 14px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  }

  .upcoming h3 {
    margin-bottom: 1rem;
    color: #1d4ed8;
    font-size: 1.2rem;
  }

  ul {
    padding-left: 1.2rem;
  }

  li {
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    color: #334155;
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
    <div class="rca-label"><div class="rca-dot"></div> Root Cause Analysis</div>
  </div>

  <div class="calendars">
    {#each calendarPairs as { monthIndex, year, calendar }}
      <div class="calendar">
        <h3>{getMonthName(monthIndex)} {year}</h3>
        <div class="weekdays">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>
        {#each calendar as week}
          <div class="week">
            {#each week as day}
              <div
                class="day {day && day.getDay() === 5 ? 'blue-day' : ''}"
                on:click={() => handleClick(day)}>
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
    <h3>Past Events</h3>
    <ul>
      {#each pastEvents as event}
        <li><strong>{event.date}:</strong> {event.title}</li>
      {/each}
    </ul>
  </div>
</div>
