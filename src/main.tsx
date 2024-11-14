import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TareasProvider } from './context/TareasContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TareasProvider>
      <App />
    </TareasProvider>    
  </StrictMode>,
)
