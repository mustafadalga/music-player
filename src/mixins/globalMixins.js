export default {
    computed: {
        getMusics() {
            return this.$store.state.musics;
        },
        getActiveMusic() {
            return this.$store.state.activeMusic;
        },
        getPlayingStatus() {
            return this.$store.state.isPlay;
        },
    },
    methods: {
        getActiveMusicIndex() {
            return this.getActiveMusic.index;
        },
        setActiveMusic(music) {
            this.$store.commit("setCurrentMusic", music);
        },
        updatePlayStatus(status) {
            let conditions =
                Object.is(this.isPlay, undefined) || Object.is(this.isPlay, null);
            if (!conditions) this.isPlay = status;
            this.$store.commit("updatePlayStatus", status);
        },
    }
}