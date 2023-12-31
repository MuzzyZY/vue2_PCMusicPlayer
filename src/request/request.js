import axios from 'axios'
import service from './basic'

// 热门搜索关键词
export function getSeachKeyword() {
  return service('/search/hot')
}
// 搜索
export function search(keyword = '', limit = 30, offset = 0, type = 1) {
  return service(`/cloudsearch?keywords=${keyword}&limit=${limit}&offset=${offset}&type=${type}`)
}
// 建议搜索
export function suggestSearch(keyword = '', limit = 10) {
  return service(`/search?keywords=${keyword}&limit=${limit}`)
}
// 播放音乐
export function playSong(id, quality = 'standard') {
  return service(`/song/url/v1?id=${id}&level=${quality}`)
}
// 获取相似歌曲
export function similarSong(id) {
  return service(`/simi/song?id=${id}`)
}
// 音乐详情
export function songsInfo(id) {
  return service(`/song/detail?ids=${id}`)
}
// 获取banner图
export function getBanner() {
  return service('/banner?type=0')
}
// 获取推荐歌单
export function getRecommandList(limit = 9) {
  return service(`/personalized?limit=${limit}`)
}
// 获取每日推荐歌单
export function getDaylyRecommand(cookie) {
  return service(`/recommend/songs?cookie=${cookie}`)
}
// 获取推荐节目
export function getRecommandProgram() {
  return service('/program/recommend')
}
// 获取推荐节目详情
export function getProgramInfo(id) {
  return service(`/dj/program/detail?id=${id}`)
}
// 获取独家放送
export function personalizedProgram() {
  return service('/personalized/privatecontent')
}
// 获取MV播放源
export function mvPlayer(id) {
  return service(`/mv/url?id=${id}`)
}

// 获取歌单信息
export function getListDetail(id) {
  return service(`/playlist/detail?id=${id}`)
}
// 获取歌单内的歌曲
export function getListSongs(id, limit = 30, offset = 0) {
  return service(`/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`)
}

// 获取歌词
export function getLyric(id) {
  return service(`/lyric?id=${id}`)
}

// 获取登录二维码key
export function getQrKey() {
  return axios({
    method: 'POST',
    url: 'http://localhost:3000/login/qr/key',
    params: {
      timestamp: Date.now()
    }
  })
}
// 二维码生成接口
export function getQr(key) {
  return service(`/login/qr/create?key=${key}&qrimg=true`)
}
// 二维码检测扫码状态接口
export function CheckQrStatus(key) {
  return axios({
    method: 'POST',
    url: `http://localhost:3000/login/qr/check?key=${key}`,
    params: {
      timestamp: Date.now()
    }
  })
}
// 获取用户信息
export function getUserInfo(cookie) {
  return service(`/user/account?cookie=${cookie}`)
}
// 获取用户歌单
export function getUserSongsList(id) {
  return service(`/user/playlist?uid=${id}`)
}
// 退出登录
export function exitLogin() {
  return service('/logout')
}

// 获取歌单
export function getPopSongsList(limit = 60, offset = 0, order = 'hot') {
  return service(`/top/playlist?limit=${limit}&offset=${offset}&order=${order}`)
}

// 获取播放榜单
export function getRankList() {
  return service('/toplist/detail')
}
// 获取播放榜单详情
export function getRankListDetail(id) {
  return service(`/playlist/detail?id=${id}`)
}

// 获取歌手列表
export function getArtist(limit = 30, offset = 0, type = -1, area = -1) {
  return service(`/artist/list?limit=${limit}&offset=${offset}&type=${type}&area=${area}`)
}
// 获取歌手详情
export function getArtistDetail(id) {
  return service(`/artist/detail?id=${id}`)
}
// 获取歌手专辑
export function getArtistAlbum(id, limit = 30, offset = 0) {
  return service(`/artist/album?id=${id}&limit=${limit}&offset=${offset}`)
}
// 获取歌手单曲
export function getArtistMusic(id, limit = 50, offset = 0, order = 'hot') {
  return service(`/artist/songs?id=${id}&limit=${limit}&offset=${offset}&order=${order}`)
}
// 获取专辑信息
export function getAlbumInfo(id) {
  return service(`/album?id=${id}`)
}

// 获取新歌速递
export function getNewSongs(area = 0) {
  return service(`/top/song?type=${area}`)
}
