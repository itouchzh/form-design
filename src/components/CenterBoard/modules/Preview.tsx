import { Form, Modal } from 'antd'
import React, { useEffect, useImperativeHandle, useState } from 'react'
import { IData, IRecord } from '@/components/type'
import FormItem from './FormItem'
import { useSelectItemContext } from '@/context/useSelectItem'

export interface PreviewProps {
    data?: IData
    onChange?: (value: IRecord[], key?: string) => void
}

const Preview = ({ data, onChange }: PreviewProps, ref: any) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { selectItem, setSelectItem } = useSelectItemContext()
    const changeModalState = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    useImperativeHandle(ref, () => {
        return {
            changeModalState,
        }
    })
    const handleChange = (val: any) => {
        const { type, key } = selectItem
        let value = ['input', 'textarea'].includes(type as string) ? val.target.value : val
        const changeItem = (arr: IRecord[]) => {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i]
                if (item.key === key) {
                    arr[i] = {
                        ...item,
                        options: {
                            ...item.options,
                            value,
                        },
                    }
                    setSelectItem(arr[i])
                    break
                } else if (item.type === 'grid') {
                    item?.columns?.forEach((col: any) => {
                        changeItem(col.list)
                    })
                } else if (item.type === 'card') {
                    changeItem(item.list)
                } else if (item.type === 'tabs' || item.type === 'collapses') {
                    item[item.type].forEach((tab: any) => {
                        changeItem(tab.list)
                    })
                }
            }
            return arr
        }
        onChange && onChange(changeItem(data!.list))
    }
    return (
        <>
            <Modal
                title="表单预览"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={850}
                className=" m-auto"
            >
                <div className="p-5">
                    {typeof data?.list !== 'undefined' && typeof data.config !== 'undefined' && (
                        <Form
                            layout={data.config.layout}
                            requiredMark={data.config.hideRequiredMark}
                            style={data.config.customStyle}
                        >
                            {data.list.map((record: any) => (
                                <FormItem
                                    record={record}
                                    config={data.config}
                                    key={record.key}
                                    onChange={handleChange}
                                    onPreviewChange={handleChange}
                                />
                            ))}
                        </Form>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default React.memo(React.forwardRef(Preview))
