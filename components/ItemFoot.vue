<template>
	<view class="itemFoot">
		<view class="footLeft" @click="bounceDetail">
			<img :src="playList[playListIndex].al.picUrl" alt="">
			<view class="footLeftText">
				<text>{{playList[playListIndex].name}}</text>
				<text>横滑切换上下首哦</text>
			</view>
		</view>
		<view class="footRight" >
			<img src="/static/24gl-playCircle.png" @click="playMusic" v-if="IsbtnShow" >
			<img src="/static/播放.png" @click="playMusic2" v-else>
			<img src="/static/24gf-playlistMusic.png" alt="">
		</view>
		<!-- <audio  :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio> -->
		<van-popup
		  :show="detailShow"
		  position="right"
		  custom-style="height: 100%;width:100%;"
		  @close="!detailShow"
		>
		    <ItemMusicDetail :playMusic="playMusic" :playMusic2="playMusic2" :updateTimes="updateTimes" :addDuration="addDuration" ></ItemMusicDetail>
		</van-popup>
	</view>
	
</template>

<script>
	import ItemMusicDetail from 'components/detail/ItemMusicDetail.vue'
	const audio = uni.createInnerAudioContext();
	import {
		mapState,mapMutations
	} from 'vuex'
	export default {
		name: "ItemFoot",
		data() {
			return {
				show:false,
				lyric:{},
				interVal:0
			}
		},
		computed: {
			...mapState(['playList', 'playListIndex','IsbtnShow','detailShow'])
		},
		components:{
			ItemMusicDetail
		},
		methods: {
			
			//播放按钮		
			playMusic() {
				audio.src = "https://music.163.com/song/media/outer/url?id=" + this.playList[this.playListIndex].id + ".mp3";
				audio.play()
				this.$store.dispatch('isbtnShow',false)	
				this.updateTimes()
			},
			//暂停按钮
			playMusic2(){
				audio.src = "https://music.163.com/song/media/outer/url?id=" + this.playList[this.playListIndex].id + ".mp3";
				audio.pause()
				this.$store.dispatch('isbtnShow',true)
				clearInterval(this.interVal)
			},
			//跳转到详情页
			bounceDetail(){
			   this.updateMusicDetail(this.playList[this.playListIndex])
			   this.updateDetailShow()
			},
			addDuration(){
				audio.onCanplay(()=>{
					this.updateDuration(audio.duration)
				})
					
					
			},
			...mapMutations(['updateMusicDetail','updateDetailShow','updateCurrentTime','updateDuration']),
			//更新当前时间
			updateTimes(){
				this.interVal = setInterval(()=>{
					this.updateCurrentTime(audio.currentTime)
				},100)
				
			}
		},
		watch:{
			playListIndex(){ 
				//点击切换列表其他歌曲
				// if(audio.paused){
				// 	// audio.play()
				// 	// this.$store.dispatch( 'isbtnShow',false)
				// }
				// this.getLyric()
				//获取歌词
				this.playMusic()
				this.$store.dispatch('getLyric',this.playList[this.playListIndex].id)
				this.addDuration()
			}
		},
		mounted(){
			//获取歌词
			this.$store.dispatch('getLyric',this.playList[this.playListIndex].id)
			this.addDuration()
		},
		updated(){
			
		}
	}
</script>

<style scoped>
	.itemFoot {
		width: 100%;
		height: 120rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		border-top: 1px solid #999;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.footLeft img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.footLeft {
		width: 60%;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
	}

	.footLeft .footLeftText {
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
	}

	.footRight img {
		width: 60rpx;
		height: 60rpx;
	}

	.footRight {
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
</style>
