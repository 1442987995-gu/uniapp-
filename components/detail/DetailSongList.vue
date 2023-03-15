<template>
	<view class="Top">
		<view class="head">
			<view class="headContent">
				<image src="../../static/运行.png" class="playImg" mode=""></image>
				<text class="text1">播放全部</text>
				<text class="text2">(共{{songList.songs.length}}首)</text>
			</view>
			<van-button type="danger" round class="button1">
				<image src="../../static/加号1.png" class="btnImg" mode=""></image>
				<text class="text3">收藏({{subscribedCount}})</text>
			</van-button>
		</view>
		<view class="musicList" v-for="(item,index) in songList.songs" :key="index">
			<view class="musicLeft" @click="playMusic(index)">
				<text>{{index+1}}</text>
				<view class="musicName">
					<text class="text4">{{item.name}}</text>
					<view class="singerName">
						<text v-for="(items,i) in item.ar" :key="i" class="text5">
							{{items.name}}
						</text>
					</view>
				</view>
			</view>
			<view class="musicRight">
				<image src="../../static/播放02.png" class="btn1Img" mode="" v-if="item.mv !=0"></image>
				<image src="../../static/列表2.png" class="btn2Img" mode=""></image>
			</view>
		</view>
		<view class="box"></view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		props:['songList','subscribedCount'],
		data() {
			return {
				
			}
		},
		methods: {
			playMusic(i){
				this.updatePlayList(this.songList.songs)
				this.updatePlatListIndex(i)
			},
			...mapMutations(['updatePlayList','updatePlatListIndex'])
		},
	}
</script>

<style scoped>
	.box{
		height: 120rpx;
		maring-top:20rpx
	}
.Top{
	position: relative;
	top:450rpx;
	width: 100%;
	height: 1000rpx;
	background-color: white;
	border-top-left-radius: 40rpx;
	border-top-right-radius: 40rpx;
}
.head{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
}
.head .headContent{
	display: flex;
	align-items: center;
}
.head .headContent .text1{
	margin-left: 30rpx;
}
.head .headContent .text2{
	margin-left: 10rpx;
	font-size: 24rpx;
}
.playImg{
	width: 70rpx;
	height: 70rpx;
}
.button1{
	/* width: 270rpx; */
	font-size: 20rpx;
}
.btnImg{
	width: 40rpx;
	height: 40rpx;
}
.btn1Img{
	width: 60rpx;
	height: 60rpx;
	margin-right: 20rpx;
}
.btn2Img{
	width: 60rpx;
	height: 60rpx;
}
.musicList{
	display: flex;
	font-size: 28rpx;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
}
.musicLeft{
	width:70%;
	display: flex;
	align-items: center;
}
.musicName{
	display: flex;
	flex-direction: column;
	margin-left: 28rpx;
}
.musicName .text5{
	font-size: 24rpx;
	color: #8a8a8a;
	padding-right: 10rpx;	
}
.singerName{
	display: flex;
}

</style>
