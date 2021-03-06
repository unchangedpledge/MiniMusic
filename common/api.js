import {baseUrl} from './config.js'

export function topList() { // 排行榜
	let listIds = ['3','0','2','1']
	return new Promise(function(reslove,reject){
		uni.request({
			url:`http://www.skfd.xyz:3000/toplist/detail`,
			method:'GET',
			data:{},
			success:res=>{
				let result = res.data.list;
				result.length = 4
				for(var i = 0; i < listIds.length; i++){
					result[i].listId = listIds[i]
				}
				reslove(result)
			},
			fail:()=>{},
			complete:()=>{}                                                                  
		})
	})
	
}

export function singerList(type) { // 歌手列表
	return uni.request({
		url: `${baseUrl}/singers?type=${type}`,
		method: 'GET',
	})
}


// /search/hot/detail   可获取热门搜索列表
export function searchHot(){
	return uni.request({
		url: `http://www.skfd.xyz:3000/search/hot/detail`,
		method: 'GET',
	});
}
// 搜索歌曲
export function searchWord(word){
	return uni.request({
		url: `${baseUrl}/song/search?keywords=${word}`,
		method: 'GET',
	});
}

export function playlist() { // 歌单
	return uni.request({
		url: `${baseUrl}/playlist`,
		method: 'GET',
	})
}

export function banner() { // 轮播图
	return uni.request({
		url: `${baseUrl}/banner`,
		method: 'GET',
	})
}

export async function list(id) { // 列表
	const res1 = await uni.request({
		url: `${baseUrl}/playlist/detail?id=${id}`,
		method: 'GET',
	})
	console.log('res1', res1)
	if(res1[1].data.result.length == 0) {
		
		console.log('url', `http://www.skfd.xyz:3000/playlist/detail?id=${id}`)
		const res2 = await uni.request({
			url: `http://www.skfd.xyz:3000/playlist/detail?id=${id}`,
			method: 'GET',
		})
		console.log('res2', res2)
		return res2
	}
	return res1
}

export async function songDetail(songId) { // 歌曲详情
	const res1 = await uni.request({
		url: `${baseUrl}/song/detail?songId=${songId}`,
		method: 'GET',
	})
	// console.log('res1', res1[1].statusCode)
	if(res1[1].statusCode != 200) {
		// console.log('url', `http://www.skfd.xyz:3000/song/detail?ids=${songId}`)
		const res2 = await uni.request({
			url: `http://www.skfd.xyz:3000/song/detail?ids=${songId}`,
			method: 'GET',
		})
		// console.log('res2', res2)
		return res2
	}
	return res1
}

export function songsOfsinger(name) { // 列表
	return uni.request({
		url: `${baseUrl}/song/singer?singer=${name}`,
		method: 'GET',
	})
}

export function songLyric(songId) { // 歌词
	return uni.request({
		url: `http://www.skfd.xyz:3000/lyric?id=${songId}`,
		method: 'GET',
	})
}
// /song/url?id=33894312 歌曲链接
export function songUrl(songId) { // 歌曲url
	return uni.request({
		url: `http://www.skfd.xyz:3000/song/url?id=${songId}`,
		method: 'GET',
	})
}
