import service from './basic'

// 热门搜索关键词
export function getSeachKeyword() {
  return service('/search/hot')
}
// 搜索
export function search(keyword = '', limit = 30, offset = 0) {
  return service(`/cloudsearch?keywords=${keyword}&limit=${limit}&offset=${offset}`)
}
// 建议搜索
export function suggestSearch(keyword = '', limit = 10) {
  return service(`/search?keywords=${keyword}&limit=${limit}`)
}
// 播放音乐
export function playSong(id, quality = 'standard') {
  return service(`/song/url/v1?id=${id}&level=${quality}`)
}
// 音乐详情
export function songsInfo(id) {
  return service(`/song/detail?ids=${id}`)
}
export function getBanner() {
  return service('/banner?type=0')
}
