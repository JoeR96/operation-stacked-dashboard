import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginForm from './components/LoginForm/LoginForm.js'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/Routes.js'
import Dashboard from './components/Dashboard/Dashboard.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </React.StrictMode>,
)
