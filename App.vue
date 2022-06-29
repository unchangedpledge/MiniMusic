<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const loveList = uni.getStorageSync('loveList')
			const latestList = uni.getStorageSync('latestList')
			const searchHistory = uni.getStorageSync('searchHistory')
			if(!loveList) {
				uni.setStorageSync('loveList', [])
			}
			if(!latestList) {
				uni.setStorageSync('latestList', [])
			}
			if(!searchHistory) {
				uni.setStorageSync('searchHistory', [])
			}
			console.log('list', loveList, latestList, searchHistory)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/common/iconfont.css";

	ul {
		list-style: none;
		padding: 0;
	}
	
	// 主页头部
	.header.theme1 {
		background-color: #ff7675;
	}
	.header.theme2 {
		background-color: #00aaff;
	}
	.header.theme3 {
		background-color: #d6a2e8;
	}

	// 推荐页面文字
	.list-title.theme1 {
		color: #ff7675;
	}
	.list-title.theme2 {
		color: #00aaff;
	}
	.list-title.theme3 {
		color: #d6a2e8;
	}

	// 换肤页面
	.change-skin.theme1 {
		background-color: #ff7675;
	}
	.change-skin.theme2 {
		background-color: #00aaff;
	}
	.change-skin.theme3 {
		background-color: #d6a2e8;
	}

	// 用户中心
	.switch-item.active.theme1 {
		background-color: #ff7675;
	}
	.switch-item.active.theme2 {
		background-color: #00aaff;
	}
	.switch-item.active.theme3 {
		background-color: #d6a2e8;
	}
	
	.random-play.theme1,
	.switch.theme1{
		border: 1px solid #ff7675;
		color: #ff7675;
	}
	.random-play.theme2,
	.switch.theme2 {
		border: 1px solid #00aaff;
		color: #00aaff;
	}
	.random-play.theme3,
	.switch.theme3 {
		border: 1px solid #d6a2e8;
		color: #d6a2e8;
	}


</style>
