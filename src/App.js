import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter } from "react-router-dom"
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/UI/AppRouter';
import { AuthContex } from './contex';


function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setLoading(false)
  }, [])

  return (
    <AuthContex.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter></AppRouter>
      </BrowserRouter >
    </AuthContex.Provider>

  )
}

export default App;
