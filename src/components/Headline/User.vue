<template>
  <div class="user">
    <q-btn v-if="user" dense flat no-wrap>
      <q-avatar size="40px">
        <img src="https://cdn.quasar.dev/img/avatar4.jpg" alt="">
      </q-avatar>
      <q-icon name="arrow_drop_down" size="24px" />

      <q-menu auto-close>
        <q-list dense>
          <q-item :to="'/profile'" clickable>
            <q-item-section>Your profile</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Your events</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section>Settings</q-item-section>
          </q-item>
          <q-item clickable @click="signOut">
            <q-item-section>Sign out</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <q-btn
      v-else
      color="white"
      text-color="black"
      label="Sign In"
      @click="setAuthFormState(true)"
    />
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import { GET_USER, GET_AUTH, SET_AUTH_FORM_STATE } from "src/store/modules/user/types";

export default {
  name: "HeadlineUser",

  computed: {
    ...mapGetters("user", {
      user: GET_USER,
      authState: GET_AUTH,
    }),
  },

  methods: {
    ...mapActions("user", ["signOut"]),

    ...mapMutations("user", {
      setAuthFormState: SET_AUTH_FORM_STATE,
    }),
  },
};
</script>

<style lang="scss">
$block: ".user";

#{$block} {
  &__form {
    .hydrated {
      display: block;
      margin: 0 0 -20px;
    }
  }
}
</style>
