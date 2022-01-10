import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App'
import AuthContextProvider from './contexts/AuthContext'
import FetchImagesContextProvider from './contexts/FetchImagesContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FetchImagesContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FetchImagesContextProvider>
    </AuthContextProvider>
  </React.StrictMode >,
  document.getElementById('root')
)
