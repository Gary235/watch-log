import React from 'react'
import ReactDOM from 'react-dom/client'

import { NotificationsProvider } from '@mantine/notifications'
import App from './App'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </React.StrictMode>
)
