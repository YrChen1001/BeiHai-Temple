import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const timeline = [
    {
        year: '早期',
        title: '台南蚵寮鄉親北上',
        desc: '台南市北門區蚵寮鄉居民北上打拼，攜帶池府千歲神像，成立「蚵寮王爺聯誼會」。',
    },
    {
        year: '板橋時期',
        title: '板橋北天宮開館',
        desc: '池府千歲於板橋民宅開館，取名「北天宮」，廣施神恩，供信眾請示解惑。',
    },
    {
        year: '中和成立',
        title: '北海宮建立',
        desc: '由板橋北天宮分香而出，於新北市中和區另立宮壇，取名「北海宮」。',
    },
    {
        year: 'ROC 96',
        title: '入火安座 · 正式開廟',
        desc: '民國九十六年（2007年）舉行隆重入火安座典禮，定址民享街261號，成為地方信仰重心。',
    },
]

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

export default function About() {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-10% 0px' })

    const titleVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
    }

    return (
        <section id="about" className="about" ref={ref}>
            <div className="about__layout">
                {/* 文字左側 */}
                <div className="about__content-col">
                    <motion.div
                        variants={titleVariants}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                    >
                        <h2 className="about__title" style={{ overflow: 'hidden', display: 'flex' }}>
                            {splitText('廟宇沿革')}
                        </h2>
                        <div style={{ overflow: 'hidden', marginTop: '1rem' }}>
                            <motion.p
                                className="about__intro"
                                variants={{
                                    hidden: { y: '100%', opacity: 0 },
                                    visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] } }
                                }}
                            >
                                中和北海宮為台南市北門區蚵寮保安宮之分香廟，
                                主祀池府千歲代天巡狩，配祀觀世音菩薩、福德正神及虎爺，
                                傳承台南王爺信仰數十年。
                            </motion.p>
                        </div>
                    </motion.div>

                    <div className="timeline">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={item.year}
                                className="timeline-item"
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="timeline-item__year">{item.year}</span>
                                <div>
                                    <h3 className="timeline-item__title">{item.title}</h3>
                                    <p className="timeline-item__desc">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 圖片反轉置於右側全出血，加入高級遮罩揭露 */}
                <motion.div
                    className="about__image-col"
                    initial={{ clipPath: 'inset(0 100% 0 0)', scale: 1.15 }}
                    animate={inView ? { clipPath: 'inset(0 0% 0 0)', scale: 1 } : {}}
                    transition={{ duration: 1.4, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                >
                    <img src={`${import.meta.env.BASE_URL}images/temple_interior.png`} alt="北海宮建築細節" loading="lazy" />
                    <div className="about__deco-circle" />
                </motion.div>
            </div>
        </section>
    )
}
