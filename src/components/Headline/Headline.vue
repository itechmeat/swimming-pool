<template>
  <q-header elevated reveal :revealOffset="100">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="$emit('change')"
      />

      <q-toolbar-title>
        Swimming Pool <small>v.{{ version }}</small>
      </q-toolbar-title>

      <q-space />

      <language />

      <user />
    </q-toolbar>
  </q-header>
</template>

<script>
import Language from "src/components/Headline/Language";
import User from "src/components/Headline/User";
import INFO from "../../../package.json"

export default {
  name: "Headline",

  components: {
    Language,
    User,
  },

  computed: {
    version() {
      return INFO.version;
    }
  }
};
</script>

<style lang="scss" scoped>
$block: ".block";

#{$block} {
}
</style>
