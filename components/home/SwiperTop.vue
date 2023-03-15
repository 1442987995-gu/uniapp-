<template>
	<view>
		<swiper circular indicator-dots indicator-color="rgba(0,0,0,.3)" indicator-active-color="rgba(255, 255, 255)" autoplay>
			<!-- v-for循环遍历数组 -->
			<swiper-item v-for="item in swipers" ><image :src="item.pic"></image></swiper-item>
		</swiper>
   </view>
</template>

<script>
	export default {
		data() {
			return {
				swipers:[]

			}
		},
		methods: {
			
		},
		mounted(){
			uni.request({
				url: 'http://localhost:3000/banner?type=2',
				method: 'GET',
				data: {},
				success: res => {
					this.swipers = res.data.banners
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
</script>

<style scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
	border-radius: 15rpx;
  }
swiper{
	width:93%;
	margin:25rpx;  
	height: 300rpx;
	border-radius: 15rpx;
  }
swiper swiper-item image{
	width: 100%;
	height:300rpx;
	border-radius: 15rpx;
}
</style>
