import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

function LenisScrollReset() {
    const lenis = useLenis()
    const { pathname } = useLocation()

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true })
        }
    }, [pathname, lenis])

    return null
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
            <LenisScrollReset />
            {children}
        </ReactLenis>
    )
}
