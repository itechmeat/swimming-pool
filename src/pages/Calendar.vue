<template>
  <div class="calendar">
    <div class="row justify-center items-center">
      <q-btn flat label="Prev" @click="calendarPrev" />
      <q-separator vertical />
      <q-btn flat label="Next" @click="calendarNext" />
    </div>
    <q-separator />

    <events-calendar
      ref="calendar"
      :events="events"
      @select="selectEvent"
    />

    <q-dialog v-model="dialog">
      <event-card :value="visibleEvent" />
    </q-dialog>
  </div>
</template>

<script>
import EVENTS from "src/assets/events";
import EventsCalendar from "src/components/EventsCalendar/Calendar"
import EventCard from "src/components/EventsCalendar/EventCard"

export default {
  name: "CalendarPage",

  components: {
    EventsCalendar,
    EventCard,
  },

  data () {
    return {
      events: EVENTS,
      dialog: false,
      visibleEvent: null,
    };
  },

  methods: {
    calendarNext () {
      this.$refs.calendar.calendarNext()
    },

    calendarPrev () {
      this.$refs.calendar.calendarPrev()
    },

    selectEvent(ev) {
      this.visibleEvent = ev;
      this.$nextTick(() => {
        this.dialog = true;
      })
    },
  },
};
</script>
