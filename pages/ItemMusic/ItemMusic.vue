<template>
	<view>
	 <DetailTop :playlist="playlist"></DetailTop>
	 <DetailSongList :songList='songList' :subscribedCount="playlist.subscribedCount"></DetailSongList>
	 <ItemFoot></ItemFoot>
	</view>
</template>

<script>
	import DetailTop from '@/components/detail/DetailTop.vue';
	import DetailSongList from '@/components/detail/DetailSongList.vue';
	export default {
		data() {
			return {
				//歌单介绍
				playlist:{},
				//歌单详情列表
				songList:[]
			}
		},
		components:{
			DetailTop,
			DetailSongList
		},
		methods: {
			
		},
		onLoad(e){
			uni.request({
				url: 'http://localhost:3000/playlist/detail?id='+e.id,
				method: 'GET',
				data: {},
				success: res => {
					this.playlist = res.data.playlist
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: 'http://localhost:3000/playlist/track/all?id='+e.id+'&limit=10&offset=1',
				method: 'GET',
				data: {},
				success: res => {
					this.songList = res.data
				},
				fail: () => {
				},
				complete: () => {}
			});
		}
	}
</script>

<style>

</style>
