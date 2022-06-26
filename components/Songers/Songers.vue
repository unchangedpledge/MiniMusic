<template>
	<view class="singer-content">
		<span class="iconfont icon-fenxiang"></span>
		<view scroll-y="true" class="singer-scroll">
			<view class="singer-top">
				<view class="category-country">
					<ul>
						<li 
							v-for="(item, index) in country" 
							:key="index" 
							:class="select.country == item ? 'active' : ''"
							@tap="changeCategory('country', item)"
						>{{item}}</li>
					</ul>
				</view>
				<view class="category-sex">
					<ul>
						<li 
							v-for="(item, index) in sex" 
							:key="index" 
							:class="select.sex == item ? 'active' : ''"
							@tap="changeCategory('sex', item)"
						>{{item}}</li>
					</ul>
				</view>
			</view>
			<text class="title">热门歌手</text>
			<u-list
				:scrollable="false"
				height="calc(100% - 97px);"
			>
				<u-list-item
					v-for="(item, index) in singers"
					:key="index"
					@tap="handleToList(item.name, item.avatar)"
				>
					<u-cell
						:title="item.name"
						size="large"
					>
						<u-avatar
							slot="icon"
							shape="circle"
							size="50"
							:src="item.avatar"
							customStyle="margin: -3px 15px -3px 0"
						></u-avatar>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>
		<List v-if="show" :singerName="singerName" :singerAvatar="singerAvatar" @backRank="back"/>
	</view>
</template>

<script>
	import {singerList} from '@/common/api.js'
	export default {
		name:"Songers",
		data() {
			return {
				singers: [],
				country: ['华语', '欧美', '日本', '韩国', '其他'],
				sex: ['男', '女', '组合/乐队'],
				select: {
					country: '华语',
					sex: '男'
				},
				show: false,
				singerName: null,
				singerAvatar: ''
				
			}
		},
		mounted() {
			this.getSingerList()
		},
		methods: {
			changeCategory(type, value) {
				this.select[type] = value
				this.getSingerList()
			},
			async getSingerList() {
				const type = this.select.country + this.select.sex
				console.log(type)
				const res = await singerList(type)
				console.log('singer', res[1].data.result)
				this.singers = res[1].data.result
			},
			handleToList(name, avatar) {
				this.show = true
				this.singerName = name
				this.singerAvatar = avatar
			},
			back() {
				this.show = false
			}
		}
	}
</script>

<style>
	.singer-content {
		width: 100%;
		height: 100%;
	}
	
	.singer-scroll {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.singer-top {
		padding: 16rpx 20rpx;
	}
	
	.singer-top view ul li {
		display: inline-block;
		padding: 10rpx 30rpx;
		font-size: 30rpx;
		color: #424242;
	}
	
	.singer-top view ul li.active {
		color: #333;
		font-weight: bold;
	}
	
	.singer-scroll text.title {
		display: block;
		background: rgba(51,51,51,.1);
		color: #8b8b8b;
		padding-left: 18rpx;
		font-size: 24rpx;
		height: 40rpx;
		line-height: 40rpx;
	}
	
</style>