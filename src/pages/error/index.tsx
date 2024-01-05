import React from 'react'
import { SmileOutlined } from '@ant-design/icons'
import { Button, Result } from 'antd'

interface IProps {
    className: string
}
const ResultPage: React.FC<IProps> = ({ className }: IProps) => (
    <Result
        className={className}
        icon={<SmileOutlined />}
        title="Great, You are quite commendable!"
        extra={<Button type="primary">我还是想试试，嘿嘿！😊</Button>}
    />
)

export default ResultPage
