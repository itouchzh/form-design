import React from 'react'
import FormDesign from '@/components'
import { GithubOutlined } from '@ant-design/icons'

interface HomeProps {}
const Home: React.FC<HomeProps> = ({}: HomeProps) => {
    return (
        <div className="h-full w-full min-w-[1177px]">
            <header className="h-[50px] w-full relative flex items-center justify-center">
                <h1 className="text-center leading-[50px] text-2xl ">表单设计</h1>
                <div
                    className="absolute right-10 cursor-pointer flex items-center"
                    onClick={() => window.open('https://github.com/itouchzh/form-design', '_blank')}
                >
                    <GithubOutlined className="cursor-pointer text-3xl mr-2" />
                    <span className=" font-mono">Github</span>
                </div>
            </header>
            <main className="h-[calc(100%-100px)]">
                <FormDesign />
            </main>

            <footer className="w-full h-[50px] flex justify-center items-center bg-[#c9d6ee] text-gray-500 font-mono">
                Form Design Created by Han
            </footer>
        </div>
    )
}
export default Home
