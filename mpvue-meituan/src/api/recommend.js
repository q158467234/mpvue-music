import request,{param} from '../utils/request'
import {commonParams} from './config'
import fly from '../utils/flyio';

export function getRecommend() {
  const url = 'http://119.27.171.235:8080/api/getRecommend'
  console.log('进入主页')
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return request(url, data)
}

export function getDiscList() {
  const url = 'http://119.27.171.235:8080/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    // format: 'json'
  })

  return request(url, data)
}
//
// export function getSongList(disstid) {
//   var url = 'http://119.27.171.235:8080/api'
//   console.log('进入getSongList方法')
//   console.log('disstid:'+disstid)
//   const data = Object.assign({}, commonParams, {
//     disstid:disstid,
//     type: 1,
//     json: 1,
//     utf8: 1,
//     onlysong: 0,
//     platform: 'yqq',
//     hostUin: 0,
//     needNewCode: 0
//   })
//   // url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
//   fly.get(url,data,{
//     headers: {
//       referer: 'https://c.y.qq.com/',
//       host: 'c.y.qq.com'
//     },
//   }).then((res)=>{
//     console.log('成功')
//     console.log(res)
//   })
//   // return request(url, data)
// }



export function getSongList(disstid) {
  const url = 'http://119.27.171.235:8080/api/getSongList'

  const data = Object.assign({}, commonParams, {
    disstid:disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return fly.get(url,data
  ).then((res) => {
    // console.log(res)
    return Promise.resolve(res.data)
  })
}

export function getMusic(mid) {
  var url = 'http://119.27.171.235:8080/api/getMusic'

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid: mid,
    filename: 'C400' + mid + '.m4a',
    guid: 8276913000
  })

  return request(url, data)
}
