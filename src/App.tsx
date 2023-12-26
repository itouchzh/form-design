import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import './App.css'


function App() {
    const outlet = useRoutes(routes)
    return <>{outlet}</>
}

export default App
