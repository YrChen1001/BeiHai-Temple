import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// 將文字打散成單字以進行彈簧延遲滑入效果
const splitText = (text: string) => {
    return text.split('').map((char, i) => (
        <motion.span
            key={i}
            variants={{
                hidden: { y: '100%', opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20, mass: 1 } }
            }}
            style={{ display: 'inline-block', paddingRight: char === ' ' ? '0.2em' : '0' }}
        >
            {char}
        </motion.span>
    ))
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
}

export default function Hero() {
    return (
        <section className="hero" id="hero">
            {/* 第一層：使用 Clip-path 實現高級揭露 */}
            <motion.div
                className="hero__bg"
                initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.15 }}
                animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
            >
                <img src={`${import.meta.env.BASE_URL}images/temple_hero.png`} alt="中和北海宮廟景" />
            </motion.div>

            <motion.div
                className="hero__overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
            />
            <div className="hero__grid" aria-hidden="true" />

            {/*主體內容 — 解構文字滑入*/}
            <motion.div
                className="hero__content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div style={{ overflow: 'hidden' }}>
                    <motion.div className="hero__eyebrow" variants={{
                        hidden: { y: '100%' },
                        visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}>
                        {splitText('代天巡狩 · 護佑蒼生')}
                    </motion.div>
                </div>

                <h1 className="hero__title">
                    <div style={{ overflow: 'hidden', display: 'flex' }}>
                        {splitText('中和')}
                        <em style={{ marginLeft: '0.1em' }}>{splitText('北海宮')}</em>
                    </div>
                </h1>

                <div style={{ overflow: 'hidden', marginTop: '1rem' }}>
                    <motion.p className="hero__desc" variants={{
                        hidden: { y: '100%', opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] } }
                    }}>
                        源自台南北門蚵寮保安宮，民國九十六年入火安座，<br />主祀池府千歲代天巡狩，護佑中和地區信眾平安吉祥。
                    </motion.p>
                </div>

                <div style={{ overflow: 'hidden', marginTop: '2.5rem' }}>
                    <motion.div className="hero__actions" variants={{
                        hidden: { y: '100%', opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}>
                        <Link className="hero__btn-primary" to="/deities">
                            神明介紹
                        </Link>
                        <Link className="hero__btn-ghost" to="/services">
                            廟宇服務
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            <div className="hero__bottom-band" aria-hidden="true" />
        </section>
    )
}
