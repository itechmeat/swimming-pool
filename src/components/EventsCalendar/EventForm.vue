<template>
  <q-card class="event-form">
    <q-card-section>
      <q-form class="event-form__form">
        <q-select
          v-model="value.type"
          :options="types"
          :option-label="opt => $t(`events.${opt}.title`)"
          :label="$t('labels.event_type')"
        />

        <q-input
          v-model="value.title"
          :label="$t('labels.title')"
        />

        <q-input
          v-model="value.description"
          :label="$t('labels.description')"
        />

        <q-input
          v-model="value.note"
          :label="$t('labels.note')"
        />

        <q-input
          v-model="value.duration"
          :label="$t('labels.duration')"
        />

        <q-input v-model="value.datestamp">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="value.datestamp" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="value.datestamp" mask="YYYY-MM-DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-form>

      <div v-if="isLate" class="text-warning event-form__warning">
        {{ $t('messages.is_late_creation') }}
      </div>
    </q-card-section>

    <q-card-actions align="between">
      <q-btn
        v-close-popup
        flat
        color="warning"
        :label="$t('common.close')"
      />

      <q-space />

      <q-btn
        flat
        color="primary"
        icon="event"
        :label="submitButtonText"
        :disabled="isLate"
        @click="$emit('submit')"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { getEventTypes } from "src/libs/events"

export default {
  name: "EventForm",

  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      types: getEventTypes(),
    };
  },

  computed: {
    submitButtonText() {
      return !this.value.id ? this.$t('common.create') : this.$t('common.update')
    },

    isLate() {
      return new Date(this.value.datestamp) < new Date();
    },
  },
};
</script>

<style lang="scss" scoped>
$block: ".event-form";

#{$block} {
  width: 300px;

  &__warning {
    margin-top: 16px;
  }
}
</style>
