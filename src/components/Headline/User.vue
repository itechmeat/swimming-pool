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
          <q-item clickable @click="logout">
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
      @click="dialog = !dialog"
    />

    <q-dialog v-if="!user" v-model="dialog">
      <div class="user__form">
        <amplify-authenticator v-if="authState !== 'signedin'" />
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_USER, GET_AUTH } from "src/store/modules/user/types";

export default {
  name: "HeadlineUser",

  data() {
    return {
      dialog: false
    };
  },

  computed: {
    ...mapGetters("user", {
      user: GET_USER,
      authState: GET_AUTH,
    }),
  },

  methods: {
    ...mapActions("user", ["signOut"]),

    logout() {
      this.signOut();
      this.dialog = false;
    }
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
