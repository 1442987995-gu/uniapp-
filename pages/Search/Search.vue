<template>
	<view>
		<view class="searchTop">
			<image src="../../static/箭头_向左.png" class="arrow" @click="backs"></image>
			<input type="text" placeholder="请输入" @confirm="inputContent" v-model="searchContent" class="searchInput">
		</view>
		<view class="history">
			<view>
				<text class="text1">历史</text>
				<text class="text2" 
				v-for="(item,index) in historyRecord" 
				:key="index" @click="searchHistory(item)">{{item}}</text>
			</view>
			<image src="../../static/删除.png" class="delete" @click="deletes"></image>
		</view>
		<view class="musicList" v-for="(item,index) in searchList" :key="index">
			<view class="musicLeft" @click="updateIndex(item)">
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
		<ItemFoot></ItemFoot>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				historyRecord:[]
				,
				searchContent:'',
				searchList:[]
			}
		},
		methods: {
			inputContent(){
				if(this.searchContent!=""){
					this.historyRecord.unshift(this.searchContent)
					this.historyRecord = [...new Set(this.historyRecord)] 
					uni.setStorage({
						key: 'key',
						data:this.searchContent,
					});
				}
				//搜索请求
				uni.request({
					url: 'http://localhost:3000/cloudsearch?keywords='+this.searchContent,
					method: 'GET',
					data: {},
					success: res => {
						this.searchList = res.data.result.songs
						console.log(res);
					}
				});
				this.searchContent = ""
				
			},
			deletes(){
				let that = this
				uni.removeStorage({
					key: 'key',
					success(res) {
						that.historyRecord = []
					}
				});
			},
			backs(){
				console.log(1111);
				uni.navigateBack({
					delta:1,
				});
			},
			searchHistory(item){
				//搜索请求
				uni.request({
					url: 'http://localhost:3000/cloudsearch?keywords='+item,
					method: 'GET',
					data: {},
					success: res => {
						this.searchList = res.data.result.songs
					}
				});
			},
			updateIndex(item){
				this.pushPlayList(item)
				this.updatePlatListIndex(this.playList.length-1)
			},
			...mapMutations(['pushPlayList','updatePlatListIndex'])
		},
		computed:{
			...mapState(['playList'])
		},
		mounted(){
			let that = this
			uni.getStorage({
				key: 'key',
				success(res) {
					 that.historyRecord =[res.data]|| []
				}
			});
		}
	}
</script>

<style scoped>
.delete{
	width: 50rpx;
	height: 50rpx;
}
.searchTop{
	display: flex;
	align-items: center;
	padding: 20rpx;
}
.arrow{
	width: 60rpx;
	height: 60rpx;
}
.searchInput{
	margin-left: 20rpx;
	border-bottom: 1px solid #999;
	width: 90%;
}
.history{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
}
.text1{
	font-weight: 600;
}
.text2{
	margin-left:20rpx;
	padding: 10rpx;
	background-color:#cebcbc;
	border-radius: 30rpx;
	font-size: 26rpx;
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
.btn1Img{
	width: 60rpx;
	height: 60rpx;
	margin-right: 20rpx;
}
.btn2Img{
	width: 60rpx;
	height: 60rpx;
}
</style>
