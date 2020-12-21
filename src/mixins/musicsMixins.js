export default {
    watch: {
        getActiveMusic() {
            setTimeout(() => this.updateMusicListScroll(), 0);
        },
    },
    methods: {
        selectMusic(music) {
            if (music.index == this.getActiveMusicIndex()) {
                this.updatePlayStatus(!this.getPlayingStatus);
            } else {
                this.setActiveMusic(music);
                this.updatePlayStatus(true);
            }
        },
        checkActiveMusic(index) {
            return index == this.getActiveMusicIndex();
        },
        updateMusicListScroll(event) {
            var parent = this.$refs.musicList;
            if (parent == undefined) return;
            var childY;
            let scroolTopChangeLimit = 250;
            let parentY = parent.offsetTop;
            var scrollTop = 0
            if (event) {
                childY = event.target.offsetTop;
            } else {
                childY = this.$refs.activeMusic.offsetTop;
            }
            if (childY > scroolTopChangeLimit) {
                scrollTop = childY - parentY - 100;
            }
            parent.scrollTop = scrollTop;
        },
    }
}