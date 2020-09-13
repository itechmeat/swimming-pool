<template>
  <q-page class="flex flex-center">
    <div>
      <graph-ql-test />
    </div>
  </q-page>
</template>

<script>
import GraphQlTest from "src/components/GraphQLApi";

export default {
  name: 'PageIndex',

  components: {
    GraphQlTest,
  },
}
</script>
