import fly from './flyio';

export default function request(url, data) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  console.log('url:'+url)
  return new Promise((resolve, reject) => {
    fly.get(url).then((response) =>{
      console.log('成功')
      resolve(response)
    }).catch((e) =>{
      reject(e)
    })
  })
}

export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
