import { date } from "quasar";
import { randomInteger } from "src/libs/utils";

const week = [
  {
    type: "training",
    days: [
      {
        events: [
          { time: "06:00", duration: 120, visitors: 26 },
          { time: "15:30", duration: 90, visitors: 34 },
          { time: "14:00", duration: 90, visitors: 34 },
          { time: "17:00", duration: 90, visitors: 34 },
        ],
      },
      {
        number: 1,
        events: [
          { time: "06:00", duration: 120, visitors: 26 },
          { time: "15:30", duration: 90, visitors: 34 },
          { time: "14:00", duration: 90, visitors: 34 },
          { time: "17:00", duration: 90, visitors: 34 },
        ],
      },
      {
        events: [
          { time: "06:00", duration: 120, visitors: 26 },
          { time: "15:30", duration: 90, visitors: 34 },
          { time: "14:00", duration: 90, visitors: 34 },
          { time: "17:00", duration: 90, visitors: 34 },
        ],
      },
      {
        events: [
          { time: "06:00", duration: 120, visitors: 26 },
          { time: "15:30", duration: 90, visitors: 34 },
          { time: "14:00", duration: 90, visitors: 34 },
          { time: "17:00", duration: 90, visitors: 34 },
        ],
      },
      {
        events: [
          { time: "06:00", duration: 120, visitors: 26 },
          { time: "15:30", duration: 90, visitors: 34 },
          { time: "14:00", duration: 90, visitors: 34 },
          { time: "17:00", duration: 90, visitors: 34 },
        ],
      },
      {
        events: [
          { time: "15:00", duration: 120, visitors: 34 },
        ],
      },
      {
        events: [
        ],
      },
    ],
  },
  {
    type: "swimming",
    days: [
      {
        events: [
          { time: "08:00", visitors: 10 },
          { time: "09:00", visitors: 4 },
          { time: "11:00", visitors: 5 },
          { time: "12:00", visitors: 0 },
          { time: "19:00", visitors: 14 },
          { time: "20:00", visitors: 6, note: "2 дорожки" },
          { time: "21:00", visitors: 12 },
        ],
      },
      {
        number: 1,
        events: [
          { time: "08:00", visitors: 2 },
          { time: "09:00", visitors: 16 },
          { time: "10:00", visitors: 0 },
          { time: "11:00", visitors: 7, note: "2 дорожки" },
          { time: "12:00", visitors: 11 },
          { time: "19:00", visitors: 9 },
          { time: "21:00", visitors: 13 },
        ],
      },
      {
        events: [
          { time: "08:00", visitors: 1 },
          { time: "09:00", visitors: 0 },
          { time: "11:00", visitors: 0 },
          { time: "12:00", visitors: 8 },
          { time: "19:00", visitors: 4 },
          { time: "20:00", visitors: 6, note: "2 дорожки" },
          { time: "21:00", visitors: 14 },
        ],
      },
      {
        events: [
          { time: "08:00", visitors: 16 },
          { time: "09:00", visitors: 0 },
          { time: "10:00", visitors: 0 },
          { time: "11:00", visitors: 1, note: "2 дорожки" },
          { time: "12:00", visitors: 0 },
          { time: "19:00", visitors: 15 },
          { time: "21:00", visitors: 3 },
        ],
      },
      {
        events: [
          { time: "08:00", visitors: 0 },
          { time: "09:00", visitors: 10 },
          { time: "12:00", visitors: 18 },
          { time: "19:00", visitors: 0 },
          { time: "20:00", visitors: 21, note: "2 дорожки" },
          { time: "21:00", visitors: 0 },
        ],
      },
      {
        events: [
          { time: "09:00", visitors: 0 },
          { time: "18:00", visitors: 5 },
          { time: "19:00", visitors: 0 },
          { time: "20:00", visitors: 0 },
          { time: "21:00", visitors: 0 },
        ],
      },
      {
        events: [
          { time: "09:00", visitors: 10 },
          { time: "15:00", visitors: 14 },
          { time: "16:00", visitors: 10 },
          { time: "18:00", visitors: 0 },
          { time: "20:00", visitors: 3 },
          { time: "21:00", visitors: 0 },
        ],
      },
    ],
  },
  {
    type: "aerobics",
    days: [
      {
        events: [
          { time: "20:00", visitors: 8, note: "2 дорожки" },
        ],
      },
      {
        number: 1,
        events: [
          { time: "11:00", visitors: 3, note: "2 дорожки" },
        ],
      },
      {
        events: [
          { time: "20:00", visitors: 10, note: "2 дорожки" },
        ],
      },
      {
        events: [
          { time: "11:00", visitors: 14, note: "2 дорожки" },
        ],
      },
      {},
      {},
      {},
    ],
  },
  {
    type: "retiree",
    days: [
      {},
      {},
      {
        events: [
          { time: "10:00", visitors: 18 },
        ],
      },
      {},
      {
        events: [
          { time: "10:00", visitors: 16 },
        ],
      },
      {},
      {},
    ],
  },
  {
    type: "children",
    days: [
      {
        events: [
          { time: "09:00", visitors: 1 },
          { time: "10:00", visitors: 6 },
          { time: "12:00", visitors: 4, duration: 240 },
        ],
      },
      {
        number: 1,
        events: [
          { time: "09:00", visitors: 5 },
        ],
      },
      {
        events: [
          { time: "09:00", visitors: 10 },
          { time: "11:00", visitors: 8 },
          { time: "12:00", visitors: 9 },
        ],
      },
      {
        events: [
          { time: "09:00", visitors: 7 },
        ],
      },
      {
        events: [
          { time: "09:00", visitors: 8 },
          { time: "11:00", visitors: 8 },
          { time: "12:00", visitors: 0 },
        ],
      },
      {
        events: [
          { time: "10:00", visitors: 2 },
        ],
      },
      {},
    ],
  },
  {
    type: "family",
    days: [
      {},
      {},
      {},
      {},
      {},
      {},
      {
        events: [
          { time: "13:30", visitors: 29, duration: 180 },
        ],
      },
    ],
  },
];

const sanitary = { time: "06:00", duration: 960 }

const findLastDateOfMonth = (monday) => {
  const weekDays = week[0].days.map((day, index) => {
    const weekDay = date.addToDate(monday, { days: index });
    return Number(date.formatDate(weekDay, "DD"));
  })

  const lastDayNumber = Math.max.apply(null, weekDays);
  const lastDate = monday.substring(0, monday.length-2) + lastDayNumber;
  const nextDay = date.addToDate(lastDate, { days: 1 });
  const nextDayNumber = Number(date.formatDate(nextDay, "DD"));

  if (nextDayNumber !== 1) {
    return false;
  }
  return lastDate;
}

export default function buildEvents(monday, profiles) {
  const lastDate = findLastDateOfMonth(monday);

  const eventsList = week.map((eventTypes) => {
    return eventTypes.days.map((day, indexDay) => {
      const newDate = date.addToDate(monday, { days: indexDay })
      const formattedDate = date.formatDate(newDate, "YYYY-MM-DD")

      if (!day.events || day.events.length === 0 || formattedDate === lastDate) {
        return;
      }

      return day.events.map((evt) => {
        let visitors = [];

        if (profiles && profiles.length > 0) {
          visitors = getRandomVisitors(evt.visitors, profiles);
        }

        return {
          type: eventTypes.type,
          datestamp: formattedDate + " " + evt.time,
          duration: evt.duration || 60,
          test: evt.visitors,
          visitors,
        };
      }).filter(Boolean);
    }).filter(Boolean);
  }).filter(Boolean);

  const result = eventsList.flat(2);

  if (lastDate) {
    result.push({
      type: "sanitary",
      datestamp: lastDate + " " + sanitary.time,
      duration: sanitary.duration,
      visitors: [],
    });
  }

  return result;
}

const getRandomVisitors = (n, profiles) => {
  const result = [];

  for (; result.length < n;) {
    const profile = profiles[randomInteger(0, profiles.length)];
    if (profile) {
      result.push(profile.id);
    }
  }

  return result;
}
