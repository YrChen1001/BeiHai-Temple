import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const ROUTES = [
    '/',
    '/deities',
    '/services',
    '/events',
    '/gallery',
    '/contact',
    '/lottery'
]

export default function SwipeNavigator() {
    const navigate = useNavigate()
    const location = useLocation()
    
    const touchStart = useRef<{ x: number, y: number, time: number } | null>(null)

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            // 忽略多指觸控
            if (e.touches.length > 1) return
            
            // 如果畫面被鎖定 (例如: 開啟選單、Lightbox) 則不處理
            if (document.body.style.overflow === 'hidden') return
            
            const touch = e.touches[0]
            
            // 防邊緣滑動：避免與 iOS/Android 系統的「系統上一頁/下一頁」手勢衝突
            // 螢幕左右兩側 40px 內的起點不作處理
            if (touch.clientX < 40 || window.innerWidth - touch.clientX < 40) return

            // 檢查是否點擊在具有橫向滾動或特定互動的元素上
            let target = e.target as HTMLElement | null
            while (target && target !== document.body) {
                // 如果元素有 no-swipe class，則忽略
                if (target.classList && target.classList.contains('no-swipe')) return
                
                // 檢查元素是否本身支援橫向滾動
                if (target.scrollWidth > target.clientWidth) {
                    const style = window.getComputedStyle(target)
                    if (style.overflowX === 'auto' || style.overflowX === 'scroll') {
                        return // 在可橫向滾動的容器內，不攔截滑動手勢
                    }
                }
                
                // 地圖、影片等 iframe 不攔截
                if (target.tagName === 'IFRAME') return

                target = target.parentElement
            }

            touchStart.current = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now()
            }
        }

        const handleTouchEnd = (e: TouchEvent) => {
            if (!touchStart.current) return

            const touch = e.changedTouches[0]
            const deltaX = touch.clientX - touchStart.current.x
            const deltaY = touch.clientY - touchStart.current.y
            const deltaTime = Date.now() - touchStart.current.time

            touchStart.current = null

            // 滑動判定參數
            const SWIPE_THRESHOLD = 60 // 最小滑動距離
            const TIME_THRESHOLD = 600 // 最大滑動時間 (毫秒)，太慢不算
            const DIRECTION_THRESHOLD = Math.abs(deltaY) * 1.5 // 確保主要是橫向滑動

            if (
                Math.abs(deltaX) > SWIPE_THRESHOLD &&
                Math.abs(deltaX) > DIRECTION_THRESHOLD &&
                deltaTime < TIME_THRESHOLD
            ) {
                const currentIndex = ROUTES.indexOf(location.pathname)
                if (currentIndex === -1) return

                if (deltaX > 0) {
                    // 向右滑：上一頁
                    if (currentIndex > 0) {
                        navigate(ROUTES[currentIndex - 1])
                    }
                } else {
                    // 向左滑：下一頁
                    if (currentIndex < ROUTES.length - 1) {
                        navigate(ROUTES[currentIndex + 1])
                    }
                }
            }
        }

        // 使用 passive: true 以確保滾動效能不受影響
        window.addEventListener('touchstart', handleTouchStart, { passive: true })
        window.addEventListener('touchend', handleTouchEnd, { passive: true })

        return () => {
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchend', handleTouchEnd)
        }
    }, [navigate, location.pathname])

    return null
}
