<template>
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
        <span class="music-name">{{ music.name }}</span>
        <span class="music-artist">{{ music.artist }}</span>
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
</template>

<script>
import globalMixins from "@/mixins/globalMixins";
import musicsMixins from "@/mixins/musicsMixins";
export default {
  name: "BookMarksPlayList",
  mixins: [globalMixins, musicsMixins],
};
</script>

<style>
</style>