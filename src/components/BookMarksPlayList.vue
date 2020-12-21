<template>
  <template v-if="bookMarks.length > 0">
    <ul class="music-list" ref="musicList">
      <li class="music-item" v-for="(bookMark, index) in bookMarks" :key="index"
        :class="checkActiveMusic(bookMark.index) ? 'active-color' : ''"
        @click="selectMusic(bookMark);updateMusicListScroll($event);"
        :ref="checkActiveMusic(bookMark.index) ? 'activeMusic' : ''">
        <div class="music-logo">
          <font-awesome-icon icon="music" />
        </div>
        <div class="music-info">
          <span class="music-name">{{ bookMark.name }}</span>
          <span class="music-artist">{{ bookMark.artist }}</span>
        </div>
        <button class="music-status">
          <font-awesome-icon icon="pause" v-if="checkActiveMusic(bookMark.index) && getPlayingStatus"/>
          <font-awesome-icon icon="play" v-else />
        </button>
      </li>
    </ul>
  </template>
  <template v-else>
    <div class="bookmarks-warning">
      <p>Bookmark musics is not available.</p>
      <p>Music is playing from the general music list.</p>
    </div>
  </template>
</template>

<script>
import globalMixins from "@/mixins/globalMixins";
import musicsMixins from "@/mixins/musicsMixins";
export default {
  name: "BookMarksPlayList",
  mixins: [globalMixins, musicsMixins],
  data() {
    return {
      bookMarks: [],
    };
  },
  computed: {},
  watch: {
    getBookMarksIndex: {
      handler() {
        this.updateBookMarks();
      },
      //For Details:https://michaelnthiessen.com/how-to-watch-nested-data-vue/
      deep: true,
    },
  },
  created() {
    this.updateBookMarks();
  },
  methods: {
    updateBookMarks() {
      this.bookMarks = this.getBookMarks();
    },
  },
};
</script>
