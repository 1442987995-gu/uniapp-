<template>
	<view class="detail">
		<img :src="musicList.al.picUrl" alt="" class="bgimg"> 
		<view class="detailTop">		   
			<view class="detailTopLeft">
				<img  src="/static/左箭头.png" alt="" @click="updateDetailShows" >
				<view class="text1">
					<text class="text2">{{musicList.name}}</text>
					<text class="text3" v-for="(item,index) in musicList.ar" :key="index">{{item.name}}></text>
				</view>
			</view>
			<view class="detailTopRight">
				<img src="/static/分享 (1).png" alt="">
			</view>
		</view>
		<view class="detailContent" v-show="isLyricShow" >
			<img src="/static/needle-ab.png" class="imgs1"  :class="{imgs1_active:!IsbtnShow}" alt="">
			<img :src="musicList.al.picUrl" alt="" class="bgimg2" :class="{img_ar_active:!IsbtnShow,img_ar_pause:IsbtnShow}" @click="changeLyric" > 
			<img src="/static/cd.png" class="img2" alt="" :class="{img_ar_active:!IsbtnShow,img_ar_pause:IsbtnShow}">
		</view>
		<view class="musicLyric" ref="musicLyric" v-if="!isLyricShow" @click="changeLyric">
			<p  id="sb" class="lyrics" v-for="(item,index) in lyric" :key="index" 
			:class="{active:(currentTime*1000>=item.time&&currentTime*1000<item.pre)}" >{{item.lrc}}</p>
			<!-- currentTime*1000>=item.time && currentTime*1000<item.pre -->
		</view >
		<view class="detailFoot">
			<view class="footTop">
				<img src="/static/爱心.png" class="img1" alt="">
				<img src="/static/下载 (1).png" class="img1" alt="">
				<img src="/static/黑胶唱片.png" class="img1" alt="">
				<img src="/static/信息 (2).png" class="img1" alt="">
				<img src="/static/列表-44.png" class="img1" alt="">
			</view>
			<view class="footContent">
				<slider value="60" @change="sliderChange" block-size="12" step="0.05" activeColor="#007AFF" min="0" :max="duration" v-model="currentTime"/>
			</view>
			<view class="foot">
				<img src="/static/单循环.png"  alt="">
				<img src="/static/上一首 上一个.png" @click="nextMusic(-1)" alt="">
				<img src="/static/播放 (1).png" class="img3" v-if="IsbtnShow" @click="playMusic" alt="">
				<img src="/static/暂停.png" class="img3" @click="playMusic2" v-else alt="">
				<img src="/static/下一个 下一首.png"  alt="" @click="nextMusic(1)">
				<img src="/static/3.1列表 (1).png"  alt="">
			</view>
		</view>
	</view>
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		props:['playMusic','playMusic2','updateTimes','addDuration'],
		data() {
			return {
				isLyricShow:true,
				show:true
			}
		},	
		methods: {
			...mapMutations(['updateDetailShow','updateCurrentTime','updatePlatListIndex','updateMusicDetail','updateDuration']),
			changeLyric(){
				this.isLyricShow = !this.isLyricShow
			},
			updateDetailShows(){
				this.isLyricShow = true
				this.updateDetailShow()
			},
			//切换下一首
			nextMusic(num){
				let index = this.playListIndex + num
				if(index<0){
					index = this.playList.length-1
				}else if(index==this.playList.length-1){
					index = 0
				}
				this.updatePlatListIndex(index)
				this.updateMusicDetail(this.playList[index])
				this.playMusic()
			}
			
		},
		mounted(){
			this.addDuration()
		},
		computed:{
			...mapState(['musicList','IsbtnShow','detailShow','playList', 'playListIndex','lyricList','currentTime','duration']),
			 //对歌词进行处理
			lyric(){
				let arr;
				if(this.lyricList.lyric){
					arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
						let min = item.slice(1,3)
						let sec = item.slice(4,6)
						let mill = item.slice(7,10)
						let lrc = item.slice(11,item.length)
						//总的毫秒数
						let time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
						if(isNaN(Number(mill))){
							mill = item.slice(7,9)
							lrc = item.slice(10,item.length)
							let time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
						}
						return {min,sec,mill,lrc,time}
					})
					arr.forEach((item,i)=>{
						if(i===arr.length-1 || isNaN(arr[i+1].time)){
							item.pre=100000
						}else{
							item.pre = arr[i+1].time
						}
					})
				}
				return arr
			}
		},
		watch:{
			currentTime(newValue){
					const query = uni.createSelectorQuery().in(this);
					query.select('#sb.active').boundingClientRect(data => {
					  // console.log("得到布局位置信息" + JSON.stringify(data));
					  // console.log("节点离页面顶部的距离为" + data.top);
					  // data.scrollOffset(res => {
					  //   console.log("竖直滚动位置" + res.scrollTop);
					  // }).exec();
					}).exec();
					if(newValue===this.duration){
						if(this.playListIndex==this.playList.length-1){
							this.updatePlatListIndex(0)
							this.updateMusicDetail(this.playList[index])
							this.playMusic()
						}else{
							this.updatePlatListIndex(this.playListIndex+1)
						}
					}
					
				// let p = uni.createSelectorQuery().selectAll('p.active')
				// if(p.offsetTop>300){
				// 	this.$refs.musicLyric.scrollTop = p.offsetTop-300
				// }
			}
		}
	}
</script>

<style scoped>
.musicLyric .active{
	font-size: 32rpx;
	color: #fff;
}
.musicLyric{
	position: absolute;
	width: 100%;
	height:700rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: scroll;
	margin-top: 40rpx;
}
p{
	font-size: 26rpx;
	margin-bottom: 40rpx;
	color:rgb(190,181,181)
}
.detailTop{
		width:100%;
		height:100%;
		display: flex;
		justify-content: space-between;
	}
.detailTopLeft{
	display: flex;
	width: 70%;
	padding: 20rpx;
	align-items: center;
}
.detailTopRight{
	display: flex;
	padding: 20rpx;
	align-items: center;
}
.detailTopLeft img,.detailTopRight img{
	width: 70rpx;
	height: 70rpx;
}
.bgimg{
	width: 100%;
	height:100%;
	position: absolute;
	filter: blur(70px);
	z-index: -1;
}
.text1{
	display: flex;
	flex-direction: column;
	padding-left: 40rpx;
	padding-top: 30rpx;
}
.text1 .text2{
	color: #fff;
}
.text1 .text3{
	color:#8a8a8a;
	font-size: 26rpx;
}
.detailContent .imgs1{
	position: absolute;
	width: 200rpx;
	height: 300rpx;
	top:110rpx;
	left:45%;
	transition: 1s linear all;
	transform: rotate(-12deg);
}
.detailContent .imgs1_active{
	position: absolute;
	width: 200rpx;
	height: 300rpx;
	top:110rpx;
	left:45%;
	transition: 1s linear all;
	transform: rotate(9deg);
}
.detailContent .img2{
	position: absolute;
	width: 450rpx;
	height: 450rpx;
	bottom:440rpx;
	left:20%;
	z-index: -1;
	animation: rotate_ar 15s linear infinite;
}
.bgimg2{
	position: absolute;
	width: 300rpx;
	height: 300rpx;
	bottom:510rpx;
	left:30%;
	z-index: 1;
	border-radius: 50%;
	animation: rotate_ar 15s linear infinite;
}
.detailContent .img_ar_active{
	animation-play-state: running;
}
.img_ar_pause{
	animation-play-state: paused;
}
@keyframes rotate_ar {
	0%{
		transform: rotateZ(0deg);
	},
	100%{
		transform: rotateZ(360deg);
	}
}

.detailFoot{
	width: 100%;
	margin-top: 900rpx;
}
.footTop{
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.footTop img{
	width: 60rpx;
	height: 60rpx;
}
.foot{
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.foot img{
	width: 60rpx;
	height: 60rpx;
}
.detailFoot .foot .img3{
	width: 90rpx;
	height: 90rpx;
}
.footContent{
	margin:40rpx 40rpx;
}

</style>
