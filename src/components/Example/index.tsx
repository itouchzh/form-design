import React, { useState, useEffect } from 'react'
import { Form, Space, Button, Tabs, Input } from 'antd'
interface IProps {}
const App: React.FC<IProps> = ({}: IProps) => {
    const [form] = Form.useForm()
    return (
        <>
            <Form form={form} layout="horizontal" size="middle">
                <Tabs
                    items={[
                        {
                            key: '1',
                            label: 'Tab 1',
                            children: (
                                <>
                                    {' '}
                                    <Form.Item label="输入框" name="input_1703389910854" initialValue="">
                                        {' '}
                                        <Input
                                            placeholder="请输入"
                                            maxLength={10}
                                            allowClear={true}
                                            bordered={true}
                                            disabled={false}
                                            type="text"
                                            size="middle"
                                        />{' '}
                                    </Form.Item>
                                </>
                            ),
                        },
                    ]}
                    defaultActiveKey="1"
                    centered={false}
                    type={'line'}
                    size={'middle'}
                    tabPosition={'top'}
                />
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                        <Button htmlType="reset">重置</Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    )
}
export default App
