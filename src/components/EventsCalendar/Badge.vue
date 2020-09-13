<template>
  <q-badge
    class="badge"
    :class="badgeClasses(event)"
    :style="badgeStyles(event, timeStartPos, timeDurationHeight)"
    @click="handleEventClick(event)"
  >
    <div class="badge__container">
      <div class="badge__head">
        <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs" />
        <q-badge :color="counterColor" text-color="white" :label="event.visitors" />
      </div>
      <div class="badge__content">
        <div class="ellipsis">{{ event.title }}</div>
        <div class="ellipsis">{{ event.note }}</div>
      </div>
    </div>
  </q-badge>
</template>

<script>
import { isCssColor, luminosity } from "src/libs/utils";
import { getCounterColor } from "src/libs/events";

export default {
  name: "EventsCalendarBadge",

  props: {
    event: {
      type: Object,
      required: true,
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
    counterColor() {
      return getCounterColor(this.event.visitors);
    },

    isLate() {
      const date = new Date();
      return this.event.endTime < date.getTime();
    }
  },

  methods: {
    handleEventClick(ev) {
      this.$emit("select", ev);
    },

    badgeClasses (event) {
      const cssColor = isCssColor(event.bgcolor)
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor,
        "badge_wide": !event.side || event.side === "full",
        "badge_left": event.side === "left",
        "badge_right": event.side === "right",
        "badge_late": this.isLate,
      }
    },

    badgeStyles (event, timeStartPos, timeDurationHeight) {
      const style = {}
      if (isCssColor(event.bgcolor)) {
        style["background-color"] = event.bgcolor
        style.color = luminosity(event.bgcolor) > 0.5 ? "black" : "white"
      }
      if (timeStartPos) {
        style.top = (timeStartPos(event.time) + 1) + "px"
      }
      if (timeDurationHeight) {
        style.height = (timeDurationHeight(event.duration) - 1) + "px"
      }
      style["align-items"] = "flex-start"
      return style
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

  &__container {
    flex: 1;
    max-width: 100%;
  }

  &_left {
    width: calc(50% - 1px);
  }

  &_right {
    left: 50%;
    width: 50%;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    padding: 1px 0;
    font-size: 18px
  }
}
</style>
