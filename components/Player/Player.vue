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
							<image :src="songDetail.al.picUrl" :class="{'detail-paly-run': isPlayRotate}" mode=""></image>
							<!-- :class="{iconPlay}" -->
							<text class="iconfont" :class="iconPlay"></text>
							<view></view>
						</view>
						<view class="detail-lyric">
							<view class="detail-lyric-wrap" :style="{transform : 'translateY('+ -(lyricIndex-1)*82 +'rpx)'}">
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
	import '@/common/iconfont.css' //图标引用
	import {songDetail, songLyric, songUrl} from '../../common/api.js'
	export default {
		data() {
			return {
				songDetail: {
					al:{
						picUrl:''
					}
				},
				songLyric:[],
				lyricIndex: 0,
				bgAudioManager:'',
				iconPlay:'icon-zanting',
				isPlayRotate: true,
				isLoading: true,
			}
		},
		components:{
		},
		onLoad(options){
			// console.log(options.songId)
			this.getMusic(options.songId)
		},
		onUnload(){
			clearInterval(this.timer);
		},
		onHide(){
			clearInterval(this.timer);
		},
		methods: {
			formatTimeToSec(value){
				let arr = value.split(':');
				return (Number(arr[0]*60)+Number(arr[1])).toFixed(1);
			},
			getMusic(songId){
				this.$store.commit('NEXT_ID',songId);
				this.isLoading = true;
				Promise.all([songDetail(songId),songLyric(songId),songUrl(songId)]).then((res)=>{
					console.log(res)
					if(res[0][1].data.code == '200'){
						this.songDetail = res[0][1].data.songs[0];
					}
					if(res[1][1].data.code == '200'){
						// this.songLyric = res[1][1].data.songs[0];
						let lyric = res[1][1].data.lrc.lyric;
						let re = /\[([^\]]+)\]([^\[]+)/g;
						console.log(lyric.match(re))
						var result = [];
						lyric.replace(re,($0,$1,$2)=>{
							result.push({"time":this.formatTimeToSec($1),"lyric":$2});
						});
						this.songLyric = result;
						console.log(this.songLyric)
					}
					if(res[2][1].data.code == '200'){
						// 背景音频，不是游戏的背景音乐，
						// 而是类似QQ音乐那样，App在后台时，仍然在播放音乐。
						// 如果你不需要在App切后台时继续播放，那么不应该使用本API，
						// 而应该使用普通音频APIuni.createInnerAudioContext (opens new window)。
						this.bgAudioManager = uni.getBackgroundAudioManager();
						this.bgAudioManager.title = this.songDetail.name;
						this.bgAudioManager.src = res[2][1].data.data[0].url || '';
						this.listenLyricIndex();
						this.bgAudioManager.onPlay(()=>{
							this.iconPlay = "icon-zanting";
							this.isPlayRotate = true;
							this.listenLyricIndex();
						});
						this.bgAudioManager.onPause(()=>{
							this.iconPlay = "icon-24gl-playCircle";
							this.isPlayRotate = false;
							clearInterval(this.timer)
						});
						this.bgAudioManager.onEnded(()=>{
							this.getMusic(this.$store.state.nextId);
						})
					}
				});
				this.isLoading = false;
			},
			handToPlay(){
				if(this.bgAudioManager.paused){
					this.bgAudioManager.play();
				}
				else{
					this.bgAudioManager.pause();
				}
			},
			listenLyricIndex(){
				clearImmediate(this.timer);
				this.timer = setInterval(()=>{
					for(var i = 0; i < this.songLyric.length; i++){
						// console.log('cur', this.bgAudioManager.currentTime);
						// console.log(i)
						// console.log('i', this.songLyric[i].time)
						// console.log('i+1', this.songLyric[i+1].time)
						// console.log(this.bgAudioManager.currentTime > Number(this.songLyric[i].time))
						// console.log(this.bgAudioManager.currentTime < Number(this.songLyric[i+1].time))
						if(this.bgAudioManager.currentTime > this.songLyric[this.songLyric.length-1].time){
							this.lyricIndex = this.songLyric.length-1;
							break;
						}
						if(this.bgAudioManager.currentTime > this.songLyric[i].time+0 
						&& this.bgAudioManager.currentTime < this.songLyric[i+1].time+0){
							// console.log('this',i)
							this.lyricIndex = i;
							console.log("000",this.lyricIndex);
						}
					}
					console.log(this.lyricIndex);
				},50)
			}
			
			
		}
	}
</script>

<style scoped>
	.detail-paly{
		width:580rpx;
		height: 580rpx;
		background: url(../../static/disc.png);
		background-size: cover;
		margin: 214rpx auto 0 auto;
		position: relative;
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
		width: 250rpx;
		height: 360rpx;
		background: url(../../static/needle.png);
		position: absolute;
		left: 108rpx;
		top: -200rpx;
		right: 0;
		margin: auto;
		background-size: cover;
	}
	
	.detail-lyric{
		font-size: 32rpx;
		line-height: 82rpx;
		height: 246rpx;
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
</style>
