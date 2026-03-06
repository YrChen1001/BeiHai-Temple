import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 狀態機：等待中 -> 搖籤中 -> 已抽籤(顯示籤號)
type LotteryState = 'idle' | 'shaking' | 'drawn'

const TOTAL_STICKS = 7

export default function Lottery() {
    const [state, setState] = useState<LotteryState>('idle')
    const [stickNumber, setStickNumber] = useState<number | null>(null)
    const [currentShuffle, setCurrentShuffle] = useState(1)

    const handleStartDraw = () => {
        setState('shaking')
    }

    useEffect(() => {
        if (state === 'shaking') {
            const duration = 3000
            const interval = 80
            let elapsed = 0
            
            const timer = setInterval(() => {
                setCurrentShuffle(Math.floor(Math.random() * TOTAL_STICKS) + 1)
                elapsed += interval
                if (elapsed >= duration) {
                    clearInterval(timer)
                    const finalNum = Math.floor(Math.random() * TOTAL_STICKS) + 1
                    setStickNumber(finalNum)
                    setState('drawn')
                }
            }, interval)

            return () => clearInterval(timer)
        }
    }, [state])

    const handleReset = () => {
        setState('idle')
        setStickNumber(null)
    }

    const formatNumber = (num: number) => num.toString().padStart(2, '0')

    return (
        <section className="lottery">
            <div className="lottery__container">
                <AnimatePresence mode="wait">
                    {state === 'idle' && (
                        <motion.div 
                            key="idle"
                            className="lottery__panel"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="lottery__eyebrow">
                                <div className="lottery__diamond"></div>
                                <span>誠心祈求 · 靈籤指引</span>
                                <div className="lottery__diamond"></div>
                            </div>
                            <h2 className="lottery__title">求取神明聖意</h2>
                            <div className="lottery__divider"></div>
                            <p className="lottery__instruction">
                                請靜心端坐，於心中默念您的：<br/>
                                <strong>姓名、生辰、現居地址</strong><br/>
                                並向神明稟報所求之事。<br/>
                                稟報完畢後，點擊下方按鈕開始求籤。
                            </p>
                            <button className="lottery__btn-primary" onClick={handleStartDraw}>
                                開始求籤
                            </button>
                        </motion.div>
                    )}

                    {state === 'shaking' && (
                        <motion.div 
                            key="shaking"
                            className="lottery__panel"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="lottery__shuffle-wrapper">
                                <motion.div 
                                    className="lottery__shuffle-ring"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="lottery__shuffle-number">
                                    {formatNumber(currentShuffle)}
                                </div>
                            </div>
                            <p className="lottery__status-text">神明諭示中...</p>
                        </motion.div>
                    )}

                    {state === 'drawn' && stickNumber && (
                        <motion.div 
                            key="drawn"
                            className="lottery__panel"
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="lottery__divine-seal">
                                <motion.div 
                                    className="lottery__seal-ring"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="lottery__seal-glow" />
                                <div className="lottery__seal-content">
                                    <span className="lottery__seal-label">賜籤</span>
                                    <div className="lottery__seal-num">{formatNumber(stickNumber)}</div>
                                </div>
                            </div>
                            <h3 className="lottery__result-title">已賜下第 {formatNumber(stickNumber)} 籤</h3>
                            <p className="lottery__status-text" style={{ marginBottom: '2.5rem' }}>祈願心誠，必有迴響</p>
                            <button className="lottery__btn-primary" onClick={() => {
                                // 預留擴展：未來可以接實體印表機或生成 PDF
                                alert(`正在列印第 ${stickNumber} 籤...`)
                                handleReset()
                            }}>
                                列印籤詩
                            </button>
                            <button className="lottery__btn-secondary" onClick={handleReset} style={{ marginTop: '2rem' }}>
                                重新求籤
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
