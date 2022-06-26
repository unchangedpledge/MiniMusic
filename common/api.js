import {baseUrl} from './config.js'

export function topList() { // 排行榜
	let listIds = ['3','0','2','1']
	return new Promise(function(reslove,reject){
		uni.request({
			url:`http://localhost:3000/toplist/detail`,
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