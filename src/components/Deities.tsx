import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { FaFireFlameSimple } from 'react-icons/fa6'

/* ─────────── Data ─────────── */

const mainDeity = {
    role: '主祀神明',
    name: '池府千歲',
    title: '代天巡狩池府千歲',
    birthday: '農曆六月十八日',
    image: `${import.meta.env.BASE_URL}images/deity_pool_wang.png`,
    attrTitle: '捨身救民',
    attrDesc: '服毒代民，壯烈成神',
    desc: '池府千歲，諱夢彪，相傳為唐朝開國將領。見瘟疫肆虐蒼生，毅然以自身代替百姓服下瘟藥，壯烈捐軀。玉皇大帝感念其大義，敕封為「代天巡狩池府千歲」，奉旨代天巡行天下，賞善罰惡，庇護萬民。神像面相威武莊嚴，呈黑面之相，象徵服毒救民之英勇與高尚情操。',
}

const subDeities = [
    {
        role: '配祀',
        name: '觀世音菩薩',
        title: '大慈大悲觀世音菩薩',
        birthday: '農曆二月十九日',
        image: `${import.meta.env.BASE_URL}images/deity_guanyin.png`,
        keyword: '慈悲',
        desc: '觀世音菩薩慈悲為懷，救苦救難，尋聲救世。信眾誠心禮拜，必蒙庇佑，消災解厄，賜予平安順遂。',
    },
    {
        role: '配祀',
        name: '福德正神',
        title: '福德正神土地公',
        birthday: '農曆二月初二日',
        image: `${import.meta.env.BASE_URL}images/temple_architecture.png`,
        keyword: '財富',
        desc: '福德正神俗稱土地公，為地方守護神，主司財富與農業，護佑地方生業興旺，閤境平安，賜予財運亨通。',
    },
    {
        role: '配祀',
        name: '虎爺將軍',
        title: '虎爺將軍',
        birthday: '農曆六月初六日',
        image: `${import.meta.env.BASE_URL}images/temple_interior.png`,
        keyword: '守護',
        desc: '虎爺為廟宇護法神將，鎮守廟宇，驅邪避煞，尤具護佑孩童健康成長、化解童關之職能。',
    },
]

/* ─────────── 文字字元解構動畫 ─────────── */
const charVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.06 },
    }),
}

function SplitChars({ text, className }: { text: string; className?: string }) {
    return (
        <span className={className} aria-label={text} style={{ display: 'flex', overflow: 'hidden' }}>
            {text.split('').map((ch, i) => (
                <motion.span key={i} custom={i} variants={charVariants} style={{ display: 'inline-block' }}>
                    {ch === ' ' ? '\u00a0' : ch}
                </motion.span>
            ))}
        </span>
    )
}

/* ─────────── 主神 Parallax 包裝 ─────────── */
function ParallaxImg({ src, alt }: { src: string; alt: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
    return (
        <div ref={ref} style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
            <motion.img
                src={src}
                alt={alt}
                style={{ y, width: '100%', height: '118%', objectFit: 'cover', objectPosition: 'center top', filter: 'saturate(0.82)' }}
            />
        </div>
    )
}

/* ─────────── 配祀卡片 ─────────── */
function SubCard({ deity, index }: { deity: typeof subDeities[0]; index: number }) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.article
            className="deity-sub-v2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            {/* 圖片區 */}
            <div className="deity-sub-v2__image-wrap">
                <motion.img
                    src={deity.image}
                    alt={deity.name}
                    loading="lazy"
                    animate={{ scale: hovered ? 1.08 : 1, filter: hovered ? 'saturate(0.95)' : 'saturate(0.72)' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
                {/* Hover 時的金色光暈 */}
                <motion.div
                    className="deity-sub-v2__image-glow"
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                />
                {/* 關鍵字大字 */}
                <div className="deity-sub-v2__keyword" aria-hidden="true">{deity.keyword}</div>
            </div>

            {/* 文字區 */}
            <div className="deity-sub-v2__body">
                <span className="deity-sub-v2__role">{deity.role}</span>
                <h3 className="deity-sub-v2__name">{deity.name}</h3>
                <div className="deity-sub-v2__divider" />
                <p className="deity-sub-v2__title-full">{deity.title}</p>
                <p className="deity-sub-v2__birthday">
                    <FaFireFlameSimple size={11} style={{ color: 'var(--gold)', marginRight: '0.4em' }} />
                    {deity.birthday}
                </p>
                <p className="deity-sub-v2__desc">{deity.desc}</p>
            </div>

            {/* Hover 時底部金線 */}
            <motion.div
                className="deity-sub-v2__bottom-line"
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            />
        </motion.article>
    )
}

/* ─────────── 主元件 ─────────── */
export default function Deities() {
    const heroRef = useRef<HTMLDivElement>(null)
    const inView = useInView(heroRef, { once: true, margin: '-80px' })

    return (
        <section id="deities" className="deities-v2">

            {/* ── HERO 主神區 ────────────────────── */}
            <div className="deities-v2__hero" ref={heroRef}>
                {/* 背景大字 */}
                <motion.div
                    className="deities-v2__watermark"
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 2 }}
                >
                    神
                </motion.div>

                {/* 左側：神像圖片 */}
                <motion.div
                    className="deities-v2__img-col"
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
                    transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                >
                    <ParallaxImg src={mainDeity.image} alt={mainDeity.name} />
                    {/* 漸層遮罩 */}
                    <div className="deities-v2__img-grad" />
                </motion.div>

                {/* 右側：文字資訊 */}
                <motion.div
                    className="deities-v2__copy-col"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* 上方標籤 */}
                    <motion.div
                        className="deities-v2__eyebrow"
                        variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } } }}
                    >
                        <span className="deities-v2__eyebrow-line" />
                        {mainDeity.role}
                    </motion.div>

                    {/* 主神名稱 — 字元解構 */}
                    <motion.div
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
                    >
                        <SplitChars text={mainDeity.name} className="deities-v2__name" />
                    </motion.div>

                    {/* 完整稱號 */}
                    <motion.p
                        className="deities-v2__full-title"
                        variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } } }}
                    >
                        {mainDeity.title}
                    </motion.p>

                    {/* 聖誕 */}
                    <motion.div
                        className="deities-v2__birthday-row"
                        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } } }}
                    >
                        <FaFireFlameSimple size={13} />
                        <span>{mainDeity.birthday}</span>
                    </motion.div>

                    {/* 屬性標籤 */}
                    <motion.div
                        className="deities-v2__attr"
                        variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } } }}
                    >
                        <span className="deities-v2__attr-title">{mainDeity.attrTitle}</span>
                        <span className="deities-v2__attr-desc">{mainDeity.attrDesc}</span>
                    </motion.div>

                    {/* 分隔線 */}
                    <motion.div
                        className="deities-v2__rule"
                        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } } }}
                        style={{ originX: 0 }}
                    />

                    {/* 神明事蹟 */}
                    <motion.p
                        className="deities-v2__desc"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } } }}
                    >
                        {mainDeity.desc}
                    </motion.p>
                </motion.div>
            </div>

            {/* ── 配祀神明標題 ────────────────────── */}
            <motion.div
                className="deities-v2__sub-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
                <div className="deities-v2__sub-header-inner">
                    <span className="deities-v2__sub-header-line" />
                    <h2 className="deities-v2__sub-title">配祀神明</h2>
                    <span className="deities-v2__sub-header-line" />
                </div>
                <p className="deities-v2__sub-desc">
                    與池府千歲共同鎮守北海宮，守護十方信眾
                </p>
            </motion.div>

            {/* ── 配祀神明卡片 ────────────────────── */}
            <div className="deities-v2__sub-grid">
                {subDeities.map((deity, i) => (
                    <SubCard key={deity.name} deity={deity} index={i} />
                ))}
            </div>

        </section>
    )
}
