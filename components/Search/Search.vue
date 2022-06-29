<template>
	<view class="search" style="height: 100%">
		<view class="container" style="height: 100%">
			<scroll-view scroll-y="true" style="height: 100%">
				<view class="search-search">
					<text class="iconfont icon-Magnifier"></text>
					<input type="text" placeholder="歌曲搜索" v-model="searchWord" @confirm="handleToSearch(searchWord)"/>
					<text class="iconfont icon-guanbi" v-if="searchType != 1" @tap="handleToClose"></text>
				</view>
				<block v-if="searchType == 1">
					<view class="search-history">
						<view class="search-history-head">
							<text>历史记录</text>
							<text class="iconfont icon-shanchu" @tap="handleToClear"></text>
						</view>
						<view class="search-history-list">
							<view v-for="(item,index) in searchHistory" :key="index"
							@tap="handleToword(item)">{{item}}</view>
						</view>
					</view>
					<view class="search-hot">
						<view class="search-hot-head">热搜榜</view>
						<view class="search-hot-item" v-for="(item,index) in searchHot" :key="index" 
						@tap="handleToword(item.searchWord)">
							<view class="search-hot-top">{{index+1}}</view>
							<view class="search-hot-word">
								<view>
									{{item.searchWord}}<image :src="item.iconUrl" mode="aspectFit"></image>
								</view>
								<view>{{item.content}}</view>
							</view>
							<text class="search-hot-count">{{item.score}}</text>
						</view>
					</view>
				</block>
				<block v-if="searchType == 2">
					<view class="search-result">
						<view v-if="searchList.length" class="search-result-item" v-for="(item,index) in searchList"
							:key="index" @tap="handleToDetail(index)">
							<view class="search-result-word">
								<view>{{item.name}}</view>
								<view>{{item.songer}}</view>
							</view>
							<text class="iconfont icon-24gl-playCircle"></text>
						</view>
						<view v-if="!searchList.length">
							<u-empty
								mode="search"
							></u-empty>
						</view>
						
					</view>
				</block>
			</scroll-view>
		</view>	
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	import {searchHot,searchWord,searchSuggest} from '@/common/api.js'
	import '@/common/iconfont.css' //图标引用
	export default {
		data() {
			return {
				searchHot:[],
				searchWord:'',
				searchHistory:[],
				searchType: 1,
				searchList:[]
			}
		},
		mounted(){
			searchHot().then((res)=>{
				// console.log(res)
				if(res[1].data.code == '200'){
					this.searchHot = res[1].data.data;
				}
			});
			uni.getStorage({
				key: 'searchHistory',
				success:(res)=>{
					this.searchHistory = res.data;
				}
			})
		},
		components:{
		},
		methods: {
			// ...mapMutations(['updatePlaylist', 'setCurIndex']),
			handleToword(word){
				this.searchWord = word
				this.handleToSearch(word)
			},
			handleToSearch(word){
				this.searchHistory.unshift(word);
				this.searchHistory = [...new Set(this.searchHistory)]
				if(this.searchHistory.length > 10){
					this.searchHistory.length = 10;
				}
				uni.setStorage({
					key:'searchHistory',
					data: this.searchHistory
				});
				this.getSearchList(word)
			},
			handleToClear(){
				uni.removeStorage({
					key: 'searchHistory',
					success:(res)=>{
						this.searchHistory = []
					}
				})
			},
			getSearchList(word){
				searchWord(word).then((res)=>{
					console.log('搜索结果', res[1].data)
					this.searchList = res[1].data.result.map(({songId, ...item}) => ({id: songId, ...item}));
					this.searchType = 2;
				})
			},
			handleToClose(){
				this.searchWord = '';
				this.searchType = 1;
			},
			handleToDetail(index){
				// this.updatePlaylist(this.searchList)
				// this.setCurIndex(index)
			}
			
		}
	}
</script>

<style>
	.search-search{
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 50rpx 30rpx;
		background: #f7f7f7;
		border-radius: 50rpx;
	}
	.search-search text{
		margin: 0 26rpx;
	}
	.search-search input{
		flex: 1;
		font-size: 26rpx;		
	}
	.search-history{
		margin: 0 30rpx 50rpx 30rpx;
		font-size: 26rpx;
	}
	.search-history-head{
		display: flex;
		justify-content: space-between;
		margin-bottom: 36rpx;
	}
	.search-history-list{
		display: flex;
		flex-wrap: wrap;
	}
	.search-history-list view{
		padding: 16rpx 28rpx;
		border-radius: 40rpx;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
		background: #f7f7f7;
	}
	.search-hot{
		margin: 0 30rpx;
		font-size: 26rpx;
	}
	.search-hot-head{
		margin-bottom: 36rpx;
	}
	.search-hot-item{
		display: flex;
		align-items: center;
		margin-bottom: 58rpx;
	}
	.search-hot-top{
		color: #fb2222;
		width: 60rpx;
		margin-left: 8rpx;
	}
	.search-hot-word{
		flex:1;
	}
	.search-hot-word view:nth-child(1){
		font-size: 30rpx;
		color: black;
	}
	.search-hot-word view:nth-child(2){
		font-size: 24rpx;
		color: #878787;
	}
	.search-hot-word image{
		width: 48rpx;
		height: 22rpx;
	}
	.search-hot-count{
		color: #878787;
	}
	
	.search-result{
		border-top: 2rpx #e4e4e4 solid;
		padding: 30rpx;
	}
	.search-result-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
		border-bottom: 2rpx #e4e4e4 solid;
	}
	.search-result-word view:nth-child(1){
		font-size: 28rpx;
		color: #235790;
		margin-bottom: 12rpx;
	}
	.search-result-word view:nth-child(2){
		font-size: 22rpx;
		color: #898989;
	}
	.search-result-item text{
		font-size: 50rpx;
	}
</style>
