import React from 'react'
import FormDesign from '@/components'
import { GithubOutlined } from '@ant-design/icons'

interface HomeProps {}
const Home: React.FC<HomeProps> = ({}: HomeProps) => {
    return (
        <div className="h-full w-full">
            <header className="h-[50px] w-full relative flex items-center justify-center">
                <h1 className="text-center leading-[50px] text-2xl">表单设计</h1>
                <GithubOutlined
                    className="cursor-pointer text-3xl absolute right-3"
                    onClick={() => window.open('https://github.com/itouchzh/form-design', '_blank')}
                />
            </header>
            <main className="h-[calc(100%-100px)]">
                <FormDesign />
            </main>

            <footer className="w-full h-[50px] flex justify-center items-center bg-[#c9d6ee] text-gray-500">
                Form Design Created by Han
            </footer>
        </div>
    )
}
export default Home
