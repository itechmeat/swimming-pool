<template>
  <div class="calendar">
    <q-calendar
      ref="calendar"
      v-model="selectedDate"
      view="week"
      :locale="$i18n.locale"
      :disabled-before="yesterday"
      :disabled-after="nextMonth"
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
      <template #day-header="{ timestamp }">
        <div
          v-if="getReservedStatus(timestamp)"
          class="calendar__status text-primary"
        >
          <q-icon name="done_all" />
        </div>
      </template>

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

    <q-btn
      v-if="!isCurrentWeek"
      flat
      color="primary"
      class="calendar__today"
      :label="$t('common.today')"
      @click="backToday"
    />

    <q-dialog v-model="eventDialog">
      <event-card :id="visibleEventId" @close="eventDialog = false" @edit="showEventsForm" />
    </q-dialog>

    <q-dialog v-model="formDialog">
      <event-form v-model="editedEvent" @submit="submitEvent" />
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { IS_DAY_RESERVED } from "src/store/modules/events/types";
import { fillEvent } from "src/libs/events";
import CalendarBadge from "./Badge"
import EventCard from "src/components/EventsCalendar/EventCard"
import EventForm from "src/components/EventsCalendar/EventForm"
import { date } from "quasar";

const EMPTY_EVENT = {
  type: "swimming",
  title: null,
  description: null,
  note: null,
  datestamp: null,
  duration: 60,
  visitors: [],
}

export default {
  name: "EventsCalendar",

  components: {
    CalendarBadge,
    EventCard,
    EventForm,
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
      eventDialog: false,
      visibleEventId: null,
      formDialog: false,
      editedEvent: null,
    };
  },

  computed: {
    ...mapGetters("events", {
      isDayReserved: IS_DAY_RESERVED,
    }),

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

    today() {
      return date.formatDate(Date.now(), 'YYYY-MM-DD')
    },

    yesterday() {
      const yesterday = date.subtractFromDate(new Date(), { days: 1 });
      return date.formatDate(yesterday, 'YYYY-MM-DD');
    },

    nextMonth() {
      const month = date.addToDate(new Date(), { month: 1 });
      return date.formatDate(month, 'YYYY-MM-DD');
    },

    isCurrentWeek() {
      return !this.selectedDate || this.today === this.selectedDate;
    },
  },

  methods: {
    ...mapActions("events", ["createEvent", "updateEvent"]),

    getReservedStatus (timestamp) {
      return this.isDayReserved(timestamp.date);
    },

    handleTimeClick(info) {
      console.log('handleTimeClick', info);
    },

    calendarNext() {
      this.$refs.calendar.next();
    },

    calendarPrev() {
      this.$refs.calendar.prev();
    },

    backToday() {
      this.selectedDate = this.today;
    },

    showEventsForm(evt) {
      if (!evt) {
        const soon = date.addToDate(new Date(), { hours: 1 });
        this.editedEvent = {
          ...EMPTY_EVENT,
          datestamp: date.formatDate(soon, 'YYYY-MM-DD HH:mm'),
        };
      } else {
        this.editedEvent = { ...evt };
      }
      this.$nextTick(() => {
        this.formDialog = true;
      })
    },

    async submitEvent() {
      let response;

      if (!this.editedEvent.id) {
        response = await this.createEvent(this.editedEvent)
      } else {
        response = await this.updateEvent(this.editedEvent)
      }

      if (!response) {
        return;
      }

      this.editedEvent = null;
      this.formDialog = false;
      this.eventDialog = false;
    },

    selectEvent(eventId) {
      this.visibleEventId = eventId;
      this.$nextTick(() => {
        this.eventDialog = true;
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

<style lang="scss">
$block: ".calendar";

#{$block} {
  &__status {
    position: absolute;
    right: 6px;
    bottom: 12px;
    font-size: 16px;
    line-height: 1;
    text-align: right;
  }

  &__today {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.q-calendar-daily__head-day {
  position: relative;
}
</style>
