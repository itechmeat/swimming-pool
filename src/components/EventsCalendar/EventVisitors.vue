<template>
  <q-card class="event-visitors">
    <q-list v-if="evt" bordered>
      <event-visitors-item
        v-for="(visitor, index) in evt.visitors"
        :key="index"
        :id="visitor"
        :can-delete="canDelete"
        @delete="removeVisitor"
      />
    </q-list>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_USER, IS_ADMIN } from "src/store/modules/user/types";
import { GET_EVENT_BY_ID } from "src/store/modules/events/types";
import EventVisitorsItem from "src/components/EventsCalendar/EventVisitorsItem"
import {fillEvent} from "src/libs/events";

export default {
  name: "EventVisitors",

  components: {
    EventVisitorsItem,
  },

  props: {
    eventId: {
      type: String,
      default: () => undefined,
    }
  },

  computed: {
    ...mapGetters("user", {
      user: GET_USER,
      isAdmin: IS_ADMIN,
    }),

    ...mapGetters("events", {
      getEventById: GET_EVENT_BY_ID,
    }),

    evt() {
      const event = this.getEventById(this.eventId);
      if (!event) {
        return;
      }
      return fillEvent(event);
    },

    isLate() {
      const date = new Date();
      return (this.evt.endTime < date.getTime());
    },

    canDelete() {
      console.log(this.user, this.isLate)
      if (!this.user || this.isLate) {
        return;
      }
      return this.user.username === this.evt.author || this.isAdmin;
    },
  },

  watch: {
    evt: {
      deep: true,
      handler(val) {
        if (!val || !val.visitors > 0) {
          return;
        }

        this.$emit("close");
      }
    }
  },

  methods: {
    ...mapActions("events", ["updateEvent"]),

    removeVisitor(id) {
      if (!this.eventId) {
        return;
      }

      const visitors = [...this.evt.visitors];

      const index = visitors.findIndex((visitor) => visitor === id);

      if (index === -1) {
        return;
      }

      visitors.splice(index, 1)

      this.updateEvent({
        id: this.eventId,
        visitors,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
$block: ".event-visitors";

#{$block} {
  width: 400px;
}
</style>
