<template>
  <div class="profile">
    <pre v-if="user">
      {{ user }}
    </pre>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_USER } from "src/store/modules/user/types";

export default {
  name: "ProfilePage",

  computed: {
    ...mapGetters("user", {
      user: GET_USER,
    }),
  },
};
</script>

<style lang="scss">
$block: ".profile";

#{$block} {
  pre {
    overflow: auto;
    max-width: 100%;
    height: calc(100vh - 100px);
  }
}
</style>
