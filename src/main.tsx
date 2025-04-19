import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { ThemeProvider } from './context/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='system'>
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
)
