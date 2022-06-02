
const baseUrl = 'http://124.221.175.51:8080'

const request = async function (url, data) {
	return new Promise((resolve, reject)=>{
		try{
			uni.request({
			  url: `${baseUrl}${url}`, // 仅为示例，并非真实接口地址。
			  method: 'GET',
			  data,
			  header: { //自定义请求头信息
			  },
			  success: (res) => {
			    // console.log('自带: ', res.data)
				resolve(res.data)
			  }
			})
		}catch(e){
			//TODO handle the exception
			reject(e)
		}	
	})
  
}

module.exports = request
