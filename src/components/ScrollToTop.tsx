import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 每次路由切換時，自動將頁面捲動位置重置至頂端。
 * 需放置在 BrowserRouter 內部、Routes 外部。
 */
export default function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, [pathname])

    return null
}
