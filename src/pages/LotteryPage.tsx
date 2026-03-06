import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'
import Lottery from '../components/Lottery'

export default function LotteryPage() {
    const [isLoading, setIsLoading] = useState(true)
    const lenis = useLenis()

    useEffect(() => {
        if (lenis) lenis.stop()
        document.body.style.overflow = 'hidden'

        // 總載入時間 2.8 秒
        const timer = setTimeout(() => {
            setIsLoading(false)
            if (lenis) lenis.start()
            document.body.style.overflow = ''
        }, 2800)

        return () => {
            clearTimeout(timer)
            if (lenis) lenis.start()
            document.body.style.overflow = ''
        }
    }, [lenis])

    return (
        <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--ink)' }}>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="lottery-loader"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            background: 'var(--ink)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none',
                            overflow: 'hidden'
                        }}
                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* 沉浸式香火/靈氣光暈背景 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1.1 }}
                            transition={{ duration: 3, ease: "easeOut" }}
                            style={{
                                position: 'absolute',
                                inset: '-20%',
                                background: 'radial-gradient(circle at center, rgba(201,164,74,0.15) 0%, rgba(201,164,74,0.05) 30%, transparent 70%)',
                                filter: 'blur(30px)',
                                zIndex: 0
                            }}
                        />

                        {/* 頂級 typography：神明指引 */}
                        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* 頂部裝飾線與副標 */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '2.5rem'
                                }}
                            >
                                <span style={{ width: '1px', height: '30px', background: 'rgba(201,164,74,0.5)' }} />
                                <span style={{
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'upright',
                                    color: 'rgba(240,230,204,0.6)',
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.5em',
                                    fontFamily: 'var(--font-serif)'
                                }}>
                                    心誠則靈
                                </span>
                                <span style={{ width: '1px', height: '30px', background: 'rgba(201,164,74,0.5)' }} />
                            </motion.div>

                            {/* 主標題：抽籤 */}
                            <div style={{ display: 'flex', gap: '2rem', overflow: 'hidden' }}>
                                {['求', '取', '聖', '意'].map((char, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        transition={{
                                            duration: 1.2,
                                            delay: 0.4 + index * 0.15,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                        style={{
                                            fontFamily: 'var(--font-serif)',
                                            color: 'var(--gold)',
                                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                            fontWeight: 300,
                                            textShadow: '0 0 20px rgba(201,164,74,0.3)',
                                            transform: 'scaleY(1.1)' // 讓字體更修長
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>

                            {/* 底部的能量聚攏光束 */}
                            <motion.div
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    marginTop: '3rem',
                                    width: '120px',
                                    height: '1px',
                                    background: 'linear-gradient(90deg, transparent, rgba(201,164,74,0.8), transparent)',
                                    boxShadow: '0 0 10px rgba(201,164,74,0.5)'
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 後方實際內容：帶有深景深浮現效果 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
                animate={!isLoading ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
                <Lottery />
            </motion.div>
        </div>
    )
}
