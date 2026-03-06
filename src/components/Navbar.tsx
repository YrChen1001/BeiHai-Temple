import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { label: '首頁', href: '/' },
    { label: '神明介紹', href: '/deities' },
    { label: '服務項目', href: '/services' },
    { label: '活動公告', href: '/events' },
    { label: '廟宇圖集', href: '/gallery' },
    { label: '聯絡資訊', href: '/contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
    const lenis = useLenis()

    const handleLogoClick = () => {
        if (lenis) lenis.scrollTo(0, { immediate: true })
    }

    const isDarkRoute = location.pathname !== '/'

    useEffect(() => {
        const handler = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handler, { passive: true })
        handler()
        return () => window.removeEventListener('scroll', handler)
    }, [])

    // 當手機版選單開啟時，禁止背景滾動
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [menuOpen])

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isDarkRoute ? 'navbar--solid-dark' : ''}`}
            >
                <div className="navbar__inner">
                    <Link
                        className="navbar__logo group"
                        to="/"
                        aria-label="回首頁"
                        onClick={handleLogoClick}
                    >
                        {/* 導航列在首頁透明底或捲動後深色底時，皆使用白字 logo 以保持質感 */}
                        <img
                            src={`${import.meta.env.BASE_URL}images/logo-white.svg`}
                            alt="北海宮"
                            className="navbar__logo-img"
                        />
                    </Link>

                    <div className="navbar__nav">
                        {navLinks.map(link => {
                            const isActive = location.pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                                    to={link.href}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active-indicator"
                                            className="navbar__link-indicator"
                                            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    <div className="navbar__actions">
                        <Link className="navbar__cta" to="/lottery">
                            線上求籤
                        </Link>

                        <button
                            className="navbar__menu-btn"
                            onClick={() => setMenuOpen(true)}
                            aria-label="開啟選單"
                        >
                            <Menu size={24} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="mobile-menu__overlay" onClick={() => setMenuOpen(false)} />

                        <motion.div
                            className="mobile-menu__drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="mobile-menu__header">
                                <img src={`${import.meta.env.BASE_URL}images/logo-black.svg`} alt="北海宮" className="navbar__logo-img navbar__logo-img--mobile" />
                                <button
                                    className="mobile-menu__close"
                                    onClick={() => setMenuOpen(false)}
                                    aria-label="關閉選單"
                                >
                                    <X size={28} strokeWidth={1.5} />
                                </button>
                            </div>

                            <div className="mobile-menu__links">
                                {navLinks.map((link, i) => (
                                    <div key={link.href} className="mobile-menu__link-wrapper">
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                                        >
                                            <Link
                                                className={`mobile-menu__link ${location.pathname === link.href ? 'mobile-menu__link--active' : ''}`}
                                                to={link.href}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>

                            <motion.div
                                className="mobile-menu__footer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
                            >
                                <Link
                                    className="mobile-menu__cta"
                                    to="/lottery"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    線上求籤
                                </Link>
                                <p className="mobile-menu__copy">© {new Date().getFullYear()} 北海宮 | 小滿科技有限公司製作</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
