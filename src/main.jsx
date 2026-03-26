import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react' // CLERK AUTH
import './index.css'
import App from './App.jsx'

// CLERK AUTH — Read publishable key from environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error(
    'Missing Clerk Publishable Key. Set VITE_CLERK_PUBLISHABLE_KEY in your .env.local file. ' +
    'Get your key from https://dashboard.clerk.com/last-active?path=api-keys'
  )
}

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(() => {})
        .catch(() => {});
    });
  } else {
    // Unregister any existing service workers during development
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
}

// CLERK AUTH — ClerkProvider wraps the entire app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>,
)
