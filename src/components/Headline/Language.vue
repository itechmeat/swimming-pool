<template>
  <q-select
    v-model="lang"
    :options="langOptions"
    dense
    borderless
    emit-value
    map-options
    options-dense
    dark
  />
</template>

<script>
export default {
  name: "HeadlineLanguage",

  data () {
    return {
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'de', label: 'German' },
        { value: 'ru', label: 'Russian' },
      ],
    }
  },

  watch: {
    lang (lang) {
      this.$i18n.locale = lang
      this.$q.cookies.set('app_lang', lang)
    }
  },
};
</script>

<style lang="scss" scoped>
$block: ".block";

#{$block} {
}
</style>
