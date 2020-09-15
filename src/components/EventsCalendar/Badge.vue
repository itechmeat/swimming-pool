<template>
  <q-badge
    class="badge"
    :class="classes"
    :style="styles"
    @click="handleEventClick"
  >
    <div class="badge__container">
      <div class="badge__head">
        <q-icon v-if="evt.icon" :name="evt.icon" class="q-mr-xs" />
        <q-badge :color="counterColor" text-color="white" :label="evt.visitors.length" />
      </div>

      <div class="badge__content">
        <div class="badge__title ellipsis">{{ evt.title }}</div>
        <div class="badge__note ellipsis">{{ evt.note }}</div>
      </div>
    </div>

    <div v-if="isIncluded" class="badge__status">
      <q-icon name="done_all" />
    </div>
  </q-badge>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_USER } from "src/store/modules/user/types";
import { GET_EVENT_BY_ID } from "src/store/modules/events/types";
import { isCssColor, luminosity } from "src/libs/utils";
import {fillEvent, getCounterColor} from "src/libs/events";

export default {
  name: "EventsCalendarBadge",

  props: {
    id: {
      type: String,
      required: true,
    },
    side: {
      type: String,
      default: () => "full",
    },
    timeStartPos: {
      type: Function,
      default: () => undefined,
    },
    timeDurationHeight: {
      type: Function,
      default: () => undefined,
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

    counterColor() {
      return getCounterColor(this.evt.visitors.length);
    },

    isLate() {
      const date = new Date();
      return this.evt.endTime < date.getTime();
    },

    isIncluded() {
      if (!this.user) {
        return;
      }
      return this.evt.visitors.includes(this.user.username)
    },

    classes() {
      const cssColor = isCssColor(this.evt.bgcolor)
      return {
        [`text-white bg-${this.evt.bgcolor}`]: !cssColor,
        "badge_wide": !this.side || this.side === "full",
        "badge_left": this.side === "left",
        "badge_right": this.side === "right",
        "badge_late": this.isLate,
        "badge_short": this.evt.duration <= 60,
        "badge_my": this.isIncluded,
      }
    },

    styles() {
      const style = {}
      if (isCssColor(this.evt.bgcolor)) {
        style["background-color"] = this.evt.bgcolor;
        style.color = luminosity(this.evt.bgcolor) > 0.5 ? "black" : "white";
      }
      if (this.timeStartPos) {
        style.top = (this.timeStartPos(this.evt.time) + 1) + "px"
      }
      if (this.timeDurationHeight) {
        style.height = (this.timeDurationHeight(this.evt.duration) - 1) + "px"
      }
      style["align-items"] = "flex-start"
      return style
    },
  },

  methods: {
    handleEventClick() {
      this.$emit("select", this.evt.id);
    },
  },
};
</script>

<style lang="scss" scoped>
$block: ".badge";

#{$block} {
  position: absolute;
  left: 0;
  width: 100%;
  font-size: 12px;
  cursor: pointer;

  &_late {
    opacity: .7;
  }

  &_left {
    width: calc(50% - 1px);
  }

  &_right {
    left: 50%;
    width: 50%;
  }

  &__container {
    flex: 1;
    position: relative;
    max-width: 100%;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    padding: 1px 0;
    font-size: 18px;
  }

  &__content {
    padding: 6px 0;
  }

  &__title {
    #{$block}_short#{$block}_my & {
      margin-right: 18px;
    }
  }

  &__note {
    #{$block}_short & {
      display: none;
    }
  }

  &__status {
    position: absolute;
    right: 6px;
    bottom: 4px;
    font-size: 16px;
    line-height: 1;
    text-align: right;
  }
}
</style>
