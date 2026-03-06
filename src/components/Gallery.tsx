import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { useLenis } from 'lenis/react'

const images = [
    { id: 1, src: `${import.meta.env.BASE_URL}images/temple_hero.png`, cap: '北海宮大殿全貌', desc: '主祀神明與殿內莊嚴', ratio: 1.2 },
    { id: 2, src: `${import.meta.env.BASE_URL}images/deity_pool_wang.png`, cap: '池府千歲金身', desc: '北海宮主神', ratio: 0.8 },
    { id: 3, src: `${import.meta.env.BASE_URL}images/temple_interior.png`, cap: '前殿剪影', desc: '信眾參拜盛況', ratio: 1.5 },
    { id: 4, src: `${import.meta.env.BASE_URL}images/deity_guanyin.png`, cap: '觀世音菩薩', desc: '慈悲法相', ratio: 0.75 },
    { id: 5, src: `${import.meta.env.BASE_URL}images/temple_architecture.png`, cap: '龍柱石雕', desc: '精緻工藝展現', ratio: 1 },
]

export default function Gallery() {
    const [selectedImg, setSelectedImg] = useState<typeof images[0] | null>(null)
    const lenis = useLenis()

    // 鎖定背景滾動
    useEffect(() => {
        if (selectedImg) {
            document.body.style.overflow = 'hidden'
            if (lenis) lenis.stop()
        } else {
            document.body.style.overflow = ''
            if (lenis) lenis.start()
        }
        return () => {
            document.body.style.overflow = ''
            if (lenis) lenis.start()
        }
    }, [selectedImg, lenis])

    return (
        <section id="gallery" className="gallery">
            <div className="gallery__container">
                <motion.div
                    className="gallery__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="gallery__eyebrow">
                        <span className="gallery__eyebrow-line" />
                        <span>信仰的視覺盛宴</span>
                        <span className="gallery__eyebrow-line" />
                    </div>
                    <h2 className="gallery__title">廟宇圖集</h2>
                    <p className="gallery__desc">
                        透過鏡頭，捕捉北海宮每一處莊嚴與神聖的瞬間。這裡凝聚了百年的香火與信眾的虔誠，展現東方宗教藝術的極致之美。
                    </p>
                </motion.div>

                <div className="gallery-masonry">
                    {images.map((img, i) => (
                        <motion.div
                            key={img.id}
                            className="gallery-masonry__item"
                            layoutId={`gallery-img-${img.id}`}
                            onClick={() => setSelectedImg(img)}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{
                                duration: 0.7,
                                delay: (i % 4) * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <div className="gallery-masonry__img-wrap" style={{ paddingTop: `${(1 / img.ratio) * 100}%` }}>
                                <motion.img
                                    src={img.src}
                                    alt={img.cap}
                                    className="gallery-masonry__img"
                                    loading="lazy"
                                />
                            </div>
                            <div className="gallery-masonry__overlay">
                                <div className="gallery-masonry__overlay-content">
                                    <span className="gallery-masonry__cap">{img.cap}</span>
                                    <div className="gallery-masonry__icon">
                                        <ZoomIn size={20} strokeWidth={1.5} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedImg && (
                    <div className="lightbox">
                        <motion.div
                            className="lightbox__overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImg(null)}
                            transition={{ duration: 0.4 }}
                        />

                        <div className="lightbox__content">
                            <motion.button
                                className="lightbox__close"
                                onClick={() => setSelectedImg(null)}
                                aria-label="關閉預覽"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                <X size={28} strokeWidth={1.5} />
                            </motion.button>

                            <motion.div
                                className="lightbox__img-container"
                                layoutId={`gallery-img-${selectedImg.id}`}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            >
                                <img src={selectedImg.src} alt={selectedImg.cap} className="lightbox__img" />
                            </motion.div>

                            <motion.div
                                className="lightbox__info"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                <h3 className="lightbox__cap">{selectedImg.cap}</h3>
                                <p className="lightbox__desc">{selectedImg.desc}</p>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}
