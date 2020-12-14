<template>
  <section class="active-music">
    <div class="logo">
      <font-awesome-icon icon="music" />
      <div id="dummy"></div>
    </div>
    <div class="active-music-logo" style="display: none">
      <div class="logo-border"></div>
    </div>
    <span class="active-music-name"
      >{{ getActiveMusic.music.name }}
      <button><font-awesome-icon icon="heart" /></button
    ></span>
    <span class="active-music-artist"
      >{{ getActiveMusic.music.artist }}
      <div class="temp"></div
    ></span>
    <div class="active-music-status">
      <div class="progressbar music-progressbar"></div>
      <div class="music-times">
        <span class="active-time">00:29</span>
        <span class="all-music-time">04:25</span>
      </div>
    </div>
    <div class="active-music-options">
      <button class="btn-loop">
        <font-awesome-icon icon="redo-alt" />
      </button>
      <button class="btn-prev">
        <font-awesome-icon icon="step-backward" />
      </button>
      <button class="btn-play" @click="play">
        <font-awesome-icon icon="play-circle" />
        <font-awesome-icon :icon="['fas', 'pause-circle']" />
      </button>
      <button class="btn-next">
        <font-awesome-icon icon="step-forward" />
      </button>
      <button class="btn-random">
        <font-awesome-icon icon="random" />
      </button>
    </div>
    <div class="volume">
      <font-awesome-icon icon="volume-up" />
      <div class="progressbar music-progressbar"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ActiveMusic",
  data() {
    return {
      music: null,
    };
  },
  computed: {
    getActiveMusic() {
      return this.$store.state.activeMusic;
    },
  },
  created() {},
  mounted() {},
  methods: {
    getNote() {},
    setMusic() {
      this.music = new Audio(this.getActiveMusic.music.file);
      this.music.pause();
      this.music.currentTime = 0;
    },
    play() {
      this.setMusic();
      this.music.play();
    },
  },
};
</script>
