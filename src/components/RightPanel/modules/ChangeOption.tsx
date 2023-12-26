import React, { Reducer, useEffect, useReducer, useState } from 'react'
import { Button, Col, Divider, Input, InputNumber, Row } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { cloneDeep, isEqual, uniqueId } from 'lodash'
import { IOptions } from '@/components/type'

type Action =
    | { type: 'add' }
    | { type: 'delete'; payload: { index: number } }
    | {
          type: 'modify'
          payload: { index: number; label: string; value: string }
      }
    | {
          type: 'UPDATE_OPTIONS'
          payload: any[]
      }

interface IChangeOptiopProps {
    options: IOptions[]
    type: string
    onChange: (options: any, type: string) => void
}
const ChangeOption: React.FC<IChangeOptiopProps> = ({ options, type, onChange }: IChangeOptiopProps) => {
    /**
     * @param state
     * @param actions
     * @param additionalData if delete, paload will be index , if modify, payload will be {index, label, value}
     * @returns
     */
    const reducer: Reducer<any[], Action> = (state, actions) => {
        switch (actions.type) {
            case 'add':
                if (type === 'rules') {
                    return [...state, { pattern: '', message: '' }]
                }
                if (type === 'columns') {
                    return [...state, { span: 12, list: [] }]
                }
                if (type === 'tabs') {
                    return [...state, { key: uniqueId(), label: 'new Tab', list: [] }]
                }
                if (type === 'collapses') {
                    return [...state, { key: uniqueId(), label: 'new Collapse', list: [] }]
                }

                return [
                    ...state,
                    {
                        label: uniqueId(),
                        value: uniqueId(),
                    },
                ]
            case 'delete':
                return state.filter((_, index) => index !== actions.payload.index)
            case 'modify':
                const currentState = cloneDeep(state)
                currentState[actions.payload.index][actions.payload.label] = actions.payload.value
                return currentState
            case 'UPDATE_OPTIONS':
                return [...actions.payload]
            default:
                return state
        }
    }
    const [selectOptions, dispatch] = useReducer(reducer, options)
    useEffect(() => {
        if (!isEqual(options, selectOptions)) {
            dispatch({ type: 'UPDATE_OPTIONS', payload: options })
        }
    }, [options])
    useEffect(() => {
        type = ['select', 'checkbox', 'radio'].includes(type) ? 'option' : type
        onChange(cloneDeep(selectOptions), type)
    }, [selectOptions])
    return (
        <>
            <div className={['select', 'checkbox', 'radio'].includes(type) ? ' ' : 'hidden'}>
                <div className="max-h-40 overflow-auto">
                    {selectOptions?.map((option: IOptions, index: number) => {
                        return (
                            <div className="flex gap-2 mb-2" key={index}>
                                <Input
                                    placeholder="属性名"
                                    value={option.label}
                                    onChange={(e: any) =>
                                        dispatch({
                                            type: 'modify',
                                            payload: {
                                                index,
                                                label: 'label',
                                                value: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    value={option.value}
                                    placeholder="属性值"
                                    onChange={(e: any) =>
                                        dispatch({
                                            type: 'modify',
                                            payload: {
                                                index,
                                                label: 'value',
                                                value: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <Button
                                    type="primary"
                                    danger
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                    onClick={() =>
                                        dispatch({
                                            type: 'delete',
                                            payload: { index },
                                        })
                                    }
                                />
                            </div>
                        )
                    })}
                </div>

                <Button type="link" icon={<PlusOutlined />} onClick={() => dispatch({ type: 'add' })}>
                    添加一组
                </Button>
            </div>
            {type === 'rules' && (
                <>
                    <div className="max-h-40 overflow-auto mt-2">
                        {selectOptions.map((rule: any, index: number) => (
                            <div
                                key={index}
                                className="bg-[#f8f8f8] p-1 hover:bg-blue-50 border-b-2 border-b-[#ffffff] border-solid"
                            >
                                <div className="flex items-center">
                                    <div className="min-w-[75px] cursor-default">正则表达式</div>
                                    <Input
                                        placeholder="正则表达式"
                                        value={rule.pattern}
                                        onChange={(e: any) =>
                                            dispatch({
                                                type: 'modify',
                                                payload: {
                                                    index,
                                                    label: 'pattern',
                                                    value: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex items-center mt-3">
                                    <div className="min-w-[75px] cursor-default">错误提示</div>
                                    <Input
                                        placeholder="错误提示"
                                        value={rule.message}
                                        onChange={(e: any) =>
                                            dispatch({
                                                type: 'modify',
                                                payload: {
                                                    index,
                                                    label: 'message',
                                                    value: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <Button
                                    type="link"
                                    danger
                                    onClick={() =>
                                        dispatch({
                                            type: 'delete',
                                            payload: { index },
                                        })
                                    }
                                >
                                    删除
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Button type="link" icon={<PlusOutlined />} onClick={() => dispatch({ type: 'add' })}>
                        添加一组
                    </Button>
                </>
            )}

            {type === 'columns' && (
                <>
                    <div className="px-3">
                        {selectOptions.map((item: any, index: number) => (
                            <div className="mb-2">
                                <Row gutter={10}>
                                    <Col span={16}>
                                        <InputNumber
                                            max={24}
                                            min={0}
                                            value={item.span}
                                            className="w-full"
                                            onChange={(value) =>
                                                dispatch({ type: 'modify', payload: { index, label: 'span', value } })
                                            }
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <Button
                                            danger
                                            shape="circle"
                                            icon={<DeleteOutlined />}
                                            onClick={() => dispatch({ type: 'delete', payload: { index } })}
                                        ></Button>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                    <Button type="link" icon={<PlusOutlined />} onClick={() => dispatch({ type: 'add' })}>
                        添加一组
                    </Button>
                </>
            )}

            {type === 'tabs' ||
                (type === 'collapses' && (
                    <>
                        <div className="px-3">
                            {selectOptions.map((item: any, index: number) => (
                                <div className="mb-2">
                                    <Row gutter={10}>
                                        <Col span={16}>
                                            <Input
                                                placeholder="属性名"
                                                value={item.label}
                                                onChange={(e: any) =>
                                                    dispatch({
                                                        type: 'modify',
                                                        payload: {
                                                            index,
                                                            label: 'label',
                                                            value: e.target.value,
                                                        },
                                                    })
                                                }
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <Button
                                                danger
                                                shape="circle"
                                                icon={<DeleteOutlined />}
                                                onClick={() => dispatch({ type: 'delete', payload: { index } })}
                                            ></Button>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </div>
                        <Button type="link" icon={<PlusOutlined />} onClick={() => dispatch({ type: 'add' })}>
                            添加一组
                        </Button>
                    </>
                ))}
        </>
    )
}

export default React.memo(ChangeOption)
