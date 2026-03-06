import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        // 設定總展示時間，之後觸發退場
        const timer = setTimeout(() => {
            document.body.style.overflow = ''
            onComplete()
        }, 2800)

        return () => {
            document.body.style.overflow = ''
            clearTimeout(timer)
        }
    }, [onComplete])

    return (
        <motion.div
            className="preloader"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                display: 'flex',
                pointerEvents: 'none',
            }}
        >
            {/* 左半邊簾幕：淺色系 */}
            <motion.div
                initial={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                style={{
                    width: '50%',
                    height: '100%',
                    background: 'var(--cream-ultra)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            />

            {/* 右半邊簾幕：淺色系 */}
            <motion.div
                initial={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                style={{
                    width: '50%',
                    height: '100%',
                    background: 'var(--cream-ultra)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            />

            {/* 中央內容層 (LOGO與文字) - zIndex 設為最高 */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                exit={{ opacity: 0, filter: 'blur(15px)', scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeIn" }}
            >
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                        <motion.img
                            src={`${import.meta.env.BASE_URL}images/logo-black.svg`}
                            alt="北海宮"
                            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{
                                opacity: { duration: 1.2, ease: "easeOut" },
                                filter: { duration: 1.2, ease: "easeOut" },
                                scale: { duration: 2.5, ease: "easeOut" } // 緩慢持續放大 (Ken Burns effect)
                            }}
                            style={{
                                height: 'clamp(8rem, 24vw, 16rem)', // 極大尺寸
                                width: 'auto',
                                display: 'block',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                </div>

                <div style={{ overflow: 'hidden', marginTop: '2rem' }}>
                    <motion.div
                        initial={{ y: '-100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--charcoal)', // 淺色背景配深色文字
                            letterSpacing: '0.5em',
                            fontWeight: 400,
                            marginLeft: '0.5em',
                            fontFamily: 'var(--font-serif)'
                        }}
                    >
                        百年香火 · 世代相傳
                    </motion.div>
                </div>

            </motion.div>
        </motion.div>
    )
}
