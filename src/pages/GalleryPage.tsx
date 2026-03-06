import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'
import Gallery from '../components/Gallery'

export default function GalleryPage() {
    const [isLoading, setIsLoading] = useState(true)
    const lenis = useLenis()

    useEffect(() => {
        // 鎖定滾動
        if (lenis) lenis.stop()
        document.body.style.overflow = 'hidden'

        // 模擬高級資源載入與動效時間
        const timer = setTimeout(() => {
            setIsLoading(false)
            if (lenis) lenis.start()
            document.body.style.overflow = ''
        }, 2200)

        return () => {
            clearTimeout(timer)
            if (lenis) lenis.start()
            document.body.style.overflow = ''
        }
    }, [lenis])

    return (
        <div style={{ minHeight: '100vh', background: 'var(--ink)' }}>
            <AnimatePresence>
                {isLoading && (
                    <motion.div 
                        key="gallery-loader"
                        className="gallery-loader"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 99,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none'
                        }}
                    >
                        {/* 頂部快門幕布 */}
                        <motion.div 
                            initial={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '50vh',
                                background: 'var(--ink-deep)',
                                borderBottom: '1px solid rgba(201, 164, 74, 0.1)'
                            }}
                        />
                        {/* 底部快門幕布 */}
                        <motion.div 
                            initial={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '50vh',
                                background: 'var(--ink-deep)',
                                borderTop: '1px solid rgba(201, 164, 74, 0.1)'
                            }}
                        />

                        {/* 中央視覺中心 */}
                        <motion.div 
                            className="loader-content"
                            style={{ 
                                position: 'relative', 
                                zIndex: 1, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center' 
                            }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
                                <motion.div 
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        fontFamily: 'var(--font-serif)',
                                        color: 'var(--cream-ultra)',
                                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                        letterSpacing: '0.3em',
                                        fontWeight: 700,
                                        marginLeft: '0.3em' // 修正因 tracking 造成的視覺偏移
                                    }}
                                >
                                    凝視信仰
                                </motion.div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '40px' }}
                                    transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ height: '1px', background: 'rgba(201, 164, 74, 0.5)' }}
                                />
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.9 }}
                                    style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--gold)',
                                        letterSpacing: '0.5em',
                                        fontFamily: 'var(--font-serif)',
                                        marginLeft: '0.5em'
                                    }}
                                >
                                    影像展廳
                                </motion.span>
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '40px' }}
                                    transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ height: '1px', background: 'rgba(201, 164, 74, 0.5)' }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Gallery />
        </div>
    )
}
