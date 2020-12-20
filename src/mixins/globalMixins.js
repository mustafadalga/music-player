export default {
    data() {
        return {
            activePlayList: "all",
        }
    },
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
        getBookMarksIndex() {
            return this.$store.state.bookMarksMusicsIndex;
        }
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
        getBookMarks() {
            let musics = this.getMusics;
            let bookMarksIndex = this.getBookMarksIndex;
            var bookMarks = [];
            bookMarksIndex.forEach((index) => {
                let music = musics.find((music) => music.index == index);
                bookMarks.push(music);
            });
            return bookMarks;
        },
    }
}