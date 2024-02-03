import { Button, Col, Row } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import MainCard from './components/MainCard'
import { GithubOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
    const multiple = 10
    const imgBoxRef = useRef<HTMLDivElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        const transformElement = (x: number, y: number) => {
            if (imgRef.current) {
                const box = imgRef.current.getBoundingClientRect()
                const calcX = -(y - box.y - box.height / 2) / multiple
                const calcY = (x - box.x - box.width / 2) / multiple
                imgRef.current.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            window.requestAnimationFrame(() => {
                transformElement(e.clientX, e.clientY)
            })
        }

        const handleMouseLeave = () => {
            window.requestAnimationFrame(() => {
                if (imgRef.current) {
                    imgRef.current.style.transform = 'rotateX(0) rotateY(0)'
                }
            })
        }

        imgBoxRef.current!.addEventListener('mousemove', handleMouseMove)
        imgBoxRef.current!.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            // Cleanup event listeners
            if (imgBoxRef.current) {
                imgBoxRef.current.removeEventListener('mousemove', handleMouseMove)
                imgBoxRef.current.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [imgRef.current])

    return (
        <div className="h-screen min-w-[900px]">
            <header className="h-[50px] px-2 shadow-md mb-2 flex items-center relative z-[1]">
                <Row>
                    <Col span={24}>
                        <h1 className="text-xl text-blue-500 font-bold cursor-pointer">Form Design</h1>
                    </Col>
                </Row>
            </header>
            <main className="h-[640px] flex flex-col justify-around items-center">
                <img
                    className="filter blur-[4px] hover:blur-0 transition-transform transform hover:scale-110 absolute left-0 top-[50px] w-[240px]"
                    src="https://gw.alipayobjects.com/zos/bmw-prod/49f963db-b2a8-4f15-857a-270d771a1204.svg"
                    alt="bg"
                />
                <img
                    className="filter blur-[4px] hover:blur-0 transition-transform duration-1000 transform hover:scale-110 absolute right-[40%] bottom-[120px] w-[240px]"
                    src="https://gw.alipayobjects.com/zos/bmw-prod/e152223c-bcae-4913-8938-54fda9efe330.svg"
                    alt="bg"
                />
                <div
                    className="absolute right-0 top-[65px] w-[625px] h-[500px] filter blur-[4px] hover:blur-0 "
                    style={{
                        transform: 'rotate3d(24, -83, 45, 57deg)',
                    }}
                    ref={imgBoxRef}
                >
                    <img
                        ref={imgRef}
                        src={require('../../assets/images/bg.png')}
                        className="w-full h-full object-cover transition-transform"
                    />
                </div>
                <article className="relative z-[1]">
                    <h1 className="text-[60px] font-black p-5">Form Design </h1>
                    <p>助力设计开发者「更灵活」地搭建出 表单，让用户「快乐工作」～</p>
                </article>
                <div className="w-[200px] flex justify-between">
                    <Button type="primary" onClick={() => navigate('/home')}>
                        开始使用
                    </Button>
                    <Button
                        icon={<GithubOutlined />}
                        onClick={() => window.open('https://github.com/itouchzh/form-design', '_blank')}
                    >
                        Github
                    </Button>
                </div>
                <div className="w-full flex justify-around">
                    <MainCard title={'可视化'} content={'所见即所得，轻松完成表单构建。'} time={'2023-02-03'} />
                    <MainCard title={'丰富布局'} content={'提供了栅格，卡片等主流布局方案。'} time={'2023-02-03'} />
                    <MainCard title={'代码导出'} content={'一键导出React代码，快速开发。'} time={'2023-02-03'} />
                </div>
            </main>
        </div>
    )
}

export default MainPage
