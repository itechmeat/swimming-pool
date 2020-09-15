<template>
  <div class="calendar-page">
    <div class="row justify-center items-center">
      <q-btn flat label="Prev" @click="calendarPrev" />
      <q-separator vertical />
      <q-btn flat label="Next" @click="calendarNext" />
    </div>
    <q-separator />

    <events-calendar ref="calendar" :events="events" />

    <q-inner-loading :showing="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_EVENTS, GET_LOADING } from "src/store/modules/events/types";
import EventsCalendar from "src/components/EventsCalendar/Calendar"

export default {
  name: "CalendarPage",

  components: {
    EventsCalendar,
  },

  data () {
    return {
      dialog: false,
      visibleEventId: null,
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
  },
};
</script>

<style lang="scss" scoped>
$block: ".calendar-page";

#{$block} {
  position: relative;
}
</style>
