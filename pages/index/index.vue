<template>
	<view class="mini-music">
		<div class="header">
			<div class="app-Head">
				<span class="app-name">♪ MiniMusic ♪</span>
				<span class="person">
					<u-icon name="list" color="rgba(255,255,255,0.9)" size="24" @click="show = true"></u-icon>
				</span>
			</div>
			<div class="tab">
				<u-tabs
					:scrollable="false" 
					:list="headTabs" 
					@change="handleTabs"
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
			<view v-if="curTab == 0" class="recommend">
				<Recommend/>
			</view>
			<view v-if="curTab == 1" class="songers">
				<Songers/>
			</view>
			<view v-if="curTab == 2" class="rank">
				<Rank/>
			</view>
			<view v-if="curTab == 3" class="search">
				<Search/>
			</view>
		</view>
	</view>
</template>

<script>
	import Recommend from '@/components/Recommend/Recommend.vue'
	import Songers from '@/components/Songers/Songers.vue'
	import Rank from '@/components/Rank/Rank.vue'
	import Search from '@/components/Search/Search.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				headTabs: [{
					name: '推荐',
				}, {
					name: '歌手',
				}, {
					name: '排行'
				}, {
					name: '搜索'
				}],
				curTab: 0,
			}
		},
		components: {Recommend, Songers, Rank, Search},
		onLoad() {

		},
		methods: {
			async handleTabs({index, ...item}) {
				console.log('点击tab', item, index)
				this.curTab = index
				// const res = await this.$request('/hiddenTroubles/getInfo')
				// console.log(res)
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
		height: 80px;
		font-size: 19px;
	}
	
	.mini-music .app-Head {
		margin-top: 40rpx;
		width: 100%;
		height: 64rpx;
		text-align: center;
		/* color: #fff; */
	}
	
	.mini-music .app-Head .app-name {
		display: inline-block;
		font-size: 19px;
		margin-top: 8rpx;
	}
	
	.mini-music .app-Head .person{
		position: absolute;
		left: 20rpx;
		margin-top: 8rpx;
	}
	
	.mini-music .content {
		position: fixed;
		width: 100%;
		top: 180rpx;
		bottom: 0;
		background-color: #fff;
	}
</style>
