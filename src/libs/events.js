import { i18n } from "boot/i18n";
import { date } from 'quasar'

const TEMPLATES = {
  default: {
    icon: 'event_note',
    bgcolor: 'gray',
  },
  swimming: {
    icon: 'pool',
    bgcolor: 'blue',
  },
  children: {
    icon: 'child_care',
    bgcolor: 'light-green',
  },
  training: {
    icon: 'fitness_center',
    bgcolor: 'teal',
  },
  aerobics: {
    icon: 'directions_run',
    bgcolor: 'purple',
  },
  retiree: {
    icon: 'emoji_people',
    bgcolor: 'indigo',
  },
  family: {
    icon: 'family_restroom',
    bgcolor: 'deep-orange',
  },
  championship: {
    icon: 'emoji_events',
    bgcolor: 'amber',
  },
  cleaning: {
    icon: 'cleaning_services',
    bgcolor: 'blue-grey',
  },
  sanitary: {
    icon: 'cleaning_services',
    bgcolor: 'blue-grey',
  },
};

const ALLOWED_KEYS = ["id", "type", "title", "description", "note", "datestamp", "duration", "visitors"]

const addContent = (key, item) => {
  if (!item[key]) {
    item[key] = i18n.t(`events.${item.type}.${key}`)
  }
}

export function fillEvent(event) {
  const duration = event.duration || 60
  const startTime = new Date(event.datestamp).getTime();
  const endTime = startTime + (event.duration * 60000);

  const result = {
    ...event,
    startTime,
    endTime,
    duration,
    date: date.formatDate(event.datestamp, "YYYY-MM-DD"),
    time: date.formatDate(event.datestamp, "HH:mm"),
    visitors: event.visitors || [],
  }

  const template = TEMPLATES[event.type]

  if (template) {
    result.icon = template.icon;
    result.bgcolor = template.bgcolor;
  }

  addContent("title", result);
  addContent("details", result);

  return result
}

export function getCounterColor(num) {
  switch (true) {
    case num < 6:
      return "green-8";
    case num >= 6 && num < 12:
      return "blue-8";
    case num >= 12 && num < 18:
      return "orange-8";
    case num >= 18 && num < 24:
      return "deep-orange-8";
    case num >= 24:
      return "negative";
    default:
      return "blue-grey-8";
  }
}

export function getEventTypes() {
  return Object.keys(TEMPLATES);
}

export function resolveEvent(event) {
  const result = {};

  ALLOWED_KEYS.forEach((key) => {
    let value = event[key];

    if (!value) {
      return;
    }

    if (value.length === 0) {
      if (Array.isArray(value)) {
        value = []
      } else {
        value = null
      }
    }

    result[key] = value;
  })

  return result;
}
