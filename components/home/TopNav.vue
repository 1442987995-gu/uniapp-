<template>
	<view class="TopNav">
		<view class="">
			<van-icon name="wap-nav" size="25"/>
		</view>
		<view class="centers">
			<text @click="infoUser">我的</text>
			<text class="actives">发现</text>
			<text>云村</text>
			<text>视频</text>
		</view>			
		<view class="" >
			<van-icon @click="searchPage" name="search" size="25"/>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			searchPage(){
				uni.navigateTo({
					url: '/pages/Search/Search',
					success: res => {
						console.log(11111);
					},
					fail: () => {
						console.log(22222);
					},
					complete: () => {}
				});
			},
			infoUser(){
				if(this.isLogin){
					uni.navigateTo({
						url: '/pages/InfoUser/InfoUser',
						success: res => {
							console.log(11111);
						},
						fail: () => {
							console.log(22222);
						},
					});
			    }else{
					uni.navigateTo({
						url: '/pages//Login/Login',					
					});
				}
			}
		},
		computed:{
			...mapState(['isLogin'])
		}
	}
</script>

<style scoped>
.TopNav{
	display:flex;
	justify-content: space-between;
	padding:20rpx 25rpx 0px 25rpx;
	height: 50rpx;
	align-items: center;
}
.centers{
	width: 65%;
	height: 100%;
	display: flex;
	justify-content: space-around;
}
text{
	font-size: 30rpx;
}
.actives{
	font-weight: 900;
}
</style>
