<template>
  <q-page class="flex flex-center">
    <div>
      <Generator />
    </div>
  </q-page>
</template>

<script>
import Generator from "src/components/Generator";

export default {
  name: 'PageIndex',

  components: {
    Generator,
  },
};
</script>
