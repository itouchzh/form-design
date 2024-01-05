import { useState } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'
import routes from './router'
import './App.css'
import { Modal } from 'antd'
import ResultPage from './pages/error'

const getIsMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
function App() {
    const outlet = useRoutes(routes)
    const navigate = useNavigate()
    const [isMobileDevice, setIsMobileDevice] = useState(getIsMobileDevice)
    const [isModalOpen, setIsModalOpen] = useState(getIsMobileDevice)

    const handleOk = () => {
        setIsModalOpen(false)
        setIsMobileDevice(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        navigate('/')
    }

    return (
        <>
            {isMobileDevice ? (
                <>
                    <Modal title="提示：" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="是">
                        <p>是否继续在移动端操作？</p>
                    </Modal>
                    <ResultPage className={isModalOpen ? 'hidden' : ''} />
                </>
            ) : (
                <>{outlet}</>
            )}
        </>
    )
}

export default App
