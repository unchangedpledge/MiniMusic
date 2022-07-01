<template>
	<view class="player" v-show="showPlayer">
		<view :class="'normal-player ' + (close ? 'normal-close' : '')" :style="'display:' + (display ? 'block' : 'none')">
			<view class="background">
				<img :src="songDetail.pic">
			</view>
			<view class="close" @click="closeNormal">
				<u-icon size="28" color="#fff" name="arrow-down"></u-icon>
			</view>
			<view class="top">
				<h1 class="title">{{songDetail.name}}</h1>
				<h2 class="subtitle">{{songDetail.songer}}</h2>
			</view>
			<view class="middle">
				<view v-if="!showLyric" class="mid-circle">
					<view class="container" v-show="!isLoading">
						<view class="detail-paly" @tap="handToPlay">
							<image :src="songDetail.pic" :class="{'detail-paly-run': isPlayRotate}" mode=""></image>
							<view :class="{'pause': !isPlayRotate}"></view>
						</view>
						<view class="detail-lyric">
							<view class="detail-lyric-wrap" :style="{transform : 'translateY('+ -(lyricIndex)*82 +'rpx)'}">
								<!-- <view class="detail-lyric-item">测试文字</view> -->
								<!-- <view class="detail-lyric-item active">测试文文字测试文字</view> -->
								<view class="detail-lyric-item" :class="{active : lyricIndex == index}" v-for="(item,index) in songLyric" :key="index">{{item.lyric}}</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="mid-lyric">
					<scroll-view class="lyric-scroll" scroll-y="true">
						<p class="text" v-for="(item, index) in songLyric" :key="index">{{item.lyric}}</p>
					</scroll-view>
				</view>
			</view>
			<view class="bottom">
				<view class="progress-wrapper">
					<text class="left">{{showNowTime}}</text>
					<view class="center">
						<u-slider
							blockSize="12"
							activeColor="#3c9cff" inactiveColor="#999999"
							:max="max"
							v-model="nowTime"
							@change="handleDrag"
						></u-slider>
					</view>
					<text class="right">{{finalTime}}</text>
				</view>
				<view class="operators">
					<text @tap="changePlayMode" :class="'icon iconfont ' + playMode[modeIndex]" :style="modeIndex == 1 ? 'font-size: 23px' : ''"></text>
					<u-icon @tap="playPrevMusic" color="#fff" size="28" name="skip-back-left"></u-icon>
					<u-icon @tap="handlePlay" color="#fff" size="50" :name="isPlayRotate ? 'pause-circle' : 'play-circle'"></u-icon>
					<u-icon @tap="playNextMusic" color="#fff" size="28" name="skip-forward-right"></u-icon>
					<u-icon @click="openPlayList" color="#fff" size="28" name="list-dot"></u-icon>
				</view>
			</view>
		</view>
		<view v-show="mini" :class="'mini-player '+ theme" @click="openNormal">
			<view class="song-avatar">
				<img :class="{'detail-paly-run': isPlayRotate}" width="40" height="40" :src="songDetail.pic">
			</view>
			<view class="text">
				<h2 class="name">{{songDetail.name}}</h2>
				<p class="songer">{{songDetail.songer}}</p>
			</view>
			<view class="control" @click.stop="handlePlay">
				<u-icon size="26" color="#fff" :name="isPlayRotate ? 'pause-circle' : 'play-circle'"></u-icon>
			</view>
			<view class="control" @click.stop="openPlayList">
				<u-icon size="26" color="#fff" name="list-dot"></u-icon>
			</view>
		</view>
		<!-- 播放列表 -->
		<view class="play-list">
			<u-popup 
				:show="showList" 
				@close="closePlayList"
				bgColor="transparent"
				:overlayStyle="{background: 'rgba(0,0,0,.3)'}"
			>
				<view class="list-wrapper">
					<view class="list-header">
						<h1>当前播放</h1>
					</view>
					<view class="list-content">
						<scroll-view scroll-y="true" style="height: 642rpx;">
							<view @tap="playMusicByIndex(index)" :class="'item ' + (index == curIndex ? 'current' : '') " v-for="(item, index) in playlist" :key="index">
								<span v-if="index == curIndex" class="play">
									<u-icon color="#0a9cfe" name="volume"></u-icon>
								</span>
								<span class="text">
									<span class="name">{{item.name}} - </span>
									<span class="songer">{{item.singer}}</span>
								</span>
								<span @tap.stop="handleMusic('love', index)" class="love">
									<u-icon v-if="item.isLove" size="20" color="red" name="heart-fill"></u-icon>
									<u-icon v-else size="20" name="heart"></u-icon>
								</span>
								<span @tap.stop="handleMusic('delete', index)" class="delete">
									<u-icon size="20" name="trash"></u-icon>
								</span>
							</view>
						</scroll-view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import {songDetail, songLyric, songUrl} from '../../common/api.js'
	export default {
		name:"Player",
		data() {
			return {
				display: false,
				showPlayer: false,
				showLyric: false,
				close: false,
				songLyric: [],
				lyricIndex: 0,
				bgAudioManager:'',
				iconPlay:'icon-zanting',
				isPlayRotate: true,
				isLoading: true,
				max: 100,
				nowTime: 0,
				finalTime: 0,
				showFinalTime: 0,
				isDelete: false,
				playMode: ['icon-xunhuanbofang', 'icon-danquxunhuan', 'icon-suijibofang'],
				modeIndex: 0,
				
				musicState: false, // true为播放，false为未播放
				showList: false,
			}
		},
		computed: {
			...mapState(['theme', 'mini', 'songDetail', 'playlist', 'curIndex']),
			showNowTime() {
				const m = Math.floor(this.nowTime / 60)
				const s = Math.round(this.nowTime % 60)
				return `${m}:${s >= 10 ? s : '0'+s}`
			},
		},
		mounted() {
			console.log('mini', this.mini)
			// this.getMusic(19723756)
			
		},
		watch: {
			playlist(newVal, old) {
				console.log('playlist变化')
				if(!this.isDelete) {
					if(this.showPlayer == false) {
						this.showPlayer = true
					}
					this.openNormal()
					console.log('playlist变化')
					this.getMusic()
				}else {
					this.isDelete = false
				}
			}
		},
		methods: {
			...mapMutations(['setSongDetail', 'showMiniPlayer', 'setCurIndex']),
			openNormal() {
				this.display = true
				// console.log(this.songDetail)
			},
			closeNormal() {
				this.close = true
				this.showMiniPlayer()
				setTimeout(()=>{
					this.display = false
					this.close = false
				}, 280)
			},
			formatTimeToSec(time) {
				let arr = time.split(':')
				return (arr[0]*60) + +(+arr[1]).toFixed(1)
			},
			changeMusicState(e) {
				this.musicState = !this.musicState
			},
			changePlayMode() {
				this.modeIndex = (this.modeIndex + 1) % 3
			},
			openPlayList() { // 打开播放列表
				this.showList = true
			},
			closePlayList() {
				this.showList = false
				console.log('关闭播放列表', this.playlist)
				const loveList = uni.getStorageSync('loveList')
				const temp = [...this.playlist, ...loveList].map(item => item.id)
				console.log(temp)
				const newList = [...this.playlist, ...loveList].filter((item, index) => {
					// index == temp.indexOf(item.id) && item.isLove && console.log(index, item)
					return index == temp.indexOf(item.id) && item.isLove
				})
				console.log('新列表', newList)
				uni.setStorage({
					key: 'loveList',
					data: [...newList],
					success: function () {
						console.log('success, 收藏成功')
					},
					fail(e) {
						console.log('存储失败', e)
					}
				})
			},
			handleMusic(type, index) {
				console.log('点击操作', type, this.playlist[index])
				const item = this.playlist[index]
				if(type == 'love') {
					item.isLove = !item.isLove
				}else {
					this.isDelete = true
					this.playlist.splice(+index, 1)
					console.log(this.curIndex, index)
					if(index == this.curIndex) {
						this.playNextMusic()
					}else if(index < this.curIndex) {
						this.setCurIndex(this.curIndex - 1)
					}
				}
			},
			handlePlay(){
				console.log('play')
				if(this.bgAudioManager.paused){
					this.bgAudioManager.play()
					this.isPlayRotate = true
				}
				else{
					this.bgAudioManager.pause()
					this.isPlayRotate = false
				}
			},
			playMusicByIndex(index) {
				console.log('点击歌曲', index)
				this.setCurIndex(index)
				this.getMusic()
				this.closePlayList()
			},
			playNextMusic() {
				let next = (this.curIndex + 1) % this.playlist.length
				if(this.modeIndex == 1) { // 单曲循环
					this.getMusic()
					return
				}else if(this.modeIndex == 2) { // 随机播放
					next = Math.floor(Math.random() * this.playlist.length)
				}
				this.setCurIndex(next)
				this.getMusic()
			},
			playPrevMusic() {
				const len = this.playlist.length
				const prev = (this.curIndex - 1 + len) % len
				this.setCurIndex(prev)
				this.getMusic()
			},
			getMusic(){
				
				// console.log(this.playlist[this.curIndex])
				this.nowTime = 0
				this.isLoading = true;
				songDetail(this.playlist[this.curIndex].id).then(async (res)=>{
					let songDetail = res[1].data.result // 自己的里面没有
					if(!songDetail) {
						// console.log('123123', res[1])
						const url = await songUrl(res[1].data.songs[0].id)
						const lyric = await songLyric(res[1].data.songs[0].id)
						songDetail = {
							songId: res[1].data.songs[0].id, 
							name: res[1].data.songs[0].name, 
							songer: res[1].data.songs[0].ar.map(item=>item.name).join('/'),
							url: url[1].data.data[0].url || `https://music.163.com/song/media/outer/url?id=${res[1].data.songs[0].id}.mp3`,
							pic: res[1].data.songs[0].al.picUrl,
							lyric: lyric[1].data.lrc.lyric
						}
					}
					console.log('详情', songDetail)
					// 添加到最近播放
					const latestList = uni.getStorageSync('latestList')
					const newItem = this.playlist[this.curIndex]
					const ids = [newItem, ...latestList].map(item => item.id)
					const newList = [newItem, ...latestList].filter((item, index) => {
						return index == ids.indexOf(item.id)
					})
					console.log('最近播放', newList)
					uni.setStorage({
						key: 'latestList',
						data: [...newList],
						success: function () {
							console.log('添加到最近播放')
						}
					})
					
					this.setSongDetail(songDetail)
					
					let reg = /\[([^\]]+)\]([^\[]+)/g
					const result = []
					songDetail.lyric.replace(reg, ($0, $1, $2)=>{
						result.push({
							actualTime: $1.split('.')[0],
							time: this.formatTimeToSec($1), 
							lyric: $2,
						})
					})
					console.log('歌词', result)
					this.songLyric = result
					this.max = result[result.length-1].time
					this.finalTime = result[result.length-1].actualTime
					
					this.bgAudioManager = uni.getBackgroundAudioManager()
					this.bgAudioManager.title = songDetail.name;
					this.bgAudioManager.src =  `https://music.163.com/song/media/outer/url?id=${songDetail.songId}.mp3`
					
					console.log('url', songDetail.url)
					
					this.listenLyricIndex()
					this.bgAudioManager.onPlay(()=>{
						this.isPlayRotate = true
						this.listenLyricIndex()
						console.log('final', this.bgAudioManager)
						console.log('final', this.bgAudioManager.duration)
					});
					this.bgAudioManager.onPause(()=>{
						this.isPlayRotate = false;
						clearInterval(this.timer)
						clearInterval(this.nowTimer)
					});
					this.bgAudioManager.onEnded(()=>{
						console.log('完毕, ended触发')
						this.playNextMusic()
					})
					this.bgAudioManager.onError((e)=>{
						console.log('出错')
						this.bgAudioManager.src = songDetail.url
					})
					this.isLoading = false
					
				})
				// Promise.all([songDetail(songId),songLyric(songId),songUrl(songId)]).then((res)=>{
				// 	console.log(res)
				// 	if(res[0][1].data.code == '200'){
				// 		this.songDetail = res[0][1].data.songs[0];
				// 	}
				// 	if(res[1][1].data.code == '200'){
				// 		// this.songLyric = res[1][1].data.songs[0];
				// 		let lyric = res[1][1].data.lrc.lyric;
				// 		let re = /\[([^\]]+)\]([^\[]+)/g;
				// 		console.log(lyric.match(re))
				// 		var result = [];
				// 		lyric.replace(re,($0,$1,$2)=>{
				// 			result.push({"time":this.formatTimeToSec($1),"lyric":$2});
				// 		});
				// 		this.songLyric = result;
				// 		console.log(this.songLyric)
				// 	}
				// 	if(res[2][1].data.code == '200'){
				// 		// 背景音频，不是游戏的背景音乐，
				// 		// 而是类似QQ音乐那样，App在后台时，仍然在播放音乐。
				// 		// 如果你不需要在App切后台时继续播放，那么不应该使用本API，
				// 		// 而应该使用普通音频APIuni.createInnerAudioContext (opens new window)。
				// 		this.bgAudioManager = uni.getBackgroundAudioManager();
				// 		this.bgAudioManager.title = this.songDetail.name;
				// 		this.bgAudioManager.src = res[2][1].data.data[0].url || '';
				// 		this.listenLyricIndex();
				// 		this.bgAudioManager.onPlay(()=>{
				// 			this.iconPlay = "icon-zanting";
				// 			this.isPlayRotate = true;
				// 			this.listenLyricIndex();
				// 		});
				// 		this.bgAudioManager.onPause(()=>{
				// 			this.iconPlay = "icon-24gl-playCircle";
				// 			this.isPlayRotate = false;
				// 			clearInterval(this.timer)
				// 		});
				// 		this.bgAudioManager.onEnded(()=>{
				// 			this.getMusic(this.$store.state.nextId);
				// 		})
				// 	}
				// });
				// this.isLoading = false;
			},
			listenLyricIndex(){
				clearInterval(this.timer)
				clearInterval(this.nowTimer)
				this.timer = setInterval(()=>{
					for(var i = 0; i < this.songLyric.length; i++){
						if(this.bgAudioManager.currentTime > this.songLyric[this.songLyric.length-1].time){
							this.lyricIndex = this.songLyric.length-1;
							break;
						}
						if(this.bgAudioManager.currentTime < this.songLyric[i].time+0){
							this.lyricIndex = i - 1;
							// console.log("000",this.lyricIndex)
							break
						}
					}
					// console.log(this.lyricIndex)
				},500)
				this.nowTimer = setInterval(()=>{
					// console.log(111, this.max, this.nowTime)
					if(this.max > this.nowTime) {
						this.nowTime++
					}else {
						clearInterval(this.nowTimer)
					}
				},1000)
			},
			handleDrag(value) { // 拖动进度条
				console.log('拖动',value, this.bgAudioManager)
				this.bgAudioManager.seek(value)
				
			}
		}
	}
</script>

<style>
	@import url('@/common/iconfont.css');
	
	.normal-player {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 150;
		background: #222;
		animation: open .3s ease-out;
	}
	
	.normal-close {
		animation: close .3s ease-out;
	}
	
	@keyframes open {
		0% {
			opacity: 0;
			left: 0;
			bottom: 0;
			right: 100%;
			top: 100%;
		}
		
		100% {
			opacity: 1;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
		}
	}
	
	@keyframes close {
		0% {
			opacity: 1;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
		}
		100% {
			opacity: 0;
			left: 0;
			bottom: 0;
			right: 100%;
			top: 100%;
		}
	}
	
	.close {
		position: absolute;
		top: 54rpx;
		left: 26rpx;
		width: 40px;
		height: 40px;
	}
	
	.top {
		padding-top: 54rpx;
	}
	
	.top .title {
		width: 70%;
		margin: 0 auto;
		line-height: 26px;
		text-align: center;
		font-size: 18px;
		color: #fff;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.top .subtitle {
		line-height: 20px;
		text-align: center;
		font-size: 14px;
		color: #fff;
	}
	
	
	.normal-player .background {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: .6;
		filter: blur(20px);
	}
	
	.normal-player .background img {
		width: 100%;
		height: 100%;
	}
	
	.normal-player .middle {
		position: fixed;
		width: 100%;
		top: 160rpx;
		bottom: 280rpx;
		white-space: nowrap;
	}
	
	.normal-player .middle .mid-circle {
		width: 100%;
		height: 100%;
		text-align: center;
	}
	
	.normal-player .middle .mid-circle .container {
		width: 100%;
		height: 100%;
	}
	
	.detail-paly {
		width: 80%;
		height: 600rpx;
		background: url('http://www.skfd.xyz:2089/disc.png');
		background-size: cover;
		position: relative;
		top: 140rpx;
		left: 10%;
	}
	.detail-paly image{
		width: 370rpx;
		height: 370rpx;
		border-radius: 50%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		/* css3 */
		animation: 10s linear move infinite;
		animation-play-state: paused;
	}
	.detail-paly .detail-paly-run{
		animation-play-state: running;
	}
	@keyframes move{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	.detail-paly text{
		width: 100rpx;
		height: 100rpx;
		font-size: 100rpx;
		color: white;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	.detail-paly view{
		width: 185rpx;
		height: 259rpx;
		background: url('http://www.skfd.xyz:2089/needle.png');
		position: absolute;
		left: 118rpx;
		top: -122rpx;
		right: 0;
		margin: auto;
		background-size: cover;
		transform-origin: 40rpx top;
		transition: transform 0.4s;
	}
	
	.detail-paly view.pause {
		transform: rotate(-30deg);
	}
	
	.detail-lyric {
		margin-top: 138rpx;
		font-size: 32rpx;
		line-height: 82rpx;
		height: 164rpx;
		text-align: center;
		overflow: hidden;
		color: #6f6e73;
	}
	.detail-lyric-wrap{
		transition: .5s;
	}
	.detail-lyric-item{
		height: 82rpx;
	}
	.detail-lyric-item.active{
		color: white;
	}
	
	.normal-player .middle .mid-lyric {
		width: 80%;
		height: 100%;
		margin: 0 auto;
		overflow: hidden;
		text-align: center;
	}
	
	.normal-player .middle .mid-lyric .lyric-scroll {
		height: 100%;
	}
	
	.normal-player .middle .mid-lyric .lyric-scroll .text {
		line-height: 64rpx;
		color: rgba(255, 255, 255, 0.5);
		font-size: 28rpx;
	}
	
	/* bottom */
	.normal-player .bottom {
		position: absolute;
		bottom: 100rpx;
		width: 100%;
	}
	
	.normal-player .bottom .progress-wrapper {
		display: flex;
		width: 86%;
		margin: 0 auto;
		padding: 10rpx 0;
		align-items: center;
		color: #fff;
		font-size: 28rpx;
	}
	
	.normal-player .bottom .progress-wrapper .center{
		flex: 1;
	}
	
	.normal-player .bottom .operators {
		box-sizing: border-box;
		padding: 0 80rpx;
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
	}
	
	.normal-player .bottom .operators .icon {
		width: 60rpx;
		text-align: center;
		font-size: 26px;
		color: #fff;
	}
	
	.mini-player {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.mini-player .song-avatar {
		width: 40px;
		height: 40px;
		margin-left: 20px;
	}
	
	.mini-player .song-avatar img {
		width: 85rpx;
		height: 85rpx;
		border-radius: 50%;
		animation: 10s linear move infinite;
		animation-play-state: paused;
	}
	
	.mini-player .song-avatar img.detail-paly-run{
		animation-play-state: running;
	}
	
	.mini-player .text {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 44rpx;
		line-height: 40rpx;
		overflow: hidden;
	}
	
	.mini-player .text .name {
		margin-bottom: 2px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: 28rpx;
		color: #fff;
		font-weight: bold;
	}
	
	.mini-player .text .songer {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: 24rpx;
		color: #fff;
	}
	
	.mini-player .control {
		width: 30px;
		font-size: 50rpx;
		padding: 0 20rpx 0 10rpx;
		color: #fff;
	}
	
	.list-wrapper {
		box-sizing: border-box;
		width: 94%;
		margin: 0 auto;
		padding: 30rpx;
		margin-bottom: 20rpx;
		border-radius: 36rpx;
		height: 756rpx;
		background-color: #f5f5f5;
		overflow: hidden;
	}
	
	.list-wrapper .list-header {
		padding: 0 0 40rpx;
	}
	
	
	.list-wrapper .list-header h1 {
		font-size: 34rpx;
		font-weight: bold;
	}
	
	.list-wrapper .item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80rpx;
		
	}
	
	.list-wrapper .item.current {
		color: #0a9cfe;
	}
	
	.list-wrapper .item .play {
		width: 45rpx;
	}
	
	.list-wrapper .item.current .text {
		font-size: 30rpx;
		color: #0a9cfe;
	}
	
	.list-wrapper .item .text {
		display: flex;
		align-items: center;
		font-size: 32rpx;
		flex: 1;
		color: #050505;
	}
	
	.list-wrapper .item .text .name {
		display: inline-block;
		max-width: 300rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.list-wrapper .item .text .songer {
		font-size: 26rpx;
		margin-left: 10rpx;
		color: #515a6e;
	}
	
	.list-wrapper .item.current .text .songer {
		color: #0a9cfe;
	}
	
	.list-wrapper .item .love {
		width: 40rpx;
		margin-right: 30rpx;
	}
	
	.list-wrapper .item .delete {
		width: 40rpx;
	}
	
	
	
</style>