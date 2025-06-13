import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from '@/router'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SEOProvider } from '@/lib/seo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="recipeer-ui-theme">
      <SEOProvider>
        <RouterProvider router={router} />
      </SEOProvider>
    </ThemeProvider>
  </StrictMode>,
)
