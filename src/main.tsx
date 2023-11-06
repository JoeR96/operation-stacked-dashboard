import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/Routes.js'
import Header from "./components/header/header.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
        <Header/>
      <AppRoutes />
    </Router>
  </React.StrictMode>,
)
