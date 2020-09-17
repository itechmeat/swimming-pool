<template>
  <div class="generator text-center">
    <div class="generator__row">
      <q-btn color="primary" label="Go to Calendar" to="/calendar" />
    </div>

    <div class="generator__row">
      <q-btn color="teal" label="Get Profile" @click="getProfile" />
    </div>

    <div v-if="false" class="generator__row">
      <q-btn color="warning" label="Generate Profiles" @click="generateProfiles" />
    </div>

    <div v-if="false" class="generator__row">
      <q-btn color="negative" label="Generate Events" @click="generateEvents" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { GET_EVENTS } from "src/store/modules/events/types";
import { v4 as uuidv4 } from "uuid";
import EVENTS from "src/assets/events";

export default {
  name: "EventsTmp",

  computed: {
    ...mapGetters("events", {
      events: GET_EVENTS,
    }),
  },

  methods: {
    ...mapActions("user", ["createProfile", "fetchProfile"]),
    ...mapActions("events", ["createEvent"]),

    async getProfile() {
      const res = await this.fetchProfile("02b79152-4cb4-4438-a621-b8e6176c312f");
      console.log(res)
    },

    async generateProfiles() {
      const { data } = await axios.get("https://randomuser.me/api/?results=200");
      const profiles = data.results.map((profile) => {
        return {
          firstName: profile.name.first,
          lastName: profile.name.last,
          email: profile.email,
          phone: profile.cell,
          photo: profile.picture.medium,
        }
      })
      console.log('generateProfiles', profiles)

      profiles.forEach((profile, index) => {
        // if (index > 10) {
        //   return;
        // }

        const result = {
          ...profile,
          userId: null,
        };

        this.createProfile(result)
      });
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
      });
    },
  },
};
</script>

<style lang="scss">
$block: ".generator";

#{$block} {
  &__row {
    margin-bottom: 16px;
  }
}
</style>
