<template>
  <section class="musics">
    <div class="musics-options">
      <button>All Musics</button>
      <button>BookMarks</button>
    </div>

    <ul class="music-list" ref="musicList">
      <li
        class="music-item"
        v-for="(music, index) in getMusics"
        :key="index"
        :class="checkActiveMusic(index) ? 'active-color' : ''"
        @click="
          selectMusic(music, index);
          updateMusicListScroll($event);
        "
        :ref="checkActiveMusic(index) ? 'activeMusic' : ''"
      >
        <div class="music-logo">
          <font-awesome-icon icon="music" />
        </div>
        <div class="music-info">
          <span class="music-name">{{ music.name }} {{ index }}</span>
          <span class="music-artist">{{ music.artist }} </span>
        </div>
        <button class="music-status">
          <font-awesome-icon
            icon="pause"
            v-if="checkActiveMusic(index) && getPlayingStatus"
          />
          <font-awesome-icon icon="play" v-else />
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "Musics",
  computed: {
    getMusics() {
      return this.$store.state.musics;
    },
    getActiveMusic() {
      return this.$store.state.activeMusic;
    },
    getActiveMusicIndex() {
      return this.$store.state.activeMusic.index;
    },
    getPlayingStatus() {
      return this.$store.state.isPlay;
    },
  },
  watch: {
    getActiveMusic() {
      setTimeout(() => this.updateMusicListScroll(), 0);
    },
  },
  methods: {
    selectMusic(music, index) {
      if (index == this.getActiveMusicIndex) {
        this.updatePlayingStatus(!this.getPlayingStatus);
      } else {
        let chosenMusic = {
          index: index,
          music: music,
        };
        this.setActiveMusic(chosenMusic);
        this.updatePlayingStatus(true);
      }
    },
    updateMusicListScroll(event) {
      var childY;
      let scroolTopChangeLimit = 250;
      var parent = this.$refs.musicList;
      let parentY = parent.offsetTop;
      if (event) {
        childY = event.target.offsetTop;
      } else {
        childY = this.$refs.activeMusic.offsetTop;
      }
      if (childY > scroolTopChangeLimit) {
        let scroll = childY - parentY - 100;
        parent.scrollTop = scroll;
      }
    },
    checkActiveMusic(index) {
      return index == this.getActiveMusicIndex;
    },
    setActiveMusic(music) {
      this.$store.commit("setCurrentMusic", music);
    },
    updatePlayingStatus(status) {
      this.$store.commit("updatePlayStatus", status);
    },
  },
};
</script>

<style>
</style>