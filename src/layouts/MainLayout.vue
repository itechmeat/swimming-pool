<template>
  <q-layout view="hHh Lpr fFf">
    <headline @change="handleMenuClick" />

    <sidebar ref="sidebar" :visible="isSidebarVisible" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Headline from "src/components/Headline/Headline";
import Sidebar from "src/components/Sidebar";

export default {
  name: 'MainLayout',

  components: {
    Headline,
    Sidebar,
  },

  data () {
    return {
      isSidebarVisible: false,
    }
  },

  methods: {
    handleMenuClick() {
      this.$refs.sidebar.handleOpen();
    }
  },
}
</script>
