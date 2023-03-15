<template>
	<view class="iconList">
		<view class="iconItem">
			<image src="../../static/猫头鹰.png"></image>
			<text>每日推荐</text>
		</view>
		<view class="iconItem">
			<image src="../../static/电视.png"></image>
			<text>私人FM</text>
		</view>
		<view class="iconItem">
			<image src="../../static/歌单.png"></image>
			<text>歌单</text>
		</view>
		<view class="iconItem">
			<image src="../../static/排行榜歌曲.png"></image>
			<text>排行榜</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.iconList{
	width: 100%;
	height: 150rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
image{
	width: 100rpx;
	height: 100rpx;
}
.iconList .iconItem{
	width: 25%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	
}
.iconList .iconItem text{
	font-size: 30rpx;
}
</style>
