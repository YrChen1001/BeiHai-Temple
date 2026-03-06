import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const events = [
    {
        month: '六月',
        day: '十八',
        tag: '主祀聖誕',
        name: '池府千歲聖誕千秋',
        desc: '一年一度最盛大的廟會慶典，舉辦遶境、法會、演藝活動，信眾絡繹不絕，共賀池府千歲萬壽無疆。',
    },
    {
        month: '二月',
        day: '十九',
        tag: '配祀聖誕',
        name: '觀世音菩薩聖誕',
        desc: '觀音菩薩聖誕日，廟方舉行祈福法會，信眾誠心禮拜，祈求慈悲觀音護佑平安、消災解厄。',
    },
    {
        month: '二月',
        day: '初二',
        tag: '配祀聖誕',
        name: '福德正神聖誕',
        desc: '土地公聖誕日，商家與信眾紛紛前來祭拜，祈求財運亨通、生意興隆、產業豐收。',
    },
    {
        month: '六月',
        day: '初六',
        tag: '配祀聖誕',
        name: '虎爺將軍聖誕',
        desc: '虎爺聖誕日，信眾可為家中小孩祈求健康成長、化解童關，護幼安胎，守護孩童平安。',
    },
]

export default function Events() {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
    }

    return (
        <section id="events" className="events" ref={ref}>
            <div className="container">
                <motion.div
                    className="events__header"
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                >
                    <h2 className="events__title">活動公告</h2>
                    <p className="events__sub">年度重要宗教節慶與法會活動，歡迎廣大信眾蒞臨參與，同霑神恩。</p>
                </motion.div>

                <motion.div
                    className="events__grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {events.map((ev, i) => (
                        <motion.div
                            key={i}
                            className="event-card"
                            variants={cardVariants}
                            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'rgba(201, 164, 74, 0.4)' }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            <div className="event-card__date">
                                <span className="event-card__m">農曆{ev.month}</span>
                                <span className="event-card__d">{ev.day}</span>
                            </div>
                            <div>
                                <p className="event-card__tag">{ev.tag}</p>
                                <h3 className="event-card__name">{ev.name}</h3>
                                <p className="event-card__desc">{ev.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
