
const baseUrl = 'http://124.221.175.51:8080'

export const request = function (url, data) {

}
uni.request({
  url: '/hiddenTroubles/getInfo', //仅为示例，并非真实接口地址。
  method: 'GET',
  data,
  header: {
      'custom-header': 'hello' //自定义请求头信息
  },
  success: (res) => {
      console.log('自带: ', res.data);
      this.text = 'request success';
  }
})



