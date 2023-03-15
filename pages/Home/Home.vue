<template>
	<view class="">
		<TopNav></TopNav>
		<SwiperTop></SwiperTop>
		<IconList></IconList>
		<MusicList></MusicList>
		<ItemFoot></ItemFoot>
	</view>
</template>

<script>
	import TopNav from '@/components/home/TopNav.vue';
	import SwiperTop from '@/components/home/SwiperTop.vue';
	import IconList from '@/components/home/IconList.vue';
	import MusicList from '@/components/home/MusicList.vue';
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components:{
			TopNav,
			SwiperTop,
			IconList,
			MusicList
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
