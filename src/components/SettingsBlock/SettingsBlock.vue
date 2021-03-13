<template>
  <div class="settings-block">
    <div class="scroll-wrapper">
      <div class="settings">
        <div>Settings</div>
        <settings-audio-controls />
      </div>
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
