import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GiCandleLight } from 'react-icons/gi'
import { FaPiggyBank, FaScroll, FaHandsPraying, FaShieldHalved } from 'react-icons/fa6'
import { MdFestival } from 'react-icons/md'

type ServiceItem = {
    name: string
    icon: React.ReactNode
    desc: string
}

export default function Services() {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const services: ServiceItem[] = [
        { name: '光明燈', icon: <GiCandleLight size={22} />, desc: '點亮光明燈以祈求智慧光明、前途光明，逢考試、事業、學業之際，信眾燃燈祈福，獲池府千歲庇護加持。' },
        { name: '安太歲', icon: <FaShieldHalved size={20} />, desc: '每年農曆年初，信眾可依本命年或值太歲年份至廟中辦理安太歲，化解流年不利，趨吉避凶保平安。' },
        { name: '補財庫', icon: <FaPiggyBank size={20} />, desc: '若運勢欠佳、財庫空虛，可至廟中進行補財庫法事，由神明加持，補充先天命格中財庫之不足，改善財運。' },
        { name: '祭改祈願', icon: <FaHandsPraying size={20} />, desc: '信眾遭逢諸事不順、運途坎坷，可向廟方申請祭改服務，透過神明旨意，化解煞氣與不良能量，重啟好運。' },
        { name: '神明問事', icon: <FaScroll size={20} />, desc: '於特定時日，信眾可透過擲筊請示池府千歲，就婚姻、事業、家運等諸事祈求神明指引，獲得方向與解答。' },
        { name: '法會活動', icon: <MdFestival size={22} />, desc: '廟方定期舉辦法會及宗教文化活動，包含神明聖誕慶典、年度建醮、消災祈福法會，歡迎廣大信眾踴躍參與。' },
    ]

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
    }

    const rowVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
    }

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

    return (
        <section id="services" className="services" ref={ref}>
            <div className="container">
                {/* 標題橫排 */}
                <motion.div
                    className="services__top"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    <div style={{ overflow: 'hidden' }}>
                        <h2 className="services__title" style={{ display: 'flex' }}>
                            {splitText('服務項目')}
                        </h2>
                    </div>

                    <div style={{ overflow: 'hidden' }}>
                        <motion.p
                            className="services__intro"
                            variants={{
                                hidden: { y: '100%', opacity: 0 },
                                visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
                            }}
                        >
                            北海宮提供多元宗教服務，歡迎信眾前來祈福許願、點燈安太歲，
                            池府千歲慈悲庇護，護佑平安吉祥，萬事如意。
                        </motion.p>
                    </div>
                </motion.div>

                {/* 數字橫線清單*/}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {services.map((s) => (
                        <motion.div
                            key={s.name}
                            className="service-row"
                            variants={rowVariants}
                            whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.02)' }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            style={{ cursor: 'pointer' }}
                        >
                            <span className="service-row__icon">{s.icon}</span>
                            <span className="service-row__name">{s.name}</span>
                            <span className="service-row__desc">{s.desc}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
