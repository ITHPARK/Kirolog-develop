/* eslint-disable no-restricted-globals */

const cacheName = 'my-app-cache-v1'
const cacheFiles = [
    '/', // 루트 경로
    '/index.html', // 인덱스 HTML 파일
    // 필요한 정적 리소스를 여기에 추가 (예: CSS, 이미지, JS 파일)
]
self.addEventListener('install', (event) => {
    console.log('Service worker installed.')
})

self.addEventListener('activate', (event) => {
    console.log('Service worker activated.')
})

self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url)
})
