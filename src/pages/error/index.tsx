import React from 'react'
import { SmileOutlined } from '@ant-design/icons'
import { Button, Result, message } from 'antd'

interface IProps {
    className: string
}
const ResultPage: React.FC<IProps> = ({ className }: IProps) => {
    const [messageApi, contextHolder] = message.useMessage()
    const error = () => {
        messageApi.open({
            type: 'error',
            content: '试不了，哈哈哈哈！😀',
        })
    }
    return (
        <>
            {contextHolder}
            <Result
                className={className}
                icon={<SmileOutlined />}
                title="Great, You are quite commendable!"
                extra={
                    <Button type="primary" onClick={error}>
                        我还是想试试，嘿嘿！😊
                    </Button>
                }
            />
        </>
    )
}

export default ResultPage
