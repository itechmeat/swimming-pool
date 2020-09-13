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
        Swimming Pool
      </q-toolbar-title>

      <q-space />

      <language />

      <user />
    </q-toolbar>
  </q-header>
</template>

<script>
import Language from "components/Headline/Language";
import User from "components/Headline/User";

export default {
  name: "Headline",

  components: {
    Language,
    User,
  },
};
</script>

<style lang="scss" scoped>
$block: ".block";

#{$block} {
}
</style>
