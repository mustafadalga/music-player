<template>
  <main class="container">
    <Musics />
    <ActiveMusic />
  </main>
</template>

<script>
import Musics from "./components/Musics";
import ActiveMusic from "./components/ActiveMusic";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPause,
  faPauseCircle,
  faPlay,
  faMusic,
  faHeart,
  faRedoAlt,
  faStepBackward,
  faPlayCircle,
  faStepForward,
  faRandom,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPlay,
  faPause,
  faPauseCircle,
  faMusic,
  faHeart,
  faRedoAlt,
  faStepBackward,
  faPlayCircle,
  faStepForward,
  faRandom,
  faVolumeUp
);
export default {
  name: "App",
  components: {
    Musics,
    ActiveMusic,
  },
};
</script>

<style lang="scss">
@import "assets/scss/main";
</style>
