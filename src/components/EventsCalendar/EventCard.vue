<template>
  <q-card class="event-card">
    <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

    <q-card-section>
      <q-btn
        fab
        color="primary"
        :label="value.visitors"
        class="event-card__counter"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 event-card__title">
          {{ value.title }}
        </div>
        <div class="col-auto text-grey text-caption event-card__visitors">
          Visitors
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div v-if="value.note" class="text-subtitle1">
        <time class="event-card__date">
          <q-icon name="event" />
          {{ eventDate }}
        </time>
        <time class="event-card__time">
          <q-icon name="schedule" />
          {{ eventTime }}
        </time>
      </div>
      <div v-if="value.note" class="text-caption text-grey">
        {{ value.note }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="between">
      <q-btn v-close-popup flat color="warning" label="Close" />
      <q-btn
        flat
        color="primary"
        label="Reserve"
        icon="event"
        :disabled="isLate"
        @click="reserve"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { date } from 'quasar'

export default {
  name: "EventCard",

  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isoDate() {
      if (!this.value) {
        return;
      }
      return new Date(this.value.date + ' ' + this.value.time);
    },

    eventDate() {
      return date.formatDate(this.isoDate, 'DD.MM.YYYY')
    },

    eventTime() {
      return date.formatDate(this.isoDate, 'HH:mm')
    },

    isLate() {
      const date = new Date();
      return this.value.endTime < date.getTime();
    }
  },

  methods: {
    reserve() {
      console.log('###')
    }
  },
};
</script>

<style lang="scss" scoped>
$block: ".event-card";

#{$block} {
  width: 300px;

  &__title {
    padding: 8px 10px 0 0;
    line-height: 1.25;
  }

  &__counter {
    position: absolute;
    top: 0;
    right: 12px;
    font-size: 24px;
    line-height: 1;
    pointer-events: none;
    transform: translateY(-50%);
  }

  &__visitors {
    width: 50px;
    padding: 14px 0 0;
    text-align: center;
  }

  &__date,
  &__time {
    display: inline-flex;
    align-items: center;

    .q-icon {
      margin-right: 4px;
    }
  }

  &__time {
    margin-left: 16px;
  }
}
</style>
