import { motion } from 'framer-motion'
import { MapPin, Clock, Phone } from 'lucide-react'

const contactInfo = [
    {
        id: 'address',
        label: '宮廟地址',
        value: '新北市中和區民享街261號',
        icon: <MapPin size={24} strokeWidth={1.5} />,
        href: 'https://maps.app.goo.gl/ixDCSdBE4LyjJLkr6' // 中和北海宮地標短網址
    },
    {
        id: 'time',
        label: '參拜時間',
        value: '每日 06:00 — 22:00\n(節慶期間將另行公告延長時間)',
        icon: <Clock size={24} strokeWidth={1.5} />,
        href: null
    },
    {
        id: 'phone',
        label: '聯絡專線',
        value: '(02) 2222-3333',
        icon: <Phone size={24} strokeWidth={1.5} />,
        href: 'tel:+886222223333'
    }
]

export default function Contact() {
    return (
        <section id="contact" className="contact-hero">
            <div className="contact-hero__grid">

                {/* 左側：極簡文字資訊區 */}
                <div className="contact-hero__left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="contact-hero__title">聯絡資訊</h2>
                    </motion.div>

                    <div className="contact-info">
                        {contactInfo.map((info, i) => (
                            <motion.div
                                key={info.id}
                                className="contact-info__item"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="contact-info__icon">
                                    {info.icon}
                                </div>
                                <div className="contact-info__content">
                                    <span className="contact-info__label">{info.label}</span>
                                    {info.href ? (
                                        <a
                                            href={info.href}
                                            target={info.id === 'address' ? '_blank' : '_self'}
                                            rel="noreferrer"
                                            className="contact-info__value"
                                            style={{
                                                textDecoration: 'none',
                                                display: 'inline-block',
                                                transition: 'color 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--cream)'}
                                        >
                                            {info.value}
                                        </a>
                                    ) : (
                                        <span className="contact-info__value">{info.value}</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 右側：滿版地圖與浮動交通指引卡片 */}
                <div className="contact-hero__right">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="contact-map-wrapper"
                    >
                        <iframe
                            src="https://www.google.com/maps?q=北海宮&output=embed"
                            title="中和北海宮地圖"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </motion.div>

                    {/* 交通指引浮動卡片 (明亮系質感) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="contact-hero__floating-card"
                    >
                        <h3 className="contact-hero__floating-title">
                            交通指引
                        </h3>

                        <div className="contact-hero__floating-list">
                            <div className="contact-hero__floating-item">
                                <span className="contact-hero__floating-tag">捷運系統</span>
                                <span className="contact-hero__floating-text">
                                    搭乘捷運環狀線至「中原站」，出站後步行約 10-12 分鐘即可抵達本宮。
                                </span>
                            </div>

                            <div className="contact-hero__floating-item">
                                <span className="contact-hero__floating-tag">公車客運</span>
                                <span className="contact-hero__floating-text">
                                    搭乘 307、橘5 等路線至「民享街口」站下車，步行約 3 分鐘。
                                </span>
                            </div>

                            <div className="contact-hero__floating-item">
                                <span className="contact-hero__floating-tag">自行開車</span>
                                <span className="contact-hero__floating-text">
                                    導航至民享街，宮廟周邊設有「民享市場收費停車場」可供停放。
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
