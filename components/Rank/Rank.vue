<template>
	<view>
		<view class="index-list">
			<view class="index-list-item" v-for = "(item,index) in topList" :key = "index" @tap="handleToList(item.id)">
				<view class="index-list-img">
					<image :src="item.coverImgUrl"></image>
					<text>{{item.updateFrequency}}</text>
				</view>
				<view class="index-list-text">
					<view v-for="(item,index) in item.tracks" :key="index">
						{{index+1}}.{{item.first}}-{{item.second}}
					</view>
				</view>
			</view>
		</view>
		<List v-if="show" :showList="showList" @backRank="backRank"/>
	</view>
</template>

<script>
	import {topList} from '@/common/api.js'
	import List from '@/components/List/List.vue'
	export default {
		name: "Rank",
		data() {
			return {
				topList: [],
				show: false,
				playlist:{
					coverImgUrl:'',
					creator:{
						avatarUrl:''
					},
					trackCount:'',
					privileges:'',
					
				},
				isLoading: false,
				showList: 0,
			}
		},
		components: {List},
		mounted() {
			console.log('123', this)
			topList().then((res)=>{
				if(res.length){
					this.topList = res;
					console.log(res)
				}
			})
		},
		methods: {
			handleToList(id) {
				this.show = true
				// setTimeout(() => {
				// 	this.isLoading  = false
				// 	console.log('123')
				// }, 2000)
				this.showList = id
				// list(id).then((res)=>{
				// 	console.log(res)
				// 	if(res[1].data.code == '200'){
				// 		this.playlist = res[1].data.playlist
				// 		this.privileges = res[1].data.privileges
				// 		this.isLoading = false
				// 		console.log(this.playlist)
				// 	}
					
				// })
			},
			backRank() {
				this.show = false
				console.log(this.show)
			}
		}
	}
</script>

<style>
	.index-list {
		margin: 40rpx 30rpx;
	}
	.index-list-item{
		display: flex;
		margin-bottom: 34rpx;
	}
	.index-list-img{
		width: 212rpx;
		height: 212rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 22rpx;
	}
	.index-list-img image{
		width: 100%;
		height: 100%;
	}
	.index-list-img text{
		position: absolute;
		left: 12rpx;
		bottom: 16rpx;
		color: white;
		font-size: 20rpx;
	}
	.index-list-text{
		font-size: 24rpx;
		line-height: 66rpx;
	}
	.index-list-text view {
		max-width: 360rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
</style>