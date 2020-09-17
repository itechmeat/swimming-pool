<template>
  <q-item class="visitor">
    <template v-if="profileData">
      <q-item-section avatar>
        <q-avatar>
          <img :src="profileData.photo">
        </q-avatar>
      </q-item-section>
      <q-item-section>{{ profileData.firstName }} {{ profileData.lastName }}</q-item-section>
    </template>

    <q-item-section v-else>Unknown User</q-item-section>

    <q-space />

    <q-item-section>
      <div class="visitor__actions">
        <q-btn
          v-if="canDelete"
          round
          size="sm"
          color="negative"
          icon="delete"
          @click="$emit('delete', id)"
        />
      </div>
    </q-item-section>
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
    canDelete: Boolean,
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
  &:hover {
    background: #dadada;
  }

  &__actions {
    text-align: right;
    opacity: .1;

    #{$block}:hover & {
      opacity: 1;
    }
  }
}
</style>
