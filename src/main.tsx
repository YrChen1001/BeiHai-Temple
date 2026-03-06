import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll'
import './index.css'
import App from './App.tsx'

// 停用瀏覽器的原生捲動位置恢復，確保重整後頁面從頂部開始
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </HashRouter>
  </StrictMode>,
)
