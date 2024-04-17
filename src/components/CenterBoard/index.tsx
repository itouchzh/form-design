import { Form, Tooltip, Modal, Row, Col, Button } from 'antd'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { ReactSortable, SortableEvent } from 'react-sortablejs'
import { SaveOutlined, DeleteOutlined, YoutubeOutlined, CopyOutlined } from '@ant-design/icons'
import { cloneDeep, isEqual } from 'lodash'
import styles from '../index.module.scss'
import Preview from './modules/Preview'
import GenerateCode from './modules/GenerateCode'
import { IData, IRecord } from '../type'
import { useSelectItemContext } from '@/context/useSelectItem'
import CenterForm from './modules/CenterForm'

interface CenterBoardProps {
    data?: any
    hideKey?: boolean
    currentDragItem?: IRecord
    onChange: (value: Array<any>) => void
}

const CenterBoard: React.FC<CenterBoardProps> = ({
    data,
    currentDragItem,
    hideKey = false,
    onChange,
}: CenterBoardProps) => {
    const [centerData, setCenterData] = useState<IData>(data)
    const [list, setList] = useState<Array<any>>([])
    const [form] = Form.useForm()
    const previewRef = useRef<any>()
    const generateCodeRef = useRef<any>()
    const { selectItem, setSelectItem } = useSelectItemContext()
    useEffect(() => {
        setCenterData(data)
        setList(data.list)
    }, [data])

    const handleCopy = () => {
        const insertAfter = (array: IRecord[]) => {
            for (let i = 0; i < array.length; i++) {
                const element = array[i]
                if (element.key === selectItem.key) {
                    array.splice(i + 1, 0, { ...element }) // 使用 { ...element } 复制对象
                    handleColAddCopy(i + 1, array)
                    break // 中断整个循环
                }
                if (element.type === 'grid') {
                    element.columns!.forEach((item: any) => {
                        insertAfter(item.list)
                    })
                } else if (element.type === 'card') {
                    insertAfter(element.list)
                } else if (element.type === 'tabs' || element.type === 'collapses') {
                    element[element.type].forEach((item: any) => {
                        insertAfter(item.list)
                    })
                }
            }
        }
        insertAfter(cloneDeep(list))
    }
    const handleDelete = () => {
        // 递归遍历查找需要删除的项
        const traverse = (array: IRecord[]) => {
            const newArray: IRecord[] = []
            array.forEach((element, index) => {
                if (element.type === 'grid') {
                    // 栅格布局
                    element.columns!.forEach((item: any) => {
                        item.list = traverse(item.list)
                    })
                }
                if (element.type === 'card') {
                    element.list = traverse(element.list)
                }
                if (element.type === 'tabs' || element.type === 'collapses') {
                    element[element.type].forEach((item: any) => {
                        item.list = traverse(item.list)
                    })
                }
                if (element.key !== selectItem.key) {
                    newArray.push(element)
                } else {
                    if (array.length === 1) {
                        setSelectItem({ key: '', options: {} })
                    } else if (array.length - 1 > index) {
                        setSelectItem(array[index + 1])
                    } else {
                        setSelectItem(array[index - 1])
                    }
                }
            })
            return newArray
        }
        onChange(traverse(list))
    }
    // add drag item to list
    const handleOnAdd = (e: SortableEvent) => {
        const { newIndex } = e
        const currentList = cloneDeep(list)
        if (newIndex === list.length + 1) {
            currentList.push(currentDragItem)
        } else {
            currentList.splice(newIndex as number, 0, currentDragItem)
        }
        onChange(currentList)
        setSelectItem(currentDragItem!)
    }

    const handleColDragAdd = (_evt: SortableEvent, record: IRecord, index: number, type: string = 'grid') => {
        console.log(index, 'index', record, currentDragItem)
        const isHased = (arr: IRecord[], idx1 = 0) => {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i]
                if (item.key === currentDragItem!.key) {
                    console.log(idx1)
                    return idx1
                }
                if (item.type === 'grid') {
                    if (item.columns) {
                        for (let i = 0; i < item.columns?.length; i++) {
                            let ans: number = isHased(item.columns[i].list, i)
                            if (ans !== -1) {
                                return ans
                            }
                        }
                    }
                    // item?.columns?.forEach((col: any, idx) => {
                    //     idx1 = idx
                    //     let ans = isHased(col.list, idx1)
                    // })
                }
                if (item.type === 'card') {
                    isHased(item.list)
                }
                if (item.type === 'tabs' || item.type === 'collapses') {
                    isHased(item[item.type][index].list)
                }
            }
            return -1
        }

        const currentList = cloneDeep(list)

        let currentIndex = isHased(currentList)
        let addItem = currentIndex !== -1 && selectItem.key !== currentDragItem!.key ? selectItem : currentDragItem
        console.log(currentIndex, 'currentIndex')
        const recursiveSearch = (arr: IRecord[]) => {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i]
                if (item.key === record.key) {
                    if (type === 'grid') {
                        item.columns![index].list.push(addItem)
                    } else if (type === 'card') {
                        item.list.push(addItem)
                    } else if (type === 'tabs' || type === 'collapses') {
                        item[type][index].list.push(addItem)
                    }
                    return arr // 找到匹配项后中断整个递归
                }
                if (item.type === 'grid') {
                    item?.columns?.forEach((col: any) => {
                        recursiveSearch(col.list)
                    })
                }
                if (item.type === 'card') {
                    recursiveSearch(item.list)
                }
                if (item.type === 'tabs' || item.type === 'collapses') {
                    recursiveSearch(item[item.type][index].list)
                }
            }
            return arr
        }

        const deleteOriginItem = (arr: IRecord[]) => {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i]
                if (item.key === record.key) {
                    if (type === 'grid') {
                        if (currentIndex !== index && currentIndex !== -1) {
                            let curList = item.columns![currentIndex].list
                            for (let k = 0; k < curList.length; k++) {
                                if (addItem && curList[k].key === addItem.key) {
                                    curList.splice(k, 1)
                                    console.log(curList, 'curList')
                                    break
                                }
                            }

                            // arr.splice(i, 1)
                        }
                    }
                    return arr
                }
                if (item.type === 'grid') {
                    item?.columns?.forEach((col: any, idx: number) => {
                        deleteOriginItem(col.list)
                        currentIndex = idx
                    })
                }
            }
            return arr
        }
        const res = recursiveSearch(currentList)
        const currentRes = deleteOriginItem(res)
        console.log(currentRes, 'currentRes')
        onChange(currentRes)
        setSelectItem(currentDragItem!)
    }

    const getIndex = (firstIndex: number, type: string, currentItem: any) => {
        for (let secondIndex = 0; secondIndex < currentItem[type].length; secondIndex++) {
            const item = currentItem[type][secondIndex]
            console.log(item)
            for (let thirdIndex = 0; thirdIndex < item.list.length; thirdIndex++) {
                const listItem = item.list[thirdIndex]
                if (listItem.key === selectItem.key) {
                    return { firstIndex, secondIndex }
                }
            }
        }
        return { firstIndex: -1, secondIndex: -1 }
    }
    const handleColAddCopy = (newIndex: number, columns: IRecord[]) => {
        // 处理普通的添加
        const index = list.findIndex((item) => isEqual(item, selectItem))
        const key = columns[newIndex].type + '_' + new Date().getTime()
        columns[newIndex] = { ...columns[newIndex], key }
        if (index !== -1) {
            setSelectItem(columns[newIndex])
            onChange(columns)
            return
        }
        // 容器添加
        const cloneList = cloneDeep(list)
        console.log(cloneList)
        let detailIndex = { firstIndex: -1, secondIndex: -1 }
        outerLoop: for (let firstIndex = 0; firstIndex < cloneList.length; firstIndex++) {
            const item = cloneList[firstIndex]
            if (item.type === 'grid') {
                detailIndex = getIndex(firstIndex, 'columns', item)
                cloneList[detailIndex.firstIndex].columns[detailIndex.secondIndex].list = columns
                break outerLoop
            } else if (item.type === 'card') {
                cardLoop: for (let i = 0; i < item.list.length; i++) {
                    if (item.list[i].key === selectItem.key) {
                        detailIndex = { firstIndex, secondIndex: 0 }
                        break cardLoop
                    }
                }
                cloneList[detailIndex.firstIndex].list = columns
                break outerLoop
            } else if (item.type === 'tabs' || item.type === 'collapses') {
                detailIndex = getIndex(firstIndex, item.type, item)
                if (!isEqual(detailIndex, { firstIndex: -1, secondIndex: -1 })) {
                    cloneList[detailIndex.firstIndex][item.type][detailIndex.secondIndex].list = columns
                    break outerLoop
                }
            }
        }
        onChange(cloneList)
        setSelectItem(columns[newIndex])
    }

    // clear list
    const handleDeleteAll = () => {
        Modal.confirm({
            title: '提示',
            content: '确认清空吗',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                onChange([])
                setSelectItem({ key: '', options: {} })
            },
            footer: (_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn />
                    <OkBtn />
                </>
            ),
        })
    }
    // monitor data changes through event bubbling , if data changed, update the selectItem
    const handleChange = (e: any) => {
        console.log(e)
        if (e.bubbles && ['select', 'checkbox'].includes(selectItem.type || '')) {
            return
        }
        let value = ['number', 'select', 'checkbox', 'date', 'time', 'rate', 'slider', 'switch'].includes(
            selectItem.type || ''
        )
            ? e
            : e.target.value
        let curSelectItem = cloneDeep(selectItem)
        const deepSearch = (arr: IRecord[]) => {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i]
                if (item.key === selectItem.key) {
                    arr[i] = {
                        ...item,
                        options: {
                            ...item.options,
                            value,
                        },
                    }
                    curSelectItem = arr[i]
                    break
                } else if (item.type === 'grid') {
                    item?.columns?.forEach((col: any) => {
                        deepSearch(col.list)
                    })
                } else if (item.type === 'card') {
                    deepSearch(item.list)
                } else if (item.type === 'tabs' || item.type === 'collapses') {
                    item[item.type].forEach((tab: any) => {
                        deepSearch(tab.list)
                    })
                }
            }
            return arr
        }
        onChange(deepSearch(list))
        setSelectItem((prev) => ({ ...prev, ...curSelectItem }))
    }

    // 组内交换位置
    const handleEnd = useCallback(
        ({ oldIndex, newIndex }: SortableEvent) => {
            console.log(oldIndex)
            if (typeof oldIndex === 'number' && typeof newIndex === 'number' && oldIndex !== newIndex) {
                let arr = cloneDeep(list)
                ;[arr[oldIndex], arr[newIndex]] = [arr[newIndex], arr[oldIndex]]
                onChange(arr)
            }
        },
        [list, onChange]
    )
    const handlePositionChange = (record: IRecord) => {
        const traverse = (array: IRecord[]) => {
            for (let index = 0; index < array.length; index++) {
                let element = array[index]
                if (element.type === 'grid') {
                    // 栅格布局
                    for (let j = 0; j < element.columns!.length; j++) {
                        let item = element.columns![j]
                        item.list = traverse(item.list)
                    }
                }
                if (element.type === 'card') {
                    element.list = traverse(element.list)
                }
                if (element.type === 'tabs' || element.type === 'collapses') {
                    for (let k = 0; k < element[element.type].length; k++) {
                        let item = element[element.type][k]
                        item.list = traverse(item.list)
                    }
                }
                if (element.key === record.key) {
                    array[index] = record
                    return array
                }
            }
            return array
        }
        onChange(traverse(list))
    }
    return (
        <div className="flex-1 min-w-[550px] border-gray-300 border-y-2 border-solid overflow-auto">
            <div className="flex justify-end h-[40px] gap-3 border-b border-solid border-gray-100 mr-3">
                <Tooltip title="预览" className="cursor-pointer text-blue-300 hover:text-blue-500 text-xl">
                    <YoutubeOutlined onClick={() => previewRef.current.changeModalState()} />
                </Tooltip>

                <Tooltip title="生成代码" className="cursor-pointer text-blue-300 hover:text-blue-500 text-xl">
                    <SaveOutlined onClick={() => generateCodeRef.current.changeModalState()} />
                </Tooltip>
                <Tooltip title="清空" className="cursor-pointer text-blue-300 hover:text-blue-500 text-xl">
                    <DeleteOutlined onClick={handleDeleteAll} />
                </Tooltip>
            </div>
            <div style={{ height: 'calc(100% - 41px)' }} className="relative box-border p-1">
                {list.length === 0 && (
                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-blue-300">
                        从左侧选择控件添加
                    </p>
                )}
                <Form
                    form={form}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    className="w-full h-full"
                    style={centerData.config.customStyle}
                    layout={centerData.config.layout}
                    labelCol={centerData.config.labelCol}
                    wrapperCol={centerData.config.wrapperCol}
                    onChange={handleChange}
                    size={centerData.config.size}
                    disabled={centerData.config.disabled}
                >
                    <ReactSortable
                        group="form-draggable"
                        animation={150}
                        tag="div"
                        className="w-full h-full"
                        ghostClass={styles['sortable-ghost']}
                        list={list}
                        setList={setList}
                        onStart={(e) => setSelectItem(list[e.oldIndex as number])}
                        onAdd={handleOnAdd}
                        onEnd={handleEnd}
                    >
                        {list.map((item: IRecord) => (
                            <CenterForm
                                key={item.key}
                                record={item}
                                hideKey={hideKey}
                                config={centerData.config}
                                handleCopy={handleCopy}
                                handleDelete={handleDelete}
                                onChange={handleChange}
                                handleColAdd={handleColDragAdd}
                                positionChange={handlePositionChange}
                            />
                        ))}
                    </ReactSortable>
                </Form>
            </div>
            <Preview ref={previewRef} data={centerData} onChange={onChange} />
            <GenerateCode ref={generateCodeRef} data={centerData} />
        </div>
    )
}
export default React.memo(CenterBoard)
