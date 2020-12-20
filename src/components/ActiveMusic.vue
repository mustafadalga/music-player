<template>
  <section class="active-music">
    <div class="logo" :class="isPlay ? 'logo-animation' : ''">
      <font-awesome-icon icon="music" />
      <div id="dummy"></div>
    </div>
    <span class="active-music-name"
      >{{ getActiveMusic.name }}
      <button
        class="btn-like"
        :class="checkBookMarkMusic ? 'liked' : ''"
        @click="toggleLikeBtn"
        v-if="getActiveMusic.index !== -1"
      >
        <font-awesome-icon icon="heart" /></button
    ></span>
    <span class="active-music-artist"
      >{{ getActiveMusic.artist }}
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
import globalMixins from "@/mixins/globalMixins";
export default {
  name: "ActiveMusic",
  mixins: [globalMixins],
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
      musics: [],
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
    getActivePlayList() {
      return this.$store.state.activePlayList;
    },
    checkBookMarkMusic() {
      return this.getBookMarksIndex.includes(this.getActiveMusic.index);
    },
  },
  watch: {
    getPlayingStatus(newStatus) {
      this.musicStatusKod = newStatus ? 2 : 3;
    },
    getActiveMusic(value) {
      this.activeMusic = value;
      this.changeMusic();
      this.musicStatusKod = 1;
    },
    musicStatusKod() {
      this.checkPlayStatus();
    },
    getActivePlayList() {
      this.updatePlayList();
    },
    getBookMarksIndex: {
      handler() {
        this.updatePlayList();
      },
      deep: true,
    },
  },
  mounted() {
    this.updatePlayList();
    this.$refs.volume_range.addEventListener(
      "input",
      this.handleVolumeProgress
    );

    this.$refs.music_range.addEventListener("input", this.updateMusicProgress);
    this.player.addEventListener("timeupdate", this.handleMusicProgress);
    this.player.addEventListener("canplay", () => {
      this.durationTime = this.player.duration;
    });

    this.setVolumeFromLocalStorage();
  },
  methods: {
    setVolumeFromLocalStorage() {
      let volume = parseFloat(this.getLocalStorageData("volume"));
      let input = this.$refs.volume_range;
      this.player.volume = volume / 100;
      input.value = volume;
      this.updateProgressBColor(input, volume);
    },
    getLocalStorageData(dataName) {
      return localStorage.getItem(dataName);
    },
    setLocalStorageData(dataName, data) {
      localStorage.setItem(dataName, data);
    },
    updatePlayList() {
      let playList = this.getActivePlayList;
      if (playList == "all") {
        this.musics = this.getMusics;
      } else if (playList == "bookmarks") {
        this.musics =
          this.getBookMarks().length > 0 ? this.getBookMarks() : this.getMusics;
      }
    },
    checkExistsBookMarksIndex(index) {
      let bookmarks = this.$store.state.bookMarksMusicsIndex;
      return bookmarks.includes(index);
    },
    toggleLikeBtn() {
      let index = this.getActiveMusic.index;
      if (index == -1) return;
      if (!this.checkExistsBookMarksIndex(index)) {
        this.$store.commit("addBookMarkMusic", index);
      } else {
        this.$store.commit("removeBookMarkMusic", index);
      }
    },
    updateMusicProgress(event) {
      let value = event.target.value;
      this.updateProgressBColor(event.target, value);
      this.updateCurrentTime(value);
    },
    handleVolumeProgress(event) {
      let value = event.target.value;
      this.updateProgressBColor(event.target, value);
      this.player.volume = value / 100;
      this.setLocalStorageData("volume", value);
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
    changeMusic() {
      this.player.src = this.getActiveMusic.file;
      this.$refs.music_range.style.pointerEvents = "auto";
    },
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
      let newIndex = this.getNewMusicIndex(status);
      return this.musics[newIndex];
    },
    getNewMusicIndex(status) {
      let currentIndex = this.musics.findIndex(
        (music) => music.index == this.getActiveMusic.index
      );
      let musicsCount = this.musics.length;
      var newIndex;
      switch (status) {
        case "next":
          newIndex = currentIndex == musicsCount - 1 ? 0 : currentIndex + 1;
          break;
        case "prev":
          newIndex = currentIndex == 0 ? musicsCount - 1 : currentIndex - 1;
          break;
        case "random":
          newIndex = Math.floor(Math.random() * musicsCount);
          break;
      }
      return newIndex;
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
    pause() {
      this.player.pause();
    },
  },
};
</script>
