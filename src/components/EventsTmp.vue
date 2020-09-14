<template>
  <div class="block">
    <button @click="addEvent">Add</button>
    <button @click="generateEvents">Generate</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_EVENTS } from "src/store/modules/events/types";
import { v4 as uuidv4 } from "uuid";
import EVENTS from "src/assets/events";

export default {
  name: "EventsTmp",

  mounted() {
    this.fetchEvents();
  },

  computed: {
    ...mapGetters("events", {
      events: GET_EVENTS,
    }),
  },

  methods: {
    ...mapActions("events", ["fetchEvents", "createEvent"]),

    addEvent() {
      this.createEvent({
        type: "family",
        datestamp: new Date('2020-09-10 06:00'),
        duration: 120,
        visitors: [uuidv4()],
      })
    },

    generateEvents() {
      EVENTS.forEach((event, index) => {
        // if (index > 10) {
        //   return;
        // }
        const visitors = [];
        if (event.visitors && event.visitors > 0) {
          for (let i = 0; i < event.visitors; i++) {
            visitors.push(uuidv4());
          }
        }

        const datestamp = new Date(event.date + ' ' + event.time);

        const result = {
          ...event,
          datestamp,
          visitors,
        };

        delete result.date;
        delete result.time;

        console.log(result)

        this.createEvent(result)
      })
    }
  },
};
</script>
