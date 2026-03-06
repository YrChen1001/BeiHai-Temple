import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }: { children: ReactNode }) {
    const { pathname } = useLocation()

    useEffect(() => {
        // 當換頁時，手動捲回頂部（搭配 Lenis 會有較好的體驗）
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <>
            {/* 退出與進入時的布幕 */}
            <motion.div
                className="transition-curtain"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                style={{ originY: 0 }}
            >
                <motion.div
                    className="transition-curtain-logo"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    北海宮
                </motion.div>
            </motion.div>

            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.main>
        </>
    )
}
