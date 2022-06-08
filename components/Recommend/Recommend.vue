<template>
	<view class="recommend-content">
		<scroll-view scroll-y="true" style="height: calc(100vh - 80px);">
			<view class="slider-wrapper">
				<u-swiper
					:list="list3"
					indicator
					indicatorMode="line"
					circular
					radius="0"
				></u-swiper>
			</view>
			<view class="recommend-list">
				<h1 class="list-title">热门歌单推荐</h1>
				<view class="list-content">
					<u-grid
						:border="false"
						col="3"
					>
						<u-grid-item
							v-for="(listItem,listIndex) in list"
							:key="listIndex"
							
						>
							<u--image 
								:showLoading="true" 
								:src="listItem.src" 
								width="120px" 
								height="120px"
							></u--image>
							<text class="grid-text">{{listItem.title}}</text>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
			<view class="recommend-list">
				<h1 class="list-title">精品歌单推荐</h1>
				<view class="list-content">
					<u-grid
						:border="false"
						col="3"
					>
						<u-grid-item
							v-for="(listItem,listIndex) in list"
							:key="listIndex"
							
						>
							<u--image 
								:showLoading="true" 
								:src="listItem.src" 
								width="120px" 
								height="120px"
							></u--image>
							<text class="grid-text">{{listItem.title}}</text>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		name:"Recommend",
		data() {
			return {
				list3: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
				list: [{
						name: 'photo',
						title: '“释怀吧，不要再执着于没有结果的事了”',
						src: 'https://p2.music.126.net/atId2GxUYiN-trL9KewAzA==/109951167235207040.jpg'
					},
					{
						name: 'lock',
						title: '“释怀吧，不要再执着于没有结果的事了”',
						src: 'https://p2.music.126.net/atId2GxUYiN-trL9KewAzA==/109951167235207040.jpg'
					},
					{
						name: 'star',
						title: '星星',
						src: 'https://p2.music.126.net/atId2GxUYiN-trL9KewAzA==/109951167235207040.jpg'
					},
					{
						name: 'hourglass',
						title: '“释怀吧，不要再执着于没有结果的事了”',
						src: 'https://p2.music.126.net/atId2GxUYiN-trL9KewAzA==/109951167235207040.jpg'
					},
					{
						name: 'home',
						title: '“释怀吧，不要再执着于没有结果的事了”',
						src: 'https://p2.music.126.net/atId2GxUYiN-trL9KewAzA==/109951167235207040.jpg'
					},
					{
						name: 'star',
						title: '音量',
						src: 'https://p2.music.126.net/atId2GxUYiN-trL9KewAzA==/109951167235207040.jpg'
					},
				]
			};
		}
	}
</script>

<style>
.recommend-content {
	width: 100%;
	height: 0;
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