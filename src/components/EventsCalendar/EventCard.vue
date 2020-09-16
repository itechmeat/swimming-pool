<template>
  <q-card v-if="evt" class="event-card">
    <q-img :src="`/images/${evt.type}.jpg`" class="event-card__cover" />

    <div v-if="canEdit" class="event-card__changes">
      <q-btn
        round
        size="sm"
        color="primary"
        icon="edit"
        @click="edit"
      />

      <q-btn
        round
        size="sm"
        color="negative"
        icon="delete"
        @click="remove"
      />
    </div>

    <q-card-section>
      <q-btn
        v-if="!isSanitary"
        fab
        :color="counterColor"
        :label="evt.visitors.length"
        class="event-card__counter"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 event-card__title">
          {{ evt.title }}
        </div>
        <div
          v-if="!isSanitary"
          class="col-auto text-grey text-caption event-card__visitors"
        >
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
          {{ evt.time }} - {{ endTime }}
        </time>
      </div>
      <div v-if="isLate" class="text-subtitle1">
        <q-chip icon="done_all">{{ $t('common.finished') }}</q-chip>
      </div>
      <div
        v-if="isReservedDay && !canChangeReserve && !isLate"
        class="text-warning"
      >
        {{ $t('messages.is_reserved_day') }}
      </div>
      <div v-if="isTooFar" class="text-warning">
        {{ $t('messages.is_too_far') }}
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

      <q-space />

      <q-btn
        v-if="!isSanitary"
        flat
        color="primary"
        icon="event"
        :label="reserveButtonText"
        :disabled="!canChangeReserve"
        @click="reserve"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { GET_USER, SET_AUTH_FORM_STATE, IS_ADMIN } from "src/store/modules/user/types";
import { GET_EVENT_BY_ID, IS_DAY_RESERVED } from "src/store/modules/events/types";
import { getCounterColor } from "src/libs/events";
import { fillEvent } from "src/libs/events";
import { date } from "quasar";

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
      isAdmin: IS_ADMIN,
    }),

    ...mapGetters("events", {
      getEventById: GET_EVENT_BY_ID,
      isDayReserved: IS_DAY_RESERVED,
    }),

    evt() {
      const event = this.getEventById(this.id);
      if (!event) {
        return;
      }
      return fillEvent(event);
    },

    canEdit() {
      if (!this.user) {
        return;
      }
      return this.user.username === this.evt.author || this.isAdmin;
    },

    endTime() {
      return date.formatDate(this.evt.endTime, "HH:mm");
    },

    isLate() {
      const date = new Date();
      return (this.evt.endTime < date.getTime());
    },

    isTooFar() {
      const farDate = date.addToDate(new Date(), { month: 1 }).getTime();
      return farDate < this.evt.startTime;
    },

    isSanitary() {
      return this.evt.type === "sanitary" || this.evt.type === "cleaning";
    },

    isEventReserved() {
      if (!this.user) {
        return;
      }
      return this.evt.visitors.includes(this.user.username);
    },

    isReservedDay() {
      return this.isDayReserved(this.evt.date);
    },

    myIndex() {
      if (!this.isEventReserved) {
        return;
      }
      return this.evt.visitors.findIndex((evt) => evt === this.user.username)
    },

    canChangeReserve() {
      return !this.isLate && !this.isTooFar && (!this.isReservedDay || this.isEventReserved);
    },

    counterColor() {
      return getCounterColor(this.evt.visitors.length);
    },

    reserveButtonText() {
      if (!this.isEventReserved || !this.user) {
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

      if (this.isEventReserved) {
        visitors.splice(this.myIndex, 1)
      } else {
        visitors.push(this.user.username)
      }

      this.updateEvent({
        id: this.evt.id,
        visitors,
      });
    },

    async edit() {
      this.$emit('edit', this.evt)
    },

    async remove() {
      const response = await this.deleteEvent({ id: this.evt.id });

      if (!response) {
        return;
      }

      this.$emit('close');
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

  &__changes {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    gap: 4px;
  }
}
</style>
