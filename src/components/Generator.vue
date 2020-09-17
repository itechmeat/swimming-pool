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
      <hr />
      <br />
      <br />
      <q-input
        v-model="monday"
        label="Input any monday in format '2020-09-14'"
        style="width: 240px;"
      />
      <br />
      <q-btn color="negative" label="Generate Events" @click="generateEvents" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { GET_EVENTS } from "src/store/modules/events/types";
import buildEvents from "src/libs/events-map";

export default {
  name: "EventsTmp",

  data() {
    return {
      monday: "2020-09-14",
    };
  },

  computed: {
    ...mapGetters("events", {
      events: GET_EVENTS,
    }),
  },

  methods: {
    ...mapActions("user", ["createProfile", "fetchProfile", "fetchProfiles"]),
    ...mapActions("events", ["createEvent"]),

    async getProfile() {
      console.log(this.$store.getters["user/GET_PROFILES"])
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

    async generateEvents() {
      const profiles = await this.fetchProfiles();
      console.log('profiles', profiles);
      const events = await buildEvents(this.monday, profiles);
      console.log('events', events);
      events.forEach((event) => {
        this.createEvent(event)
      })
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
