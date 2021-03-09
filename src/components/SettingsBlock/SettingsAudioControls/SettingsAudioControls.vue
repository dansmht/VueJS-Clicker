<template>
  <div class="settings-audio-controls">
    <ul class="audio-controls-list">
      <audio-control
        :src="require('../../../assets/images/audio/rewind.png')"
        alt="<<"
        @click="toggleAudio(1)"
      />
      <audio-control
        v-if="isAudioPaused"
        :src="require('../../../assets/images/audio/play.png')"
        alt="|>"
        @click="togglePlaying"
      />
      <audio-control
        v-else
        :src="require('../../../assets/images/audio/pause.png')"
        alt="||"
        @click="togglePlaying"
      />
      <audio-control
        :src="require('../../../assets/images/audio/fast-forward.png')"
        alt=">>"
        @click="toggleAudio(1)"
      />
    </ul>
  </div>
</template>

<script>
import AudioControl from '@/components/SettingsBlock/SettingsAudioControls/AudioControl.vue';

export default {
  name: 'SettingsAudioControls',
  components: { AudioControl },
  props: {
    isAudioPaused: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isReallyAudioPaused: this.isAudioPaused,
    };
  },
  watch: {
    isAudioPaused(val) {
      console.log('isAudioPaused', val);
      this.isReallyAudioPaused = val;
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
