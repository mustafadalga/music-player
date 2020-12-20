export default {
    watch: {
        getActiveMusic() {
            setTimeout(() => this.updateMusicListScroll(), 0);
        },
    },
    methods: {
        selectMusic(music, index) {
            if (index == this.getActiveMusicIndex()) {
                this.updatePlayStatus(!this.getPlayingStatus);
            } else {
                let chosenMusic = {
                    index: index,
                    music: music,
                };
                this.setActiveMusic(chosenMusic);
                this.updatePlayStatus(true);
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
            return index == this.getActiveMusicIndex();
        },
    }
}