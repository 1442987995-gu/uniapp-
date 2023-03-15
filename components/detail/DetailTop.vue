<template>
	<view class="">
		<view class="ItemMusicTop">
			<img :src="playlist.coverImgUrl" class="bgimg" alt="">
			<view class="itemLfet">
				<img src="../../static/箭头-左.png" class="img1" @click="backs" alt="">
				<text>歌单</text>
			</view>
			<view class="itemRight">
				<img src="../../static/搜索 (3).png" class="img1" alt="">
				<img src="../../static/3.1列表 (1).png" class="img1" alt="">
			</view>
		</view>
		<view class="ItemMusicContent">
			<img :src="playlist.coverImgUrl" class="bgimg2" alt="">
			<view class="ItemMusicContentRight">
				<text class="text2">{{playlist.name}}</text>
				<view class="headImg">
					<img :src="playlist.creator.backgroundUrl" class="bgimg3" alt="">
					<text class="text3">{{playlist.creator.nickname}} ></text>
				</view>
				<text class="text4">{{playlist.name}}</text>
			</view>		
		</view>
		<view class="ItemMusicFoot">
			<view class="iconItem">
				<image src="../../static/信息 (1).png"></image>
				<text>{{playlist.commentCount}}</text>
			</view>
			<view class="iconItem">
				<image src="../../static/分享.png"></image>
				<text>{{playlist.shareCount}}</text>
			</view>
			<view class="iconItem">
				<image src="../../static/下载.png"></image>
				<text>下载</text>
			</view>
			<view class="iconItem">
				<image src="../../static/多选选中_o.png"></image>
				<text>多选</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		props:['playlist'],
		data() {
			return {
			}
		},
		methods: {
			backs(){
				console.log(1111);
				uni.navigateBack({
					delta:1,
				});
			}
		}
	}
</script>

<style scoped>
.bgimg{
	width:100%;
	height:1200rpx;
	position: fixed;
	z-index: -2;
	filter: blur(20px);
	}
.bgimg2{
	width:240rpx;
	height:240rpx;
	position:absolute;
	border-radius: 8px;
}
.bgimg3{
	width:50rpx;
	height:50rpx;
	border-radius:50%;
}
.ItemMusicTop{
	position: relative;
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* padding: 20rpx; */
}
.ItemMusicTop .img1{
	width: 40rpx;
	height: 40rpx;
}
.itemLfet{
	width: 25%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	margin: 40rpx 20rpx 0 20rpx;
}
.itemLfet text{
	color: white;
	font-size: 36rpx;
}
.itemRight{
	margin-right:40rpx;
	width: 25%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	margin: 40rpx 20rpx 0 20rpx;
}
.ItemMusicContent{
	top:20rpx;
	position: relative;
	padding:0 20rpx 0 20rpx;
}
.ItemMusicContentRight{
	position: absolute;
	left:300rpx;
	padding-right: 10rpx;
	display: flex;
	flex-flow:column;
}
.text2{
	color: white;
	font-weight: 500;
}
.headImg{
	margin-top:20rpx;
	
	display: flex;
	align-items: center;
}
.headImg text{
	margin-left: 20rpx;
	color: gainsboro;
	font-size: 26rpx;
}
.text4{
	width: 400rpx;
	margin-top: 20rpx;
	color: gainsboro;
	font-size: 20rpx;
	margin-left:0;
	overflow: hidden;
}
.ItemMusicFoot{
	position: absolute;
	top:400rpx;
	width: 100%;
	height: 150rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.ItemMusicFoot  .iconItem{
	width: 25%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	
}
.ItemMusicFoot  .iconItem text{
	color: white;
	margin-top:10rpx;
}
image{
	width: 50rpx;
	height: 50rpx;
}
</style>
