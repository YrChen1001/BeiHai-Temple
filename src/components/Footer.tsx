import { Link } from 'react-router-dom'
import { MapPin, Clock } from 'lucide-react'

const quickLinks = [
    { label: '首頁', href: '/' },
    { label: '神明介紹', href: '/deities' },
    { label: '服務項目', href: '/services' },
    { label: '線上求籤', href: '/lottery' },
    { label: '活動公告', href: '/events' },
    { label: '廟宇圖集', href: '/gallery' },
    { label: '聯絡資訊', href: '/contact' },
]

const serviceLinks = ['光明燈', '安太歲', '補財庫', '祭改祈願', '神明問事', '法會活動']

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container--wide">
                <div className="footer__top-layout">
                    {/* 左側 — 品牌與理念 */}
                    <div className="footer__brand-col">
                        <div className="footer__brand-name">中和北海宮</div>
                        <p className="footer__brand-desc">
                            源自台南北門蚵寮保安宮分香，民國九十六年入火安座。<br />
                            主祀池府千歲代天巡狩，為新北中和地區重要信仰樞紐，<br />
                            香火鼎盛，信眾雲集。
                        </p>
                    </div>

                    {/* 右側 — 資訊連結 */}
                    <div className="footer__links-col">
                        <div className="footer__nav-group">
                            <h4 className="footer__col-h">導覽</h4>
                            <ul className="footer__links">
                                {quickLinks.map(l => (
                                    <li key={l.href}>
                                        <Link className="footer__link" to={l.href}>{l.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer__nav-group">
                            <h4 className="footer__col-h">祈福</h4>
                            <ul className="footer__links">
                                {serviceLinks.map(s => (
                                    <li key={s}><span className="footer__link">{s}</span></li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer__nav-group">
                            <h4 className="footer__col-h">參拜</h4>
                            <div className="footer__ci">
                                <MapPin size={14} className="footer__ci-icon" />
                                <span className="footer__ci-val">新北市中和區<br />民享街261號</span>
                            </div>
                            <div className="footer__ci">
                                <Clock size={14} className="footer__ci-icon" />
                                <span className="footer__ci-val">每日 06:00 — 22:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 背景大字裝飾設計 */}
                <div className="footer__huge-text" aria-hidden="true">
                    代天巡狩
                </div>

                <div className="footer__bottom">
                    <span className="footer__copy">
                        &copy; {new Date().getFullYear()} 中和北海宮 版權所有 | 網站設計製作：小滿科技有限公司
                    </span>
                    <span className="footer__motto">祈求風調雨順 · 國泰民安</span>
                </div>
            </div>
        </footer>
    )
}
