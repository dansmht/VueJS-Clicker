<template>
  <div class="settings-audio-controls">
    <h4>Music</h4>
    <ul class="audio-controls-list">
      <audio-control
        :src="require('../../../assets/images/audio/rewind.png')"
        alt="<<"
        tooltip-text="Previous"
        @click="skipAudio(-1)"
      />
      <audio-control
        v-if="isPlaying"
        :src="require('../../../assets/images/audio/pause.png')"
        alt="||"
        tooltip-text="Pause"
        @click="pause"
      />
      <audio-control
        v-else
        :src="require('../../../assets/images/audio/play.png')"
        alt="|>"
        tooltip-text="Play"
        @click="play"
      />
      <audio-control
        :src="require('../../../assets/images/audio/fast-forward.png')"
        alt=">>"
        tooltip-text="Next"
        @click="skipAudio(1)"
      />
      <li>
        <input
          v-model="volume"
          type="range"
          min="0"
          max="100"
          step="1"
        >
      </li>
    </ul>
  </div>
</template>

<script>
import AudioControl from '@/components/SettingsBlock/SettingsAudioControls/AudioControl.vue';
import { audioArray } from '@/shared/initialState/initialAudio';

export default {
  name: 'SettingsAudioControls',
  components: { AudioControl },
  data() {
    return {
      activeAudio: audioArray[0],
      isPlaying: false,
      volume: 10,
    };
  },
  watch: {
    volume(val) {
      this.activeAudio.audio.volume = val / 100;
    },
  },
  created() {
    this.activeAudio.audio.volume = this.volume / 100;
    this.activeAudio.audio.loop = true;
  },
  methods: {
    play() {
      this.activeAudio.audio.play();
      this.isPlaying = true;
    },
    pause() {
      this.activeAudio.audio.pause();
      this.isPlaying = false;
    },
    skipAudio(n) {
      this.pause();
      this.activeAudio.audio.currentTime = 0;

      const idx = this.activeAudio.id + n;
      if (idx >= audioArray.length) {
        [this.activeAudio] = audioArray;
      } else if (idx < 0) {
        this.activeAudio = audioArray[audioArray.length - 1];
      } else {
        this.activeAudio = audioArray[idx];
      }
      this.play();
    },
  },
};
</script>
