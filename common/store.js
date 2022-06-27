import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	// state中是需要管理的全局变量
	state:{
		theme: 'theme1',
		// mini: false,
		// songDetail: {
		// 	pic: '',
		// },
		// playlist: [], // 播放列表
		// curIndex: 0,
	},
	// mutations 是操作state中变量的方法
	mutations:{
		changeTheme(state, newTheme) {
			state.theme = 'theme' + newTheme
		},
		// showMiniPlayer(state) {
		// 	state.mini = true
		// },
		// setSongDetail(state, payload) {
		// 	state.songDetail = payload
		// },
		// updatePlaylist(state, payload) { // 更新播放列表
		// 	const loveList = uni.getStorageSync('loveList')
		// 	const ids = loveList.map(item => item.id)
		// 	state.playlist = payload.map(item => ({...item, isLove: ids.includes(item.id)}))
		// 	console.log('store', loveList, state.playlist, payload.map(item => ({...item, isLove: ids.includes(item.id)})))
		// },
		// setCurIndex(state, payload) { // 更新当前下标
		// 	state.curIndex = payload
		// }
	}
})

export default store
