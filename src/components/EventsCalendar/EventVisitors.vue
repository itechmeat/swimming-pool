<template>
  <q-card class="event-visitors">
    <q-list bordered>
      <event-visitors-item
        v-for="(visitor, index) in value"
        :key="index"
        :id="visitor"
      />
    </q-list>
  </q-card>
</template>

<script>
import EventVisitorsItem from "src/components/EventsCalendar/EventVisitorsItem"

export default {
  name: "EventVisitors",

  components: {
    EventVisitorsItem,
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
$block: ".event-visitors";

#{$block} {
  width: 400px;
}
</style>
