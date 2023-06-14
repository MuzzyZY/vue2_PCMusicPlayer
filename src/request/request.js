import service from './basic'

export function getSeachKeyword() {
  return service('/search/hot')
}
export function search(keyword = '', limit = 30, offset = 0) {
  return service(`/search?keywords=${keyword}&limit=${limit}&offset=${offset}`)
}
export function suggestSearch(keyword = '', limit = 10) {
  return service(`/search?keywords=${keyword}&limit=${limit}`)
}
export function playSong(id, quality = 'standard') {
  return service(`/song/url/v1?id=${id}&level=${quality}`)
}
export function songsInfo(id) {
  return service(`/song/detail?ids=${id}`)
}
