<template>
  <div id="q-app" class="app">
    <router-view />

    <q-dialog v-if="!user" v-model="dialog">
      <div class="user__form">
        <amplify-authenticator v-if="authState !== 'signedin'" />
      </div>
    </q-dialog>

    <amplify-authenticator v-if="authState !== 'signedin'" class="app__auth" />
  </div>
</template>
<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { mapGetters, mapMutations, mapActions } from "vuex";
import * as TYPES from "src/store/modules/user/types";

export default {
  name: "App",

  data() {
    return {
      dialog: false,
    };
  },

  created() {
    onAuthUIStateChange((authState, authData) => {
      this.setAuthState(authState)
      this.setUser(authData)
    });

    this.fetchEvents();
    this.subscribe();
  },

  computed: {
    ...mapGetters("user", {
      user: TYPES.GET_USER,
      authState: TYPES.GET_AUTH,
      formState: TYPES.GET_AUTH_FORM_STATE,
    }),
  },

  watch: {
    dialog: {
      handler(val) {
        if (val) {
          return;
        }
        this.setAuthFormState(false);
      }
    },

    formState: {
      handler(val) {
        if (!val) {
          return;
        }
        this.dialog = true;
      }
    }
  },

  methods: {
    ...mapActions("events", ["fetchEvents", "subscribe"]),

    ...mapMutations("user", {
      setUser: TYPES.SET_USER,
      setAuthState: TYPES.SET_AUTH,
      setAuthFormState: TYPES.SET_AUTH_FORM_STATE,
    }),
  },

  beforeDestroy() {
    return onAuthUIStateChange;
  },
}
</script>

<style lang="scss">
$block: ".app";

#{$block} {
  &__auth {
    position: absolute;
    left: -9999px;
  }
}
</style>
