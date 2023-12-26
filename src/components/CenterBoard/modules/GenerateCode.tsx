import { Button, Modal, Tabs, message } from 'antd'
import React, { ForwardRefRenderFunction, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import type { TabsProps } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { generateReactTSXCode } from '@/utils/generate'
interface IGenerateCodeProps {
    data?: any
}
export interface FormRenderInstance {}
const GenerateCode: ForwardRefRenderFunction<FormRenderInstance, IGenerateCodeProps> = (
    { data }: IGenerateCodeProps,
    ref
) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [reactCodeTSX, setReactCodeTSX] = useState<string>('')
    const [messageApi, contextHolder] = message.useMessage()
    useEffect(() => {
        setReactCodeTSX(generateReactTSXCode(data as any))
    }, [data])

    const handleCancel = () => {
        setModalOpen(false)
    }
    const changeModalState = () => {
        setModalOpen(!isModalOpen)
    }
    useImperativeHandle(ref, () => {
        return { changeModalState }
    })
    const exportCode = (_content: any, filename: string = 'demo.tsx') => {
        const element = document.createElement('a')
        const file = `data:text/javascript;charset=utf-8,${encodeURIComponent(reactCodeTSX)}`
        element.href = file
        element.download = filename
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    const codeChange = (value: string) => {
        setReactCodeTSX(value)
    }

    const handleCopyClick = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(reactCodeTSX)
            messageApi.info('复制成功')
        } catch (err) {
            messageApi.error('复制失败')
        }
    }, [reactCodeTSX])
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'React',
            children: (
                <CodeMirror
                    value={reactCodeTSX}
                    maxHeight="500px"
                    theme="dark"
                    extensions={[
                        javascript({
                            jsx: true,
                            typescript: true,
                        }),
                    ]}
                    onChange={codeChange}
                />
            ),
        },
        
    ]
    return (
        <>
            {contextHolder}
            <Modal
                title="生成代码"
                open={isModalOpen}
                onOk={exportCode}
                onCancel={handleCancel}
                cancelText="关闭"
                okText="导出代码"
                width={850}
                className="m-auto"
                footer={
                    <>
                        <Button type="primary" icon={<CopyOutlined />} onClick={handleCopyClick}>
                            复制代码
                        </Button>
                        <Button type="primary" onClick={exportCode}>
                            导出代码
                        </Button>
                        <Button onClick={handleCancel}>取消</Button>
                    </>
                }
            >
                <Tabs defaultActiveKey="1" items={items} />
            </Modal>
        </>
    )
}

export default React.memo(React.forwardRef(GenerateCode))
