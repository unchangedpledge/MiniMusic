<template>
	<view>
		<view class="back" @click="goBack">
			<u-icon size="20" name="arrow-left"></u-icon>
		</view>
		<view class="switch-wrapper">
			<ul :class="'switch ' + theme">
				<li @click="handleClick" :data-key="1" :class="theme + (activeNum == 1 ? ' switch-item active' : ' switch-item')">
					<span>我的收藏</span>
				</li>
				<li @click="handleClick" :data-key="2" :class="theme + (activeNum == 2 ? ' switch-item active' : ' switch-item')">
					<span>最近播放</span>
				</li>
			</ul>
		</view>
		<view @tap="handleToDetail(0)" :class="'random-play ' + theme">
			<span class="play">
				<u-icon :color="(['#ff7675', '#00aaff', '#d6a2e8'][theme[theme.length-1]-1])" name="play-right"></u-icon>
			</span>
			<span class="txt">顺序播放全部</span>
		</view>
		<view class="list-wrapper">
			<scroll-view v-if="list.lenght != 0" class="list-scroll" scroll-y="true">
				<view class="list-content">
					<ul class="song-list">
						<li @tap="handleToDetail(index)" class="song-item" v-for="(item, index) in list" :key="index">
							<view class="detail">
								<view class="num">{{`${index > 10 ? '' : '0'}${index+1}`}}</view>
								<view class="info">
									<h2 class="name">{{item.name}}</h2>
									<p class="desc">{{item.singer||item.songer}}</p>
								</view>
							</view>
						</li>
					</ul>
				</view>
			</scroll-view>
			<view v-else class="list-empty">
				<u-empty
					mode="data"
					:text="activeNum == 1 ? '暂无收藏歌曲' : '暂无最近播放'"
				>
				</u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name:"UserCenter",
		data() {
			return {
				activeNum: 1,
				// list: [{
				// 	name: '一场游戏一场梦',
				// 	desc: '林宝馨 - 一场游戏一场梦'
				// },{
				// 	name: '一场游戏一场梦',
				// 	desc: '林宝馨 - 一场游戏一场梦'
				// },{
				// 	name: '一场游戏一场梦',
				// 	desc: '林宝馨 - 一场游戏一场梦'
				// }]
			}
		},
		props: ['active'],
		computed: {
			...mapState(['theme']),
			list() {
				return uni.getStorageSync(this.activeNum == 1 ? 'loveList' : 'latestList')
			}
		},
		mounted() {
			console.log(this.active)
			this.activeNum = this.active
		},
		methods: {
			...mapMutations(['updatePlaylist', 'setCurIndex']),
			goBack() {
				// console.log('back', this.$parent.back())
				this.$emit('back')
				// this.$parent.back()
			},
			handleClick(e) {
				console.log(e.currentTarget.dataset.key)
				this.activeNum = e.currentTarget.dataset.key
			},
			handleToDetail(index) {
				console.log('点击', index, this.list)
				this.updatePlaylist(this.list)
				this.setCurIndex(index)
			}
		}
	}
</script>

<style>
	.back {
		position: absolute;
		top: 32rpx;
		left: 36rpx;
	}
	
	.back .u-icon {
		padding: 18rpx;
	}
	
	.switch-wrapper {
		padding: 16rpx 0 40rpx 0;
	}
	
	.switch {
		border: 1px solid #000;
		display: flex;
		align-items: center;
		width: 480rpx;
		margin: 0 auto;
		padding: 0;
		border-radius: 10rpx;
		list-style: none;
	}
	
	.switch .switch-item {
		flex: 1;
		text-align: center;
		padding: 20rpx;
		font-size: 28rpx;
	}
	
	.switch .switch-item:nth-child(1) {
		border-radius: 10rpx 0 0 10rpx;
	}
	
	.switch .switch-item:nth-child(2) {
		border-radius: 0 10rpx 10rpx 0;
	}
	
	.switch .switch-item.active {
		color: #fff;
	}
	
	.random-play {
		margin: 0 auto;
		padding: 20rpx;
		width: 270rpx;
		text-align: center;
		font-size: 28rpx;
		border: 1px solid #ff7675;
		border-radius: 200rpx;
	}
	.random-play .play {
		display: inline-block;
		margin-right: 10rpx;
	}
	
	.list-wrapper {
		position: absolute;
		top: 224rpx;
		bottom: 0;
		width: 100%;
	}
	
	.list-wrapper .list-scroll,
	.list-wrapper .list-empty {
		overflow: hidden;
		height: 100%;
	}
	
	.list-wrapper .list-scroll .list-content {
		padding: 40rpx 60rpx;
	}
	
	.list-wrapper .list-scroll .list-content .song-item {
		height: 120rpx;
		border-bottom: 1px solid #e6e6e6;
	}
	
	.list-wrapper .list-scroll .list-content .song-item .detail {
		display: flex;
		align-items: center;
		line-height: 40rpx;
		color: #515a6e;
		padding: 10rpx 0;
	}
	
	.detail .num {
		margin-right: 16rpx;
	}
	
	.detail .info {
		width: 90%;
	}
	
	.detail .info .name {
		color: rgba(0,0,0,.7);
		font-size: 28rpx;
		font-weight: bold;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.detail .info .desc {
		color: rgba(0,0,0,.6);
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin-top: 8rpx;
		font-size: 24rpx;
	}
	
	.u-empty {
		position: relative;
		top: 20%;
	}

</style>