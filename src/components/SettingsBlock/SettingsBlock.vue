<template>
  <div class="settings-block">
    <div class="scroll-wrapper">
      Settings
      <settings-audio-controls
        :is-audio-paused="isAudioPaused"
        @toggleAudio="toggleAudio"
        @togglePlaying="togglePlaying"
      />
    </div>
  </div>
</template>

<script>
import SettingsAudioControls from '@/components/SettingsBlock/SettingsAudioControls/SettingsAudioControls.vue';

export default {
  name: 'SettingsBlock',
  components: { SettingsAudioControls },
  props: {
    isAudioPaused: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleAudio(n) {
      this.$emit('toggleAudio', n);
    },
    togglePlaying() {
      this.$emit('togglePlaying');
    },
  },
};
</script>
