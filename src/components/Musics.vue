<template>
  <section class="musics">
    <div class="musics-options">
      <button>All Musics</button>
      <button>BookMarks</button>
    </div>

    <ul class="music-list">
      <li
        class="music-item"
        v-for="(music, index) in getMusics"
        :key="index"
        :class="checkActiveMusic(index) ? 'active-color' : ''"
        @click="selectMusic(music, index)"
      >
        <div class="music-logo">
          <font-awesome-icon icon="music" />
        </div>
        <div class="music-info">
          <span class="music-name">{{ music.name }}</span>
          <span class="music-artist">{{ music.artist }} </span>
        </div>
        <button class="music-status">
          <font-awesome-icon icon="pause" v-if="checkActiveMusic(index)" />
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
    getActiveMusicIndex() {
      return this.$store.state.activeMusic.index;
    },
  },
  methods: {
    selectMusic(music, index) {
      let chosenMusic = {
        index: index,
        music: music,
      };
      this.$store.commit("setCurrentMusic", chosenMusic);
    },
    checkActiveMusic(index) {
      return index == this.getActiveMusicIndex;
    },
  },
};
</script>

<style>
</style>