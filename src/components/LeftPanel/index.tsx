import React, { useState } from 'react'
import type { IRecord } from '../type'
import { Collapse, CollapseProps } from 'antd'
import { basicList, layoutComponentList } from '../config/formComponentsConfig'
import styles from '@/components/index.module.scss'
import DraggableList from './modules/DraggableList'
interface ILeftPanelProps {
    getDragItem: (record: IRecord) => void
    addList: (item: IRecord) => void
}
const LeftPanel: React.FC<ILeftPanelProps> = ({ getDragItem, addList }: ILeftPanelProps) => {
    const [basicsList, setBasicsList] = useState<Array<any>>(basicList)
    const [layoutComponentsList, setLayoutcomponentsList] = useState<Array<any>>(layoutComponentList)

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: '布局组件',
            children: (
                <DraggableList
                    list={layoutComponentsList}
                    getDragItem={getDragItem}
                    addList={addList}
                    setList={setLayoutcomponentsList}
                />
            ),
        },
        {
            key: '2',
            label: '通用组件',
            children: (
                <DraggableList list={basicsList} getDragItem={getDragItem} addList={addList} setList={setBasicsList} />
            ),
        },
    ]
    return (
        <div
            className={`${styles['left-panel']} relative w-[270px] min-w-[270px] bg-white border-solid border-2 border-gray-300 border-r-gray-100`}
        >
            <div className="grid place-items-center h-10 bg-white border-solid border-b border-gray-100">
                <h1 className="cursor-default text-blue-400 text-[20px]">常用组件</h1>
            </div>
            <main className={styles['left-main']}>
                <Collapse items={items} ghost defaultActiveKey={['2']} />
            </main>
        </div>
    )
}

export default React.memo(LeftPanel)
