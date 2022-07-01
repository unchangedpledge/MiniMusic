<template>
	<view>
		<view class="back" @click="goBack">
			<u-icon size="20" color="#fff" name="arrow-left"></u-icon>
		</view>
		<view class="choose" @click="confirm">
			<span class="choose-text">确定</span>
		</view>
		<view class="skin-content">
			<view class="preview">
				<image :src="preivewPic" ></image>
			</view>
			<view class="skin-list">
				<view class="skin-item" @click="changeSkin(1)">
					<span class="icon" style="background-color: #ff7675;">
						M
					</span>
					<span class="text">恋爱粉</span>
				</view>
				<view class="skin-item" @click="changeSkin(2)">
					<span class="icon" style="background-color: #00aaff;">
						M
					</span>
					<span class="text">炫酷蓝</span>
				</view>
				<view class="skin-item" @click="changeSkin(3)">
					<span class="icon" style="background-color: #d6a2e8;">
						M
					</span>
					<span class="text">丁香紫</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name:"ChangeSkin",
		data() {
			return {
				tempTheme: 1,
				preivewPic: ''
			}
		},
		props: ['back'],
		mounted() {
			this.tempTheme = this.theme.slice(-1)
			const t = ['http://www.skfd.xyz:2089/theme1.png', 'http://www.skfd.xyz:2089/theme2.png', 'http://www.skfd.xyz:2089/theme3.png']
			this.preivewPic = t[this.theme.slice(-1)-1]
		},
		computed: {
			...mapState(['theme']),
		},
		methods: {
			...mapMutations(['changeTheme']),
			changeSkin(num) {
				this.tempTheme = num
				console.log(num)
				const t = ['http://www.skfd.xyz:2089/theme1.png', 'http://www.skfd.xyz:2089/theme2.png', 'http://www.skfd.xyz:2089/theme3.png']
				this.preivewPic = t[num-1]
			},
			goBack() {
				// this.$parent.skinBack()
				this.$emit('skinBack')
			},
			confirm() {
				this.changeTheme(this.tempTheme)
				this.$emit('skinBack')
			}
		}
	}
</script>

<style>
	.back {
		position: absolute;
		top: 62rpx;
		left: 20rpx;
	}
	
	.choose {
		position: absolute;
		bottom: 20rpx;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
	}
	
	.skin-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: absolute;
		width: 100%;
		top: 140rpx;
		bottom: 128rpx;
		background-color: rgba(255, 255, 255, 0.9);
	}
	
	.skin-content .preview {
		overflow: hidden;
		margin: 10rpx auto 0;
	}
	
	.skin-content .preview image {
		width: calc(387rpx / 2 * 3);
		height: calc(600rpx / 2 * 3);
	 }
	 
	.skin-content .skin-list {
		box-sizing: border-box;
		display: flex;
		padding: 20rpx 40rpx;
		width: 100%;
		justify-content: space-around;
	}
	
	.skin-content .skin-list .skin-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #424242;
	}
	
	.skin-content .skin-list .skin-item .icon {
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
		background-color: #fff;
		font-weight: bold;
		border-radius: 50%;
		margin-bottom: 10rpx;
	}
	
	.skin-content .skin-list .skin-item .text {
		font-size: 28rpx;
	}
	
</style>