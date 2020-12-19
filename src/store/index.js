import { createStore } from "vuex";

export default createStore({
    state: {
        musics: [
            { name: 'Corporate Motivational Ambient', file: require('@/assets/musics/Corporate-Motivational-Ambient.mp3'), artist: 'AShamaluev' },
            { name: 'Deal', file: require('@/assets/musics/Deal.mp3'), artist: 'AShamaluev' },
            { name: 'Deep Relaxation', file: require('@/assets/musics/Deep-Relaxation.mp3'), artist: 'AShamaluev' },
            { name: 'Dramatic Emotional', file: require('@/assets/musics/Dramatic-Emotional.mp3'), artist: 'AShamaluev' },
            { name: 'Extreme', file: require('@/assets/musics/Extreme.mp3'), artist: 'AShamaluev' },
            { name: 'Inspirational Moment', file: require('@/assets/musics/Inspirational-Moment.mp3'), artist: 'AShamaluev' },
            { name: 'Inspiring Acoustic', file: require('@/assets/musics/Inspiring-Acoustic.mp3'), artist: 'AShamaluev' },
            { name: 'Modern Egypt', file: require('@/assets/musics/Modern-Egypt.mp3'), artist: 'AShamaluev' },
            { name: 'Mountain', file: require('@/assets/musics/Mountain.mp3'), artist: 'AShamaluev' },
            { name: 'Purpose', file: require('@/assets/musics/Purpose.mp3'), artist: 'AShamaluev' },
            { name: 'Success', file: require('@/assets/musics/Success.mp3'), artist: 'AShamaluev' },
            { name: 'Vip', file: require('@/assets/musics/Vip.mp3'), artist: 'AShamaluev' },
            { name: 'Air', file: require('@/assets/musics/Air.mp3'), artist: 'AShamaluev' },
        ],
        activeMusic: { music: '', index: -1 },
        isPlay: false,
    },
    mutations: {
        setCurrentMusic: (state, newMusic) => {
            state.activeMusic = newMusic
        },
        updatePlayStatus(state, status) {
            state.isPlay = status
        }

    },
    actions: {},
    modules: {}
});