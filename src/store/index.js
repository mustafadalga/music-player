import { createStore } from "vuex";

export default createStore({
    state: {
        musics: [
            { index: 0, name: 'Corporate Motivational Ambient', file: require('@/assets/musics/Corporate-Motivational-Ambient.mp3'), artist: 'AShamaluev' },
            { index: 12, name: 'Deal', file: require('@/assets/musics/Deal.mp3'), artist: 'AShamaluev' },
            { index: 22, name: 'Deep Relaxation', file: require('@/assets/musics/Deep-Relaxation.mp3'), artist: 'AShamaluev' },
            { index: 32, name: 'Dramatic Emotional', file: require('@/assets/musics/Dramatic-Emotional.mp3'), artist: 'AShamaluev' },
            { index: 42, name: 'Extreme', file: require('@/assets/musics/Extreme.mp3'), artist: 'AShamaluev' },
            { index: 52, name: 'Inspirational Moment', file: require('@/assets/musics/Inspirational-Moment.mp3'), artist: 'AShamaluev' },
            { index: 62, name: 'Inspiring Acoustic', file: require('@/assets/musics/Inspiring-Acoustic.mp3'), artist: 'AShamaluev' },
            { index: 72, name: 'Modern Egypt', file: require('@/assets/musics/Modern-Egypt.mp3'), artist: 'AShamaluev' },
            { index: 82, name: 'Mountain', file: require('@/assets/musics/Mountain.mp3'), artist: 'AShamaluev' },
            { index: 92, name: 'Purpose', file: require('@/assets/musics/Purpose.mp3'), artist: 'AShamaluev' },
            { index: 102, name: 'Success', file: require('@/assets/musics/Success.mp3'), artist: 'AShamaluev' },
            { index: 112, name: 'Vip', file: require('@/assets/musics/Vip.mp3'), artist: 'AShamaluev' },
            { index: 122, name: 'Air', file: require('@/assets/musics/Air.mp3'), artist: 'AShamaluev' },
        ],
        bookMarksMusicsIndex: JSON.parse(localStorage.getItem('bookMarks')) || [],
        activeMusic: { index: -1, music: '' },
        isPlay: false,
        activePlayList: "all",
    },
    mutations: {
        setCurrentMusic: (state, newMusic) => {
            state.activeMusic = newMusic
        },
        updatePlayStatus(state, status) {
            state.isPlay = status
        },
        addBookMarkMusic(state, index) {
            state.bookMarksMusicsIndex.push(index)
            this.commit('updateBookMarksFromLocalStorage')
        },
        removeBookMarkMusic(state, index) {
            state.bookMarksMusicsIndex = state.bookMarksMusicsIndex.filter(item => item !== index)
            this.commit('updateBookMarksFromLocalStorage')
        },
        updatePlayList(state, playList) {
            state.activePlayList = playList
        },
        updateBookMarksFromLocalStorage(state) {
            localStorage.setItem('bookMarks', JSON.stringify(state.bookMarksMusicsIndex));
        }
    },
    actions: {},
    modules: {}
});