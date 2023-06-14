import service from './basic'

export function getSeachKeyword() {
  return service('/search/hot')
}
export function search(keyword = '') {
  return service(`/search?keywords=${keyword}`)
}
export function suggestSearch(keyword = '', limit = 10) {
  return service(`/search?keywords=${keyword}&limit=${limit}`)
}
