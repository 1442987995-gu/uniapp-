<template>
	<view class="musicList">
		<view class="musicTop">
			<text class="text1">发现好歌单</text>
			<view class="musicTopContent">
				<text>查看更多</text>
			</view>
		</view>
		<view class="musicContent">
			<swiper next-margin="230px">
				<swiper-item v-for="item in musicList" :key="item.id" >
					<image class="image1" :src="item.picUrl" @click="musicDetail" :data-newsid="item.id"></image>
					<text class="musicContents">{{item.name}}</text>
					<view class="iconItem">
						<image src="../../static/24gl-play (1).png"></image>
						<text>{{handleNumbers(item.playCount)}}</text>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				musicList:[]
			}
		},
		methods: {
			getMusicList(){
				//发情求
				uni.request({
					url: 'http://localhost:3000/personalized?limit=12',
					method: 'GET',
					data: {},
					success: res => {
						this.musicList = res.data.result
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//处理播放的数字
			handleNumbers(nums){
				if(nums>=1000000000){
					return (nums/1000000000).toFixed(1)+'亿'
				}else if(nums>=10000){
					return (nums/10000).toFixed(1)+'万'
				}else{
					return nums
				}
			},
			musicDetail(e){
				let newsid = e.currentTarget.dataset.newsid
				uni.navigateTo({
					url: '/pages/ItemMusic/ItemMusic?id='+newsid
				});
				
			}
		},
		mounted(){
			this.getMusicList()
		},
		onShow(){
			this.getMusicList()
		}
	}
</script>

<style>
.musicList{
	margin-top: 20rpx;
}
.musicTop{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 25rpx;
}
.musicTop .text1{
	font-weight: 900;
	font-size: 36rpx;
}
.musicTop .musicTopContent{
	width: 120rpx;
	height: 40rpx;
	border: 1px solid black;
	border-radius: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.musicTop .musicTopContent text{
	font-size: 22rpx;
}
swiper {
	width:93%;
	margin:0 25rpx 25rpx 25rpx;  
	height: 420rpx;
}
swiper swiper-item .image1{
	border-radius: 5px;
	width:220rpx;
	height:260rpx;
}
swiper swiper-item text{
	font-size: 24rpx;
}
swiper swiper-item .iconItem{
	position: relative;
	top:-340rpx;
	left:80rpx;
	display: flex;
}
swiper swiper-item .iconItem image{
	width: 30rpx;
	height: 30rpx;
}
swiper swiper-item .iconItem text{
	color:white;
	font-size: 24rpx;
}
</style>
