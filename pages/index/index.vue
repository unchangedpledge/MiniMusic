<template>
	<view class="mini-music">
		<div :class="'header '+ theme">
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
					lineColor="#fff"
					:activeStyle="{
						color: '#303133',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}"
					:inactiveStyle="{
						color: 'rgba(0,0,0,0.8)',
						transform: 'scale(1)'
					}"
					itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
				></u-tabs>
			</div>
		</div>
		<view v-if="curTab == 0" class="recommend content">
			<Recommend/>
		</view>
		<view v-if="curTab == 1" class="songers content">
			<Songers/>
		</view>
		<view v-if="curTab == 2" class="rank content">
			<Rank/>
		</view>
		<view v-if="curTab == 3" class="search content">
			<Search/>
		</view>
		<!-- <view v-if="curTab == 4" ref="user" :class="'user-center content ' + (out ? 'out' : '')" style="top: 40rpx;">
			<UserCenter @back="back" :active="active"/>
		</view> -->
		<view v-if="curTab == 5" ref="skin" :class="'change-skin content ' + theme">
			<ChangeSkin @skinBack="skinBack" />
		</view>

		<u-popup 
			:show="show" 
			mode="right" 
			closeable 
			@close="close"
			:customStyle="{width: '80vw'}"
		>
			<view class="drawer" >
				<view class="img">
					<img src="http://cdn.xieyezi.com/background1.svg" style="width: 100%;">
				</view>	
				<u-cell-group :border="false">
					<u-cell
						v-for="(item, index) in personTabs" 
						:key="index"
						:name="item.name"
						:title="item.title"
						isLink
						:border="false"
						:icon="item.icon"
						size="large"
						@click="handlePersonTab"
					></u-cell>
				</u-cell-group>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
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
				personTabs: [{
					name: 'love',
					title: '收藏歌曲',
					icon: 'heart'
				},{
					name: 'latest',
					title: '最近播放',
					icon: 'clock'
				},{
					name: 'skin',
					title: '主题换肤',
					icon: 'grid'
				}],
				curTab: 0,
				show: false,
			}
		},
		computed: {
			...mapState(['theme'])
		},
		components: {Recommend, Songers, Rank, Search},
		mounted() {
			console.log('测试1', this.theme)
			console.log('测试2', this.theme)
			
		},
		methods: {
			close() {
			  this.show = false
			},
			handleTabs({index, ...item}) {
				console.log('点击tab', item, index, this)
				this.curTab = index
				// const res = await this.$request('/hiddenTroubles/getInfo')
				// console.log(res)
			},
			handlePersonTab(item) {
				if(item.name == 'skin') { // 点击换肤
					this.come = this.curTab
					this.curTab = 5
					this.show = false
				}else { // 点击最近播放或点击收藏歌曲
					this.active = item.name == 'love' ? 1 : 2
					this.come = this.curTab
					this.curTab = 4
					this.show = false
				}
			},
			skinBack() {
				this.curTab = this.come
				this.come = 0
				console.log(this.theme)
			},
			back() {
				this.out = true
				setTimeout(()=>{
					this.curTab = this.come
					this.come = 0
					this.out = false
				}, 100)
			},
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
		height: 180rpx;
		font-size: 19px;
	}
	
	.mini-music .app-Head {
		margin-top: 40rpx;
		width: 100%;
		height: 64rpx;
		text-align: center;
		color: #fff;
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
	
	.content {
		position: fixed;
		width: 100%;
		top: 180rpx;
		bottom: 0;
		background-color: #fff;
	}
	
	.change-skin {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
	}

	/* .user-center {
		animation: come .3s;
	}
	
	.user-center.out {
		animation: out .3s;
	}
	
	@keyframes come {
		0% {
			top: 100%;
		}
		100% {
			top: 40rpx;
		}
	}
	
	@keyframes out {
		0% {
			top: 40rpx;
		}
		100% {
			top: 100%;
		}
	} */
	
	.drawer {
		height: 100%;
		padding: 30rpx;
	}
	
	.drawer .img {
		margin-bottom: 20rpx;
	}
	
	
</style>
