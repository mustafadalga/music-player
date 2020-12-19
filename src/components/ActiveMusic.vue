<template>
  <section class="active-music">
    <div class="logo" :class="isPlay ? 'logo-animation' : ''">
      <font-awesome-icon icon="music" />
      <div id="dummy"></div>
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
      <input type="range" value="0" class="music-range" ref="music_range" />
      <div class="music-times">
        <span class="active-time" ref="currentTime">{{
          getCurrentTime(currentTime)
        }}</span>
        <span class="all-music-time" ref="duration">{{
          getCurrentTime(durationTime)
        }}</span>
      </div>
    </div>
    <div class="active-music-options">
      <button
        class="btn-loop"
        :class="isLoop ? 'btn-underline' : ''"
        @click="loopMusicToggleBtn"
      >
        <font-awesome-icon icon="redo-alt" />
      </button>
      <button class="btn-prev" @click="prevMusic">
        <font-awesome-icon icon="step-backward" />
      </button>
      <button class="btn-play" @click="playToggleBtn">
        <font-awesome-icon
          :icon="['fas', 'pause-circle']"
          v-if="getPlayingStatus"
        />
        <font-awesome-icon icon="play-circle" v-else />
      </button>
      <button class="btn-next" @click="nextMusic">
        <font-awesome-icon icon="step-forward" />
      </button>
      <button
        class="btn-random"
        @click="randomMusicToggleBtn"
        :class="isRandom ? 'btn-underline' : ''"
      >
        <font-awesome-icon icon="random" />
      </button>
    </div>
    <div class="volume">
      <font-awesome-icon icon="volume-up" />
      <input type="range" value="100" class="volume-range" ref="volume_range" />
    </div>
  </section>
</template>

<script>
export default {
  name: "ActiveMusic",
  data() {
    /*
    Music Status Kod : Meanings
    -1:do nothing!
    0:The music hasn't started playing yet
    1:New Music - Music has been changed.
    2:Paused music started to continue.(Changed from within Musics.vue.)
    3:Music is paused.(Changed from within Musics.vue.)
    4:Paused music started to continue.(Changed from within ActiveMusic.vue.)
    5:Music is paused.(Changed from within ActiveMusic.vue.)
    */
    return {
      player: new Audio(),
      activeMusic: null,
      isPlay: false,
      isLoop: false,
      isRandom: false,
      musicStatusKod: 0,
      currentTime: 0,
      durationTime: 0,
    };
  },
  computed: {
    getActiveMusic() {
      return this.$store.state.activeMusic;
    },
    getPlayingStatus() {
      return this.$store.state.isPlay;
    },
  },

  watch: {
    getPlayingStatus(newStatus) {
      this.musicStatusKod = newStatus ? 2 : 3;
    },
    getActiveMusic() {
      this.activeMusic = this.getActiveMusic;
      this.changeMusic();
      this.musicStatusKod = 1;
    },
    musicStatusKod() {
      console.log(this.musicStatusKod);
      this.checkPlayStatus();
    },
  },
  mounted() {
    this.$refs.volume_range.addEventListener(
      "input",
      this.handleVolumeProgress
    );
    this.$refs.music_range.addEventListener("input", this.updateMusicProgress);
    this.player.addEventListener("timeupdate", this.handleMusicProgress);
    this.player.addEventListener("canplay", () => {
      this.durationTime = this.player.duration;
    });
  },
  methods: {
    updateMusicProgress(event) {
      let value = event.target.value;
      this.updateProgressBColor(event.target, value);
      this.updateCurrentTime(value);
    },
    handleVolumeProgress(event) {
      let value = event.target.value;
      this.updateProgressBColor(event.target, value);
      this.player.volume = value / 100;
    },
    getMusics() {
      return this.$store.state.musics;
    },
    getCurrentMusicIndex() {
      return this.getActiveMusic.index;
    },
    nextMusic() {
      let newMusic = this.isRandom
        ? this.getNewMusic("random")
        : this.getNewMusic("next");
      this.setActiveMusic(newMusic);
    },
    prevMusic() {
      if (this.musicStatusKod == 0) return;
      let newMusic = this.getNewMusic("prev");
      this.setActiveMusic(newMusic);
    },
    getCurrentTime(time) {
      let hour = Math.floor(time / 3600);
      let minute = Math.floor(time / 60);
      let second = Math.floor(time - (hour * 3600 + minute * 60));
      hour = hour > 9 ? hour : `0${hour}`;
      second = second > 9 ? second : `0${second}`;
      minute = minute > 9 ? minute : `0${minute}`;
      let formatTime =
        hour > 0 ? `${hour}:${minute}:${second}` : `${minute}:${second}`;
      return formatTime;
    },
    setActiveMusic(music) {
      this.$store.commit("setCurrentMusic", music);
    },
    changeMusic() {
      this.player.src = this.getActiveMusic.music.file;
      this.$refs.music_range.style.pointerEvents = "auto";
    },
    selectFirstMusic() {},
    playToggleBtn() {
      if (this.musicStatusKod == 0) this.nextMusic();
      if (this.isPlay) {
        this.musicStatusKod = 5;
      } else {
        this.musicStatusKod = 4;
      }
    },
    loopMusicToggleBtn() {
      this.isLoop = !this.isLoop;
    },
    randomMusicToggleBtn() {
      this.isRandom = !this.isRandom;
    },
    checkPlayStatus() {
      switch (this.musicStatusKod) {
        case 1:
        case 2:
        case 4:
          this.play();
          this.updatePlayStatus(true);
          this.musicStatusKod = -1;
          break;
        case 3:
        case 5:
          this.pause();
          this.updatePlayStatus(false);
          this.musicStatusKod = -1;
          break;
        default:
          break;
      }
    },
    play() {
      let promise = this.player.play();
      if (promise !== undefined) {
        promise.catch(() => {
          this.player.play();
        });
      }
    },
    getNewMusic(status = "next") {
      status = String(status).toLowerCase();
      let musics = this.getMusics();
      let currentIndex = this.getCurrentMusicIndex();
      var newIndex = null;
      switch (status) {
        case "next":
          newIndex = currentIndex == musics.length - 1 ? 0 : currentIndex + 1;
          break;
        case "prev":
          newIndex = currentIndex == 0 ? musics.length - 1 : currentIndex - 1;
          break;
        case "random":
          newIndex = Math.floor(Math.random() * musics.length);
          break;
      }
      let newMusic = musics[newIndex];
      let chosenMusic = {
        index: newIndex,
        music: newMusic,
      };
      return chosenMusic;
    },
    isMusicOver() {
      return Math.floor(this.currentTime) == Math.floor(this.durationTime);
    },
    restartMusic() {
      this.player.currentTime = 0;
    },
    handleMusicProgress() {
      if (this.isMusicOver()) {
        this.pause();
        this.restartMusic();
        if (this.isLoop) {
          this.play();
        } else {
          this.nextMusic();
        }
      }
      let percent = (this.player.currentTime / this.durationTime) * 100;
      let musicRange = this.$refs.music_range;
      musicRange.value = percent;
      this.updateProgressBColor(musicRange, percent);
      this.currentTime = this.player.currentTime;
    },
    updateCurrentTime(value) {
      const scrubTime = (value * this.durationTime) / 100;
      this.player.currentTime = scrubTime;
    },
    updateProgressBColor(input, percent) {
      input.style.background = `
        linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(255, 255, 255) ${percent}%, rgba(255, 255, 255, 0.2) ${percent}%, rgba(255, 255, 255, 0.2) 100%)`;
    },
    updatePlayStatus(status) {
      this.isPlay = status;
      this.$store.commit("updatePlayStatus", status);
    },
    pause() {
      this.player.pause();
    },
  },
};
</script>
