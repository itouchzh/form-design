import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@/assets/styles/reset.css'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN' // 引入中文语言包
import SelectItemContextProvider from './context/useSelectItem'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <ConfigProvider locale={zhCN}>
            <SelectItemContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </SelectItemContextProvider>
        </ConfigProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
