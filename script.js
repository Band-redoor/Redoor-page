const monthTitle = document.getElementById("monthTitle");
const monthYear = document.getElementById("monthYear");
const calendarGrid = document.getElementById("calendarGrid");
const upcomingList = document.getElementById("upcomingList");
const eventPanel = document.getElementById("eventPanel");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const monthControl = document.querySelector(".month-control");

const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let selectedDate = null;

const monthNames = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatDateKey(year, month, date) {
  return `${year}-${pad(month + 1)}-${pad(date)}`;
}

function getDisplayDate(event, year = currentYear) {
  return event.yearly ? `${year}-${event.date.slice(5)}` : event.date;
}

function getEventTitle(event, displayDate = event.displayDate || event.date) {
  if (event.type === "ANNIVERSARY" && Number.isInteger(event.startYear)) {
    const displayYear = Number(displayDate.slice(0, 4));
    const anniversaryYear = displayYear - event.startYear;
    return `${event.title} ${anniversaryYear}주년`;
  }

  return event.title;
}

function getEventsByDate(dateKey) {
  return REDOOR_EVENTS
    .filter(event => {
      if (event.yearly) {
        return event.date.slice(5) === dateKey.slice(5);
      }
      return event.date === dateKey;
    })
    .map(event => ({
      ...event,
      displayDate: event.yearly ? dateKey : event.date
    }));
}

function formatUpcomingDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  const month = monthNames[date.getMonth()].slice(0, 3);
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()];
  return `${month} ${date.getDate()} ${weekday}`;
}

function isUrl(value) {
  return /^https?:\/\//i.test(value || "");
}

function ticketHtml(event) {
  const ticketLinks = Array.isArray(event.ticketLinks)
    ? event.ticketLinks.filter(link => link && link.name && link.url)
    : [];

  const ticketText = event.ticket || "";

  if (ticketLinks.length === 0 && !ticketText) return "";

  const linkedTickets = ticketLinks
    .map(link => `
      <a class="ticket-link" href="${link.url}" target="_blank" rel="noopener">
        ${link.name} ↗
      </a>
    `)
    .join('<span class="ticket-separator"> / </span>');

  const normalizedTicketText = ticketText.replace(/,\s*/g, " / ");
  const plainTicketText = normalizedTicketText
    ? `<span class="ticket-text">${normalizedTicketText}</span>`
    : "";

  const separator =
    linkedTickets && plainTicketText
      ? '<span class="ticket-separator"> / </span>'
      : "";

  return `
    <div class="detail-row">
      <div class="detail-label">TICKET</div>
      <div class="detail-value ticket-list">
        ${linkedTickets}${separator}${plainTicketText}
      </div>
    </div>
  `;
}

function optionalDetailRow(label, value) {
  if (!value) return "";
  return `
    <div class="detail-row">
      <div class="detail-label">${label}</div>
      <div class="detail-value">${value}</div>
    </div>
  `;
}

function renderCalendar() {
  monthYear.textContent = `${currentYear}. ${pad(currentMonth + 1)}`;
  monthTitle.textContent = monthNames[currentMonth];
  calendarGrid.innerHTML = "";

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const previousMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();
  const totalCells = Math.ceil((firstDay + lastDate) / 7) * 7;
  const todayKey = formatDateKey(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  for (let index = 0; index < totalCells; index += 1) {
    let cellYear = currentYear;
    let cellMonth = currentMonth;
    let cellDate;
    let otherMonth = false;

    if (index < firstDay) {
      cellDate = previousMonthLastDate - firstDay + index + 1;
      cellMonth -= 1;
      otherMonth = true;
      if (cellMonth < 0) {
        cellMonth = 11;
        cellYear -= 1;
      }
    } else if (index >= firstDay + lastDate) {
      cellDate = index - firstDay - lastDate + 1;
      cellMonth += 1;
      otherMonth = true;
      if (cellMonth > 11) {
        cellMonth = 0;
        cellYear += 1;
      }
    } else {
      cellDate = index - firstDay + 1;
    }

    const dateKey = formatDateKey(cellYear, cellMonth, cellDate);
    const events = otherMonth ? [] : getEventsByDate(dateKey);

    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "date-cell";
    cell.setAttribute("aria-label", dateKey);

    if (otherMonth) cell.classList.add("other-month");
    if (events.length > 0) cell.classList.add("has-event");
    if (dateKey === todayKey) cell.classList.add("today");
    if (selectedDate === dateKey) cell.classList.add("selected");

    const number = document.createElement("span");
    number.className = "date-number";

    if (cellDate < 10) {
  number.classList.add("single-digit");
}
    
    number.textContent = cellDate;
    cell.appendChild(number);

    if (events.length > 0) {
      const titleList = document.createElement("span");
      titleList.className = "event-title-list";

      events.forEach(event => {
        const title = document.createElement("span");
        title.className = "event-title-mini";
        title.textContent = getEventTitle(event, event.displayDate);
        titleList.appendChild(title);
      });

      cell.appendChild(titleList);
      cell.addEventListener("click", () => selectEvents(events, dateKey));
    } else {
      cell.disabled = true;
    }

    calendarGrid.appendChild(cell);
  }

  renderUpcoming();
}

function renderUpcoming() {
  const monthPrefix = `${currentYear}-${pad(currentMonth + 1)}`;

  const monthEvents = REDOOR_EVENTS
    .filter(event => {
      if (event.yearly) {
        return event.date.slice(5, 7) === pad(currentMonth + 1);
      }
      return event.date.startsWith(monthPrefix);
    })
    .map(event => ({
      ...event,
      displayDate: getDisplayDate(event)
    }))
    .sort((a, b) => {
      const dateCompare = a.displayDate.localeCompare(b.displayDate);
      if (dateCompare !== 0) return dateCompare;
      return (a.time || "").localeCompare(b.time || "");
    });

  upcomingList.innerHTML = "";

  if (monthEvents.length === 0) {
    upcomingList.innerHTML =
      '<p class="upcoming-meta">등록된 일정이 없습니다.</p>';
    return;
  }

  monthEvents.forEach(event => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "upcoming-item";
    item.innerHTML = `
      <div class="upcoming-date">${formatUpcomingDate(event.displayDate)}</div>
      <div>
        <div class="upcoming-title">[${event.type}] ${getEventTitle(event, event.displayDate)}</div>
        <div class="upcoming-meta">${event.location || ""}</div>
      </div>
      <div class="upcoming-time">${event.time || ""} &nbsp;›</div>
    `;
    item.addEventListener("click", () =>
      selectEvents([event], event.displayDate)
    );
    upcomingList.appendChild(item);
  });
}

function getDdayLabel(dateString, type) {
  if (!dateString || !["LIVE", "FESTIVAL", "BIRTHDAY", "RELEASE"].includes(type)) return "";

  const [year, month, day] = dateString.split("-").map(Number);
  const now = new Date();
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const eventUtc = Date.UTC(year, month - 1, day);
  const difference = Math.round((eventUtc - todayUtc) / 86400000);

  if (difference === 0) return "D-DAY";
  if (difference > 0) return `D-${difference}`;
  return "종료";
}

function eventBlock(event) {
  const ddayLabel = getDdayLabel(event.displayDate || event.date, event.type);

  return `
    <section class="selected-event">
      <h2>${getEventTitle(event, event.displayDate)}</h2>
      <div class="event-badges">
        <span class="event-type">${event.type}</span>
        ${ddayLabel ? `<span class="event-dday">${ddayLabel}</span>` : ""}
      </div>

      <div class="detail-list">
        ${optionalDetailRow(
          "TIME",
          event.kstTime
            ? `현지 ${event.time} / 한국 ${event.kstTime}`
            : event.time
        )}
        ${optionalDetailRow("LOCATION", event.location)}
        ${optionalDetailRow("TICKET OPEN", event.ticketOpen)}
        ${ticketHtml(event)}
      </div>
    </section>
  `;
}

function selectEvents(events, clickedDate = events[0].displayDate || events[0].date) {
  selectedDate = clickedDate;
  renderCalendar();

  eventPanel.innerHTML = `
    <button class="close-button" type="button" aria-label="상세 닫기">×</button>
    <p class="event-date">${selectedDate.replaceAll("-", ".")}</p>
    ${events.map(event => eventBlock(event)).join("")}
  `;

  eventPanel.querySelectorAll(".selected-event").forEach((block, index) => {
    if (index > 0) {
      block.style.marginTop = "42px";
      block.style.paddingTop = "42px";
      block.style.borderTop = "1px solid var(--inner-line)";
    }
  });

  eventPanel
    .querySelector(".close-button")
    .addEventListener("click", resetPanel);

  if (window.innerWidth <= 980) {
    eventPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function resetPanel() {
  selectedDate = null;
  renderCalendar();
  eventPanel.innerHTML = `
    <div class="empty-state">
      <h2>일정이 있는 날짜를 선택해주세요.</h2>
      <p>일정이 있는 날짜를 누르면 시간, 장소, 예매 정보가 여기에 표시됩니다.</p>
    </div>
  `;
}

function moveMonth(amount) {
  currentMonth += amount;

  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear -= 1;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear += 1;
  }

  resetPanel();
}

prevMonthButton.addEventListener("click", () => moveMonth(-1));
nextMonthButton.addEventListener("click", () => moveMonth(1));

/* 로고 클릭 시 현재 달로 이동 */
const brandHome = document.querySelector(".brand");

if (brandHome) {
  brandHome.addEventListener("click", (event) => {
    event.preventDefault();

    const now = new Date();
    currentYear = now.getFullYear();
    currentMonth = now.getMonth();
    resetPanel();
  });
}

renderCalendar();
