<template>
  <q-item v-if="profileData" clickable v-ripple>
    <template>
      <q-item-section avatar>
        <q-avatar>
          <img :src="profileData.photo">
        </q-avatar>
      </q-item-section>
      <q-item-section>{{ profileData.firstName }} {{ profileData.lastName }}</q-item-section>
    </template>
  </q-item>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_PROFILE_BY_ID } from "src/store/modules/user/types";

export default {
  name: "EventVisitorsItem",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters("user", {
      profile: GET_PROFILE_BY_ID,
    }),

    profileData() {
      if (!this.id) {
        return;
      }
      return this.profile(this.id);
    }
  },

  watch: {
    id: {
      immediate: true,
      async handler(val) {
        if (!val) {
          return;
        }
        this.fetchProfile(val);
      }
    }
  },

  methods: {
    ...mapActions("user", ["fetchProfile"]),
  },
};
</script>

<style lang="scss" scoped>
$block: ".visitor";

#{$block} {
}
</style>
