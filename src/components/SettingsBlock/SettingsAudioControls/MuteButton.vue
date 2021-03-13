<template>
  <div
    class="mute-button"
    @click="toggleMute"
  >
    <svg
      width="44"
      height="26"
      viewBox="0 0 44 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 8H5V18H0V8Z"
        fill="#B0B0B0"
      />
      <path
        d="M5 8L18 0V26L5 18V8Z"
        fill="#B0B0B0"
      />
      <template v-if="status === 0">
        <rect
          x="37.9331"
          y="19.0667"
          width="0.612826"
          height="18.3848"
          transform="rotate(135 37.9331 19.0667)"
          fill="#B0B0B0"
        />
        <rect
          x="37.0669"
          y="6.06665"
          width="0.612826"
          height="18.3848"
          transform="rotate(45 37.0669 6.06665)"
          fill="#B0B0B0"
        />
      </template>
      <template v-if="status === 1 || status === 2 || status === 3">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M28.3689 10.9812C28.9972 11.6094 29.3501 12.4615 29.3501 13.35C29.3501 14.2385 28.9972
          15.0906 28.3689 15.7188C27.7407 16.3471 26.8886 16.7 26.0001 16.7L26.0001 16C26.7029 16
          27.377 15.7208 27.8739 15.2238C28.3709 14.7269 28.6501 14.0528 28.6501 13.35C28.6501
          12.6472 28.3709 11.9731 27.8739 11.4762C27.377 10.9792 26.7029 10.7 26.0001 10.7L26.0001
          10C26.8886 10 27.7407 10.3529 28.3689 10.9812Z"
          fill="#B0B0B0"
        />
      </template>
      <template v-if="status === 2 || status === 3">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M31.9044 7.44566C33.4704 9.01159 34.3501 11.1354 34.3501 13.35C34.3501 15.5646 33.4704
          17.6884 31.9044 19.2543C30.3385 20.8203 28.2147 21.7 26.0001 21.7L26.0001 21C28.029 21
          29.9748 20.194 31.4095 18.7594C32.8441 17.3247 33.6501 15.3789 33.6501 13.35C33.6501
          11.3211 32.8441 9.37529 31.4095 7.94063C29.9748 6.50598 28.029 5.7 26.0001 5.7L26.0001
          5C28.2147 5 30.3385 5.87973 31.9044 7.44566Z"
          fill="#B0B0B0"
        />
      </template>
      <template v-if="status === 3">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M35.1924 3.80761C37.6304 6.24559 39 9.55219 39 13C39 16.4478 37.6304 19.7544 35.1924
          22.1924C32.7544 24.6304 29.4478 26 26 26L26 25.3184C29.267 25.3184 32.4003 24.0205
          34.7104 21.7104C37.0205 19.4002 38.3184 16.267 38.3184 13C38.3184 9.73297 37.0205 6.59975
          34.7104 4.28961C32.4003 1.97947 29.267 0.681647 26 0.681647L26 -5.68248e-07C29.4478
          -4.17539e-07 32.7544 1.36964 35.1924 3.80761Z"
          fill="#B0B0B0"
        />
      </template>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'MuteButton',
  props: {
    volume: {
      type: Number,
      required: true,
    },
    muted: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    status() {
      if (this.volume === 0 || this.muted) {
        return 0;
      }
      if (this.volume <= 33) {
        return 1;
      }
      if (this.volume <= 66) {
        return 2;
      }
      return 3;
    },
  },
  methods: {
    toggleMute() {
      this.$emit('toggleMute');
    },
  },
};
</script>
