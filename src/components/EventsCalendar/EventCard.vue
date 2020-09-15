<template>
  <q-card v-if="evt" class="event-card">
    <q-img :src="`/images/${evt.type}.jpg`" class="event-card__cover" />

    <q-card-section>
      <q-btn
        fab
        :color="counterColor"
        :label="evt.visitors.length"
        class="event-card__counter"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 event-card__title">
          {{ evt.title }}
        </div>
        <div class="col-auto text-grey text-caption event-card__visitors">
          {{ $t('common.visitors') }}
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">
        <time class="event-card__date">
          <q-icon name="event" />
          {{ evt.date }}
        </time>
        <time class="event-card__time">
          <q-icon name="schedule" />
          {{ evt.time }}
        </time>
      </div>
      <div v-if="isLate" class="text-subtitle1">
        <q-chip icon="done_all">{{ $t('common.finished') }}</q-chip>
      </div>
      <div v-if="evt.note" class="text-caption text-grey">
        {{ evt.note }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="between">
      <q-btn
        v-close-popup
        flat
        color="warning"
        :label="$t('common.close')"
      />

      <q-btn
        flat
        round
        color="negative"
        icon="delete"
        @click="remove"
      />

      <q-space />

      <q-btn
        flat
        color="primary"
        icon="event"
        :label="reserveButtonText"
        :disabled="isLate"
        @click="reserve"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { GET_USER, SET_AUTH_FORM_STATE } from "src/store/modules/user/types";
import { GET_EVENT_BY_ID } from "src/store/modules/events/types";
import { getCounterColor } from "src/libs/events";
import { fillEvent } from "src/libs/events";

export default {
  name: "EventCard",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters("user", {
      user: GET_USER,
    }),

    ...mapGetters("events", {
      getEventById: GET_EVENT_BY_ID,
    }),

    evt() {
      const event = this.getEventById(this.id);
      if (!event) {
        return;
      }
      return fillEvent(event);
    },

    isLate() {
      const date = new Date();
      return this.evt.endTime < date.getTime();
    },

    myIndex() {
      if (!this.user) {
        return;
      }
      return this.evt.visitors.findIndex((evt) => evt === this.user.username)
    },

    counterColor() {
      return getCounterColor(this.evt.visitors.length);
    },

    reserveButtonText() {
      if (this.myIndex === -1 || !this.user) {
        return this.$t('common.reserve')
      }
      return this.$t('common.revoke')
    },
  },

  methods: {
    ...mapActions("events", ["updateEvent", "deleteEvent"]),

    ...mapMutations("user", {
      setAuthFormState: SET_AUTH_FORM_STATE,
    }),

    reserve() {
      if (!this.user) {
        this.setAuthFormState(true);
        return;
      }

      const visitors = [...this.evt.visitors];

      if (this.myIndex !== -1) {
        visitors.splice(this.myIndex, 1)
      } else {
        visitors.push(this.user.username)
      }

      this.updateEvent({
        id: this.evt.id,
        visitors,
      });
    },

    remove() {
      this.deleteEvent({ id: this.evt.id });
    }
  },
};
</script>

<style lang="scss" scoped>
$block: ".event-card";

#{$block} {
  width: 300px;

  &__cover {
    height: 140px;
  }

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
