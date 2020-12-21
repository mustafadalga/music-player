<template>
  <section class="musics">
    <div class="musics-options">
      <button @click="updatePlayList('all')" :class="checkActivePlaylist('all') ? 'btn-active-playlist' : ''">
        All Musics
      </button>
      <button @click="updatePlayList('bookmarks')" :class="checkActivePlaylist('bookmarks') ? 'btn-active-playlist' : ''">
        BookMarks
      </button>
    </div>

    <template v-if="activePlayList == 'all'">
      <AllMusicsPlayList />
    </template>
    <template v-else-if="activePlayList == 'bookmarks'">
      <BookMarksPlayList />
    </template>
  </section>
</template>

<script>
import AllMusicsPlayList from "./AllMusicsPlayList.vue";
import BookMarksPlayList from "./BookMarksPlayList.vue";
export default {
  name: "Musics",
  components: {
    AllMusicsPlayList,
    BookMarksPlayList,
  },
  data() {
    return {
      activePlayList: "all",
    };
  },
  mounted() {},
  methods: {
    updatePlayList(playList) {
      this.activePlayList = playList;
      this.$store.commit("updatePlayList", playList);
    },
    checkActivePlaylist(playlist) {
      return playlist == this.activePlayList;
    },
  },
};
</script>
