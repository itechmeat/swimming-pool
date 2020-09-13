<template>
  <q-drawer
    v-model="visible"
    show-if-above
    bordered
    content-class="bg-grey-2"
    :width="240"
    :breakpoint="800"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item to="/" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section>
            Home
          </q-item-section>
        </q-item>

        <q-item to="/calendar" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>

          <q-item-section>
            Calendar
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
export default {
  name: "Sidebar",

  data() {
    return {
      visible: true,
    };
  },

  methods: {
    handleOpen() {
      this.visible = !this.visible
    }
  }
};
</script>

<style lang="scss" scoped>
$block: ".block";

#{$block} {
}
</style>
