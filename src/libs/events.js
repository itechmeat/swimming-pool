import { i18n } from "boot/i18n";

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

const addContent = (key, item) => {
  if (!item[key]) {
    item[key] = i18n.t(`events.${item.type}.${key}`)
  }
}

export function fillEvent(event) {
  const result = {
    ...event,
    duration: event.duration || 60,
    visitors: event.visitors || 0,
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
