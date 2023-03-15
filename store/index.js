import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
    
const store =  new Vuex.Store({
	actions:{
		isbtnShow({commit},context){
			commit('ISBTNSHOW',context)
		},
		getLyric(context,value){
			uni.request({
				url: 'http://localhost:3000/lyric?id='+value,
				method: 'GET',
				data: {},
				success: res => {
				    context.commit('updateLyricList',res.data.lrc)
				},
			});
		}
	},
	mutations:{
		ISBTNSHOW(state,value){
			state.IsbtnShow = value
		},
		pushPlayList(state,value){
			state.playList.push(value)
		},
		updatePlayList(state,value){
			state.playList = value
		},
		updatePlatListIndex(state,value){
			state.playListIndex = value
		},
		updateMusicDetail(state,value){
			state.musicList = value
		},
		updateDetailShow(state,value){
			state.detailShow = !state.detailShow 
		},
		updateLyricList(state,value){
			state.lyricList = value
		},
		updateCurrentTime(state,value){
			state.currentTime = value
		}
		,
		updateDuration(state,value){
			state.duration= value
		}
	},
	state:{
		playList:[
			{
			al:{
				id: 80233055,
				name: "Stay The Night",
				pic: 109951164193873390,
				picUrl: "https://p1.music.126.net/NAnUfXkmhEa2AFewmrgKHA==/109951164193873399.jpg",
				pic_str: "109951164193873399",
			},
			id:1376075781,			
		}],
		musicList:{},
		playListIndex:0,
		IsbtnShow:true,
		detailShow:false,
		lyricList:{},//歌词,
		currentTime:0,//当前歌词播放时间
		duration:0,//音乐总时长
		isLogin:false,//判断是否登录
	},
	module:{
	}
})
export default store