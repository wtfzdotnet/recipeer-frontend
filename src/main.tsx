import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProvider } from '@/providers/ThemeProvider'
// Initialize i18n
import './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="recipeer-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
