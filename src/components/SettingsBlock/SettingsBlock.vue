<template>
  <div class="settings-block">
    <div class="scroll-wrapper">
      Settings
      <settings-audio-controls />
    </div>
  </div>
</template>

<script>
import SettingsAudioControls from '@/components/SettingsBlock/SettingsAudioControls/SettingsAudioControls.vue';

export default {
  name: 'SettingsBlock',
  components: { SettingsAudioControls },
};
</script>
