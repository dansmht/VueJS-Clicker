<template>
  <div class="settings-audio-controls">
    <div class="audio-title">
      Music
    </div>
    <div class="audio-controls">
      <div class="main-controls">
        <div
          v-tooltip="'Previous'"
          class="audio-control pointer"
          @click="skipAudio(-1)"
        >
          <svg
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 11L15.8779 1.95811L15.8779 20.0419L1 11Z"
              fill="#B0B0B0"
            />
            <rect
              x="1.56641"
              y="19.3525"
              width="1.04407"
              height="16.7051"
              transform="rotate(-180 1.56641 19.3525)"
              fill="#B0B0B0"
            />
          </svg>
        </div>
        <div
          v-if="isPlaying"
          v-tooltip="'Pause'"
          class="audio-control pointer"
          @click="pause"
        >
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0H7V26H8V0Z"
              fill="#B0B0B0"
            />
            <path
              d="M18 0H17V26H18V0Z"
              fill="#B0B0B0"
            />
          </svg>
        </div>
        <div
          v-else
          v-tooltip="'Play'"
          class="audio-control pointer"
          @click="play"
        >
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 13L6.475 24.2583L6.475 1.74167L25 13Z"
              fill="#B0B0B0"
            />
          </svg>
        </div>
        <div
          v-tooltip="'Next'"
          class="audio-control pointer"
          @click="skipAudio(1)"
        >
          <svg
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.3003 11L5.42235 20.0419L5.42235 1.95811L20.3003 11Z"
              fill="#B0B0B0"
            />
            <rect
              x="19.7339"
              y="2.64746"
              width="1.04407"
              height="16.7051"
              fill="#B0B0B0"
            />
          </svg>
        </div>
      </div>
      <div class="volume-controls">
        <mute-button
          :volume="volume"
          :muted="muted"
          @toggleMute="toggleMute"
        />
        <input
          ref="volume"
          v-model.number="volume"
          class="volume-range"
          type="range"
          min="0"
          max="100"
          step="1"
        >
      </div>
    </div>
  </div>
</template>

<script>
import MuteButton from '@/components/SettingsBlock/SettingsAudioControls/MuteButton.vue';
import { audioArray } from '@/shared/initialState/initialAppState';

export default {
  name: 'SettingsAudioControls',
  components: { MuteButton },
  data() {
    return {
      activeAudio: audioArray[0],
      isPlaying: false,
      volume: 10,
      muted: false,
    };
  },
  watch: {
    volume(val) {
      this.activeAudio.audio.volume = val / 100;
      if (!this.muted) {
        this.paintLine();
      }
    },
    muted(val) {
      if (!val) {
        this.paintLine();
      } else {
        this.$refs.volume.style.background = '#454545';
      }
    },
  },
  created() {
    this.activeAudio.audio.volume = this.volume / 100;
    this.activeAudio.audio.loop = true;
  },
  mounted() {
    this.paintLine();
  },
  methods: {
    paintLine() {
      this.$refs.volume.style.background = `-webkit-linear-gradient(left, #fafafa 0%, #fafafa ${this.volume}%, #454545 ${this.volume}%, #454545 100%)`;
    },
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
    toggleMute() {
      const newVal = !this.activeAudio.audio.muted;
      this.activeAudio.audio.muted = newVal;
      this.muted = newVal;
    },
  },
};
</script>
