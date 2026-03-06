import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'
import Events from '../components/Events'

export default function EventsPage() {
    const [isLoading, setIsLoading] = useState(true)
    const lenis = useLenis()

    useEffect(() => {
        if (lenis) lenis.stop()
        document.body.style.overflow = 'hidden'

        const timer = setTimeout(() => {
            setIsLoading(false)
            if (lenis) lenis.start()
            document.body.style.overflow = ''
        }, 2400)

        return () => {
            clearTimeout(timer)
            if (lenis) lenis.start()
            document.body.style.overflow = ''
        }
    }, [lenis])

    // 垂直百葉窗幕布
    const panels = [0, 1, 2, 3, 4]

    return (
        <div style={{ paddingTop: '88px', minHeight: '100vh', background: 'var(--warm-dark)' }}>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="events-loader"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 99,
                            display: 'flex',
                            pointerEvents: 'none'
                        }}
                    >
                        {/* 垂直百葉窗背景 */}
                        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
                            {panels.map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scaleY: 1 }}
                                    exit={{ scaleY: 0 }}
                                    transition={{
                                        duration: 0.9,
                                        delay: i * 0.1,
                                        ease: [0.76, 0, 0.24, 1]
                                    }}
                                    style={{
                                        flex: 1,
                                        height: '100%',
                                        background: 'var(--ink)',
                                        borderRight: i < 4 ? '1px solid rgba(201, 164, 74, 0.05)' : 'none',
                                        transformOrigin: 'bottom'
                                    }}
                                />
                            ))}
                        </div>

                        {/* 中央印章式 typography */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 2,
                                padding: '1rem'
                            }}
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div style={{
                                position: 'relative',
                                padding: 'clamp(1.5rem, 5vw, 3rem) clamp(0.75rem, 3vw, 1.5rem)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {/* 裝飾邊框 - 由小變大浮現 */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        border: '1px solid rgba(201, 164, 74, 0.3)',
                                    }}
                                />

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <motion.div
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        style={{
                                            fontFamily: 'var(--font-serif)',
                                            color: 'var(--gold)',
                                            fontSize: 'clamp(1.8rem, 7vh, 3rem)', // 使用 vh 控制高度，避免在短螢幕裁切
                                            letterSpacing: '0.25em',
                                            fontWeight: 700,
                                            writingMode: 'vertical-rl',
                                            textOrientation: 'upright',
                                            display: 'block',
                                            lineHeight: 1,
                                            textAlign: 'center'
                                        }}
                                    >
                                        歲時祭典
                                    </motion.div>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                                style={{
                                    marginTop: '2rem',
                                    color: 'rgba(240, 230, 204, 0.5)',
                                    fontSize: '0.75rem',
                                    letterSpacing: '0.4em',
                                    fontWeight: 300,
                                    fontFamily: 'var(--font-serif)'
                                }}
                            >
                                敬天・祈福
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Events />
        </div>
    )
}
