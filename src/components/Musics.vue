<template>
  <section class="musics">
    <div class="musics-options">
      <button
        @click="setPlayList('all')"
        :class="checkActivePlaylist('all') ? 'btn-active-playlist' : ''"
      >
        All Musics
      </button>
      <button
        @click="setPlayList('bookmarks')"
        :class="checkActivePlaylist('bookmarks') ? 'btn-active-playlist' : ''"
      >
        BookMarks
      </button>
    </div>

    <transition name="component-fade">
      <AllMusicsPlayList v-if="activePlayList == 'all'" />
      <BookMarksPlayList v-else-if="activePlayList == 'bookmarks'" />
    </transition>
  </section>
</template>

<script>
import globalMixins from "@/mixins/globalMixins";
import AllMusicsPlayList from "./AllMusicsPlayList.vue";
import BookMarksPlayList from "./BookMarksPlayList.vue";
export default {
  name: "Musics",
  mixins: [globalMixins],
  components: {
    AllMusicsPlayList,
    BookMarksPlayList,
  },
  data() {
    return {
      activePlayList: "all",
      docState: false,
    };
  },
  mounted() {},
  methods: {
    setPlayList(status) {
      this.activePlayList = status;
    },
    checkActivePlaylist(playlist) {
      return playlist == this.activePlayList;
    },
  },
};
</script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>