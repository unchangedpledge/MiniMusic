<template>
	<view class="recommend-content">
		<scroll-view scroll-y="true" style="height: 100%;">
			<view class="slider-wrapper">
				<u-swiper
					:list="banners"
					indicator
					indicatorMode="line"
					circular
					radius="0"
					@change="e => current = e.current"
				>
					<view
						slot="indicator"
						class="indicator"
					>
						<view
							class="indicator__dot"
							v-for="(item, index) in banners"
							:key="index"
							:class="[index === current && 'indicator__dot--active']"
						>
						</view>
					</view>
				</u-swiper>
			</view>
			<view class="recommend-list">
				<h1 :class="'list-title ' + theme">热门歌单推荐</h1>
				<view class="list-content">
					<u-grid
						:border="false"
						col="3"
					>
						<u-grid-item
							v-for="(listItem,listIndex) in list1"
							:key="listItem.id"
							@tap="handleToList(listItem)"
						>
							<u--image 
								:showLoading="true" 
								:src="listItem.coverImgUrl" 
								width="120px" 
								height="120px"
							></u--image>
							<text class="grid-text">{{listItem.name}}</text>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
			<view class="recommend-list">
				<h1 :class="'list-title ' + theme">精品歌单推荐</h1>
				<view class="list-content">
					<u-grid
						:border="false"
						col="3"
					>
						<u-grid-item
							v-for="(listItem, listIndex) in list2"
							:key="listItem.id"
							@tap="handleToList(listItem)"
						>
							<u--image 
								:showLoading="true" 
								:src="listItem.coverImgUrl" 
								width="120px" 
								height="120px"
							></u--image>
							<text class="grid-text">{{listItem.name}}</text>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
		</scroll-view>
		
		<List v-if="show" :name="name" :coverImgUrl="coverImgUrl" :description="description" :showList="showList" @backRank="backRank"/>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {playlist, banner} from '@/common/api.js'
	export default {
		name:"Recommend",
		data() {
			return {
				current: 0,
				banners: [],
				list1: [],
				list2: [],
				show: false,
				showList: 0,
				name: '',
				coverImgUrl: '',
				description: ''
			};
		},
		computed: {
			...mapState(['theme'])
		},
		mounted() {
			banner().then(res => {
				const banners = res[1].data.result
				console.log('banner', banners)
				this.banners = banners.map(item => item.pic)
				console.log(this.banners)
			})
			playlist().then(res => {
				const list = res[1].data.result
				console.log('歌单', list)
				this.list1 = list.slice(0, 6)
				this.list2 = list.slice(6)
			})
		},
		methods: {
			handleToList(item) {
				this.show = true
				// setTimeout(() => {
				// 	this.isLoading  = false
				// 	console.log('123')
				// }, 2000)
				this.showList = item.listId
				this.name = item.name
				this.coverImgUrl = item.coverImgUrl
				this.description = item.description
				
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

<style lang="scss">
	/* 指示点 */
	.indicator {
		@include flex(row);
		justify-content: center;

		&__dot {
			 height: 6px;
			 width: 6px;
			 border-radius: 100px;
			 background-color: rgba(255, 255, 255, 0.35);
			 margin: 0 5px;
			 transition: background-color 0.3s;
	
			&--active {
				 background-color: #ffffff;
			 }
		}
	}

	.indicator-num {
		padding: 2px 0;
		background-color: rgba(0, 0, 0, 0.35);
		border-radius: 100px;
		width: 35px;
		@include flex;
		justify-content: center;

		&__text {
			 color: #FFFFFF;
			 font-size: 12px;
		 }
	}
		
		
		
	.recommend-content {
		width: 100%;
		height: 100%;
	}

	.grid-text {
		margin-top: 5px;
		margin-bottom: 14px;
		font-size: 13px;
		line-height: 1.5;
		height: 40px;
		color: #515a6e;
		overflow: hidden;
	}

	.recommend-list .list-title {
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-size: 18px;
		font-weight: bold;
	}

</style>