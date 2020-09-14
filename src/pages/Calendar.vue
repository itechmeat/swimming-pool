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

    <q-inner-loading :showing="isLoading" />

    <q-dialog v-model="dialog">
      <event-card :value="visibleEvent" />
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_EVENTS, GET_LOADING } from "src/store/modules/events/types";
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
      dialog: false,
      visibleEvent: null,
    };
  },

  computed: {
    ...mapGetters("events", {
      isLoading: GET_LOADING,
      events: GET_EVENTS,
    }),
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

<style lang="scss" scoped>
$block: ".calendar";

#{$block} {
  position: relative;
}
</style>
