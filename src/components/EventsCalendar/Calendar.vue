<template>
  <div class="calendar">
    <q-calendar
      ref="calendar"
      v-model="selectedDate"
      view="week"
      :locale="$i18n.locale"
      disabled-before="2020-09-10"
      :weekdays="[1,2,3,4,5,6,0]"
      enable-outside-days
      :hour24-format="isHour24Format"
      :shortIntervalLabel="isShortIntervalLabel"
      animated
      :intervalStart="11"
      :intervalMinutes="30"
      :intervalHeight="24"
      :intervalCount="34"
      transition-prev="slide-right"
      transition-next="slide-left"
      bordered
      @click:time.self="handleTimeClick"
    >
      <template #day-body="{ timestamp, timeStartPos, timeDurationHeight }">
        <template v-for="(event, index) in getEvents(timestamp.date)">
          <calendar-badge
            v-if="event.time"
            :key="index"
            :id="event.id"
            :side="event.side"
            :time-start-pos="timeStartPos"
            :time-duration-height="timeDurationHeight"
            @select="selectEvent"
          />
        </template>
      </template>
    </q-calendar>

    <q-dialog v-model="dialog">
      <event-card :id="visibleEventId" />
    </q-dialog>
  </div>
</template>

<script>
import { fillEvent } from "src/libs/events";
import CalendarBadge from "./Badge"
import EventCard from "src/components/EventsCalendar/EventCard"

export default {
  name: "EventsCalendar",

  components: {
    CalendarBadge,
    EventCard,
  },

  props: {
    events: {
      type: Array,
      required: true,
    }
  },

  data() {
    return {
      date: '',
      selectedDate: '',
      dialog: false,
      visibleEventId: null,
    };
  },

  computed: {
    formattedEvents() {
      return this.events.map((event) => {
        return fillEvent(event)
      })
    },

    isHour24Format() {
      const locales = ['ru'];
      return locales.includes(this.$i18n.locale);
    },

    isShortIntervalLabel() {
      const locales = ['en'];
      return locales.includes(this.$i18n.locale);
    },
  },

  methods: {
    handleTimeClick(info) {
      console.log('handleTimeClick', info)
    },

    calendarNext () {
      this.$refs.calendar.next()
    },

    calendarPrev () {
      this.$refs.calendar.prev()
    },

    selectEvent(eventId) {
      this.visibleEventId = eventId;
      this.$nextTick(() => {
        this.dialog = true;
      })
    },

    getEvents(dt) {
      const events = [];

      this.formattedEvents.forEach((event) => {
        if (event.date !== dt) {
          return;
        }

        const startTime = new Date(event.datestamp).getTime();
        const endTime = startTime + (event.duration * 60000);

        events.push({
          ...event,
          startTime,
          endTime,
        })
      })

      events.sort((a, b) => a.startTime - b.startTime)

      events.forEach((event, index) => {
        const list = [...events];
        list.splice(index, 1)

        if (list.some((item) => (
          (event.endTime > item.startTime &&
            event.endTime <= item.endTime &&
            event.startTime < item.startTime &&
            item.side !== "left") ||
          (item.side === "right" && event.startTime < item.endTime)
        ))) {
          event.side = "left";
          event.left = true;
          return;
        }
        if (list.some((item) => (
          event.startTime === item.startTime &&
          event.endTime >= item.endTime ||
          (event.startTime < item.endTime &&
            event.startTime >= item.startTime)
        ))) {
          event.side = "right";
          event.right = true;
        }
      })

      return events;
    },
  },
};
</script>
