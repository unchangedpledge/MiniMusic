<template>
	<view class="mini-music">
		<div class="header">
			<div class="app-Head">
				<span class="app-name">♪ MiniMusic ♪</span>
				<span class="person">|||</span>
			</div>
			<div class="tab">
				<u-tabs
					:scrollable="false" 
					:list="headTabs" 
					@change="handleTabs"
					lineWidth="30"
					lineColor="#f56c6c"
					:activeStyle="{
						color: '#303133',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}"
					:inactiveStyle="{
						color: '#606266',
						transform: 'scale(1)'
					}"
					itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
				></u-tabs>
			</div>
		</div>
		<view class="content">
			<view v-if="curTab == 0" class="page1">
				<u-button text="page1" type="success"></u-button>
			</view>
			<view v-if="curTab == 1" class="page1">
				<u-button text="page2" type="success"></u-button>
			</view>
			<view v-if="curTab == 2" class="page1">
				<u-button text="page3" type="success"></u-button>
			</view>
			<view v-if="curTab == 3" class="page1">
				<u-button text="page4" type="success"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				headTabs: [{
					name: '关注',
				}, {
					name: '推荐',
				}, {
					name: '电影'
				}, {
					name: '科技'
				}],
				curTab: 0,
			}
		},
		onLoad() {

		},
		methods: {
			handleTabs({index, ...item}) {
				console.log('点击tab', item, index)
				this.curTab = index
				uni.request({
						url: 'http://124.221.175.51:8080/hiddenTroubles/getInfo', //仅为示例，并非真实接口地址。
						method: 'GET',
						header: {
								'custom-header': 'hello' //自定义请求头信息
						},
						success: (res) => {
								console.log('自带: ', res.data);
								this.text = 'request success';
						}
				})
			}
		}
	}
</script>

<style>
	.mini-music {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.mini-music .header {
		width: 100%;
		font-size: 19px;
	}
	
	.mini-music .app-Head {
		width: 100%;
		height: 80rpx;
		
		text-align: center;
	}
	
	.mini-music .app-Head .app-name {
		display: inline-block;
		font-size: 19px;
		margin-top: 8rpx;
	}
	
	.mini-music .app-Head .person{
		position: absolute;
		right: 20rpx;
		margin-top: 8rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
