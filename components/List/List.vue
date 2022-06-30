<template>
	<view>
		<u-loading-page :loading="isLoading"></u-loading-page>
		<view class="list-container" :style="'z-index:' + (isLoading ? -1 : 1)">
			<view class="back" @click="test">
				<u-icon size="24" name="arrow-left"></u-icon>
			</view>
			<view class="fixbg" :style="{'background-image' : 'url(' + playlist.coverImgUrl + ')'}"></view>
			<scroll-view scroll-y="true" :style="'height: 100%; box-sizing: border-box;' + (mini ? 'padding-bottom: 60px;' : '') ">
				<view class="list-head">
					<view class="list-head-img">
						<image :src="playlist.coverImgUrl"></image>
					</view>
					<view class="list-head-text">
						<view>{{playlist.name || singerName}}</view>
						<view class="description">
							{{playlist.description}}
						</view>
					</view>
				</view>
				<view class="list-music">
					<view class="list-music-head">
						<text ></text>
						<text @tap="handleToDetail(0)">全部播放</text>
					</view>
					<view class="list-music-item" v-for="(item,index) in playlist.tracks" :key="index" @tap="handleToDetail(index)">
						<view class="list-music-top">{{index+1}}</view>
						<view class="list-music-song">
							<view>{{item.name}}</view>
							<view>
								<text>{{item.ar[0].name}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/common/iconfont.css' //图标引用
	import {mapState,mapMutations} from 'vuex'
	import {list, songsOfsinger} from '../../common/api.js'
	export default {
		name: "List",
		data() {
			return {
				playlist:{
					coverImgUrl:'',
					creator:{
						avatarUrl:''
					},
					trackCount:'',
					privileges:'',
				},
				isLoading: true,
				id: this.showList
			}
		},
		props: ['showList', 'singerName', 'singerAvatar', 'name', 'coverImgUrl', 'description'],
		computed: {
			// ...mapState(['mini'])
		},
		mounted() {
			// if(this.showList) { // 推荐页面进入
				console.log('歌单id', this.id)
				list(this.id).then((res)=>{
					const playlist = res[1].data.result
					console.log(playlist)
					if(!playlist) {
						console.log('res', res)
						if(res[1].data.code == '200'){
							this.playlist = res[1].data.playlist
							console.log('playlist: ', this.playlist)
						}
					}else {
						const data = playlist.map(item => ({id: item.songId, name: item.name, ar: [{name: item.songer}]}))
						this.playlist = {
							tracks: data,
							name: this.name,
							coverImgUrl: this.coverImgUrl,
							description: this.description
						}
						console.log(this.coverImgUrl)
					}
					this.isLoading = false
				})
			// }else if(this.singerName){ // 歌手页面进入
			// 	console.log('歌手', this.singerName)
			// 	songsOfsinger(this.singerName).then((res)=>{
			// 		console.log('歌手歌曲', res[1].data.result)
			// 		const data = res[1].data.result.map(item => ({id: item.songId, name: item.name, ar: [{name: this.singerName}]}))
			// 		this.playlist = {
			// 			tracks: data,
			// 			coverImgUrl: this.singerAvatar,
			// 			description: ''
			// 		}
			// 		this.isLoading = false
			// 	})
			// }
		},
		methods: {
			...mapMutations(['updatePlaylist', 'setCurIndex']),
			test() {
				this.$emit('backRank')
			},
			handleToDetail(index) {
				const playlist = this.playlist.tracks.map(item => ({
					id: item.id,
					name: item.name,
					singer: item.ar[0].name
				}))
				console.log('点击', index, playlist)
				this.updatePlaylist(playlist)
				this.setCurIndex(index)
				console.log(this.playlist)
			}
		}
	}
</script>

<style scoped>
	.fixbg {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-size: cover;
		background-position: center 0;
		filter: blur(10px);
	}
	
	.list-container {
		position: fixed;
		padding-top: 120rpx;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
	}
	
	.back {
		z-index: 100;
		position: absolute;
		top: 60rpx;
		left: 30rpx;
	}
	
	.list-head{
		display: flex;
		margin: 30rpx;
	}
	.list-head-img{
		width: 264rpx;
		height: 264rpx;
		border-radius: 30rpx;
		overflow: hidden;
		position: relative;
		margin-right: 42rpx;
	}
	.list-head-img image{
		width: 100%;
		height: 100%;
	}
	.list-head-img text{
		position: absolute;
		right: 8rpx;
		top: 8rpx;
		color: white;
		font-size: 26rpx;
	}
	.list-head-text{
		flex: 1;
		color: #f0f2f7;
	}
	.list-head-text view:nth-child(1){
		color: white;
		font-size: 34rpx;
		margin-bottom: 60rpx;
	}
	.list-head-text view:nth-child(2){
		display: -webkit-box;
		font-size: 26rpx;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-line-clamp: 3;
	}
	.list-share{
		width: 330rpx;
		height: 74rpx;
		margin: 0 auto;
		background: rgba(0,0,0,0.4);
		border-radius: 37rpx;
		color: white;
		text-align: center;
		line-height: 74rpx;
		font-size: 28rpx;
	}
	.list-share text{
		margin-right: 16rpx;
	}
	.list-music{
		background: white;
		border-radius: 50rpx;
		margin-top: 40rpx;
		overflow: hidden;
	}
	.list-music-head{
		height: 50rpx;
		margin:30rpx 0 70rpx 22rpx;
	}
	.list-music-head text:nth-child(1){
		height: 50rpx;
		font-size: 50rpx;
	}
	.list-music-head text:nth-child(2){
		font-size: 30rpx;
		margin: 0 10rpx 0 26rpx;
	}
	.list-music-head text:nth-child(3){
		font-size: 26rpx;
		color: #b2b2b2;
	}
	.list-music-item{
		display: flex;
		margin: 0 32rpx 66rpx 46rpx;
		align-items: center;
		color: #959595;
	}
	.list-music-top{
		width: 58rpx;
		font-size: 30rpx;
		line-height: 50rpx;
	}
	.list-music-song{
		flex: 1;
	}
	.list-music-song view:nth-child(1){
		font-size: 28rpx;
		color: black;
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.list-music-song view:nth-child(2){
		display: flex;
		font-size: 20rpx;
		align-items: center;
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.list-music-song view:nth-child(2) image{
		width: 32rpx;
		height: 20rpx;
		margin-right: 10rpx;
	}
	.list-music-song view:nth-child(2) text{
		font-size: 20rpx;
		align-items: center;
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.list-music-item text{
		font-size: 50rpx;
		color: #c7c7c7;
	}
</style>
