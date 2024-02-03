import React from 'react'

interface MainCardProps {
    title: string
    content: string
    time: string
}
const MainCard: React.FC<MainCardProps> = ({ title, content, time }: MainCardProps) => {
    return (
        <div
            className="relative rounded-xl box-border p-6 border border-gray-200 border-solid h-[200px] flex flex-col hover:shadow-xl cursor-pointer"
            style={{ width: 'calc((100% - 96px)/3)' }}
        >
            <h1 className="text-xl text-blue-400 font-medium mb-[2px] border-b border-solid border-b-rose-50 ">{title}</h1>
            <p className="font-light flex-auto">{content}</p>
            <div className="height-[30px]">{time}</div>
        </div>
    )
}

export default React.memo(MainCard)
