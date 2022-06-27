<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			console.log('App Launch')
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


</style>
