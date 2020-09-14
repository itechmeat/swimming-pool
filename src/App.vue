<template>
  <div id="q-app" class="app">
    <router-view />
    <amplify-authenticator v-if="authState !== 'signedin'" class="app__auth" />
  </div>
</template>
<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { mapGetters, mapMutations, mapActions } from "vuex";
import * as TYPES from "src/store/modules/user/types";

export default {
  name: "App",

  created() {
    onAuthUIStateChange((authState, authData) => {
      this.setAuthState(authState)
      this.setUser(authData)
    });

    this.fetchEvents();
  },

  computed: {
    ...mapGetters("user", {
      user: TYPES.GET_USER,
      authState: TYPES.GET_AUTH,
    }),
  },

  methods: {
    ...mapActions("events", ["fetchEvents"]),

    ...mapMutations("user", {
      setUser: TYPES.SET_USER,
      setAuthState: TYPES.SET_AUTH,
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
