import React, { useEffect, useState } from 'react'
import {
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    TimePicker,
    Rate,
    Switch,
    Button,
    message,
    Upload,
    TreeSelect,
    Cascader,
    Alert,
    Divider,
    Card,
    Row,
    Col,
    Table,
    Tabs,
    TabsProps,
    Collapse,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'
import { INFORMITEM } from '@/components/config/options'
import { IRecord } from '@/components/type'
import { useSelectItemContext } from '@/context/useSelectItem'

interface IFormItemProps {
    className?: string
    record?: any
    config?: any
    onChange?: (value: any, key: string) => void
    onPreviewChange?: (value: any, key: string) => void
}
const FormItem: React.FC<IFormItemProps> = ({ record, config, onChange, onPreviewChange }: IFormItemProps) => {
    const props = { record, config, onChange, onPreviewChange }
    const [_messageApi, contextHolder] = message.useMessage()
    const { setSelectItem } = useSelectItemContext()
    const formatValue = (value: any, type: string) => {
        let formattedValue = cloneDeep(value)
        if (type === 'date') {
            formattedValue = dayjs(formattedValue).format('YYYY-MM-DD').toString()
        } else if (type === 'time') {
            formattedValue = dayjs(formattedValue).format('HH:mm:ss').toString()
        }
        return formattedValue
    }
    const handleOnChange = (value: any) => {
        const formattedValue = formatValue(value, record.type)
        onChange && onChange(formattedValue, record.key)
    }
    const formChange = (value: any) => {
        console.log(value)
        if (['checkbox'].includes(record.type) && value?.bubbles) {
            return
        }
        const formattedValue = formatValue(value, record.type)
        onPreviewChange && onPreviewChange(formattedValue, record.key)
    }
    const {
        width,
        defaultValue,
        mode,
        size,
        disabled,
        clearable,
        hidden,
        placeholder,
        maxLength,
        value,
        rows,
        readonly,
        bordered,
        option,
        min,
        max,
        step,
        showSearch,
        optionType,
        format,
        picker,
        allowHalf,
        count,
        showInput,
        maxCount,
        directory,
        name,
        accept,
        action,
        headers,
        multiple,
        listType,
        data,
        allowClear,
        treeDefaultExpandAll,
        treeCheckable,
    } = record.options

    useEffect(() => {
        console.log(record)
    }, [record])

    const renderItems = (type: string) => {
        const items = record?.[type].map((item: any, i: number) => {
            return {
                key: item.key,
                label: item.label,
                children: (
                    <>
                        {item.list.map((tabListItem: IRecord, index: number) => {
                            return <FormItem key={index} {...props} record={tabListItem} />
                        })}
                    </>
                ),
            }
        })
        return items
    }

    return (
        <div onChange={formChange}>
            {contextHolder}
            {INFORMITEM.includes(record.type) && (
                <Form.Item
                    className="mb-1"
                    label={record.label}
                    labelCol={config.layout === 'horizontal' ? config.labelCol : {}}
                    wrapperCol={config.layout === 'horizontal' ? config.wrapperCol : {}}
                    hidden={hidden}
                    required={record.hasOwnProperty('rules') && record.rules[0].required}
                    rules={record?.rules || []}
                >
                    {/* input */}
                    <Input
                        className={record.type === 'input' ? '' : 'hidden'}
                        style={{ width: `${width}` }}
                        disabled={disabled}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        bordered={bordered}
                        value={value}
                        size={size}
                    />
                    {/* textarea */}
                    <Input.TextArea
                        className={record.type === 'textarea' ? '' : 'hidden'}
                        style={{ width: width }}
                        disabled={disabled}
                        placeholder={placeholder}
                        readOnly={readonly}
                        bordered={bordered}
                        rows={rows}
                        maxLength={maxLength}
                        value={value}
                    />
                    {/* select */}
                    <Select
                        value={value}
                        className={record.type === 'select' ? '' : 'hidden'}
                        style={{ width: width }}
                        options={option}
                        showSearch={showSearch}
                        disabled={disabled}
                        placeholder={placeholder}
                        mode={mode}
                        size={size}
                        onChange={handleOnChange}
                        bordered={bordered}
                        allowClear={clearable}
                        onClick={(e: any) => e.stopPropagation()}
                        onFocus={() => setSelectItem(record)}
                    />
                    {/* input number */}
                    <InputNumber
                        min={min}
                        max={max}
                        step={step}
                        style={{ width: width }}
                        disabled={disabled}
                        bordered={bordered}
                        readOnly={readonly}
                        className={record.type === 'number' ? '' : 'hidden'}
                        size={size}
                        value={value}
                        onChange={handleOnChange}
                    />
                    {/* checkbox */}
                    <Checkbox.Group
                        options={option}
                        className={record.type === 'checkbox' ? '' : 'hidden'}
                        style={{ width: width }}
                        disabled={disabled}
                        defaultValue={value}
                        value={value}
                        onChange={(e: any) => handleOnChange(e)}
                    />
                    {/* radio */}
                    <Radio.Group
                        className={record.type === 'radio' ? '' : 'hidden'}
                        options={option}
                        disabled={disabled}
                        defaultValue={value}
                        optionType={optionType}
                        buttonStyle="solid"
                        value={value}
                    />
                    {/* date */}
                    <DatePicker
                        className={record.type === 'date' ? '' : 'hidden'}
                        placeholder={placeholder}
                        disabled={disabled}
                        defaultValue={dayjs(value, 'YYYY-MM-DD')}
                        format={format}
                        style={{ width: width }}
                        picker={picker}
                        disabledDate={disabled}
                        bordered={bordered}
                        value={dayjs(value, 'YYYY-MM-DD')}
                        onChange={handleOnChange}
                    />
                    {/* time */}
                    <TimePicker
                        defaultValue={dayjs('00:00:00', 'HH:mm:ss')}
                        className={record.type === 'time' ? '' : 'hidden'}
                        style={{ width: width }}
                        disabled={disabled}
                        placeholder={placeholder}
                        format={format}
                        bordered={bordered}
                        value={dayjs(value, 'HH:mm:ss')}
                        onChange={handleOnChange}
                    />
                    {/* rate */}
                    <Rate
                        className={record.type === 'rate' ? '' : 'hidden'}
                        style={{ width: width }}
                        defaultValue={value}
                        disabled={disabled}
                        allowHalf={allowHalf}
                        count={count}
                        onChange={handleOnChange}
                        value={value}
                    />
                    {/* slider */}
                    <div className="flex">
                        <Slider
                            defaultValue={defaultValue}
                            className={record.type === 'slider' ? '' : 'hidden'}
                            style={{ width: width }}
                            disabled={disabled}
                            min={min}
                            max={max}
                            step={step}
                            value={value}
                            onChange={handleOnChange}
                        />
                        <InputNumber
                            min={min}
                            max={max}
                            step={step}
                            disabled={disabled}
                            value={value}
                            className={showInput ? ' w-1/2 ml-3' : 'hidden'}
                            onChange={handleOnChange}
                        />
                    </div>

                    {/* upload */}
                    {record.type === 'uploadFile' ? (
                        <Upload
                            style={{ width: width }}
                            disabled={disabled}
                            maxCount={maxCount}
                            directory={directory}
                            name={name}
                            multiple={multiple}
                            accept={accept}
                            action={action}
                            headers={headers}
                            listType={listType}
                        >
                            <Button type="link" icon={<UploadOutlined />}>
                                点击上传
                            </Button>
                            {/* {listType !== 'picture' ? (
                            ''
                        ) : (
                            <Button
                                icon={<UploadOutlined />}
                                disabled={disabled}
                            >
                                点击上传
                            </Button>
                        )} */}
                        </Upload>
                    ) : (
                        ''
                    )}
                    {/* tree select */}

                    {record.type === 'treeSelect' ? (
                        <TreeSelect
                            showSearch={showSearch}
                            style={{ width: width }}
                            disabled={disabled}
                            treeDefaultExpandAll={treeDefaultExpandAll}
                            value={value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder={placeholder}
                            multiple={multiple}
                            treeData={data}
                            bordered={bordered}
                            allowClear={allowClear}
                            treeCheckable={treeCheckable}
                        />
                    ) : (
                        ' '
                    )}
                    {/* cascader */}
                    {record.type === 'cascader' ? (
                        <Cascader
                            style={{ width: width }}
                            disabled={disabled}
                            value={value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder={placeholder}
                            multiple={multiple}
                            options={data}
                            bordered={bordered}
                            allowClear={allowClear}
                            showSearch={showSearch}
                            size={size}
                        />
                    ) : (
                        ''
                    )}
                    {/* switch */}
                    {record.type === 'switch' && (
                        <Switch
                            style={{ width: width }}
                            disabled={disabled}
                            size={size}
                            checked={value}
                            onChange={handleOnChange}
                        />
                    )}

                    {/* button */}
                    {record.type === 'button' && (
                        <Button
                            hidden={hidden}
                            disabled={disabled}
                            size={size}
                            type={record.options.buttonType}
                            shape={record.options.shape}
                            danger={record.options.danger}
                            ghost={record.options.ghost}
                        >
                            {placeholder}
                        </Button>
                    )}
                </Form.Item>
            )}
            {record.type === 'alert' && (
                <Alert
                    message={record.options.description}
                    type={record.options.alertType}
                    showIcon={record.options.showIcon}
                    closable={record.options.closable}
                    banner={record.options.banner}
                />
            )}
            {record.type === 'text' && <p style={{ textAlign: record.options.textAlign }}>{value}</p>}
            {record.type === 'html' && <div dangerouslySetInnerHTML={{ __html: value }} />}
            {record.type === 'divider' && (
                <Divider
                    style={{ width: width }}
                    orientation={record.options.orientation}
                    dashed={record.options.dashed}
                >
                    {record.options.text}
                </Divider>
            )}
            {record.type === 'card' && (
                <Card title={record.title} bordered={false}>
                    {record.list.map((item: any) => (
                        <FormItem key={item.key} {...props} record={item} />
                    ))}
                </Card>
            )}
            {record.type === 'grid' && (
                <Row gutter={record?.options?.gutter}>
                    {record?.columns?.map((colItem: any, colIndex: number) => {
                        return (
                            <Col span={colItem.span || 0} key={colIndex}>
                                {colItem.list.map((item: any) => (
                                    <FormItem key={item.key} {...props} record={item} />
                                ))}
                            </Col>
                        )
                    })}
                </Row>
            )}
            {record.type === 'tabs' && (
                <Tabs
                    items={renderItems('tabs')}
                    centered={record.options?.centered}
                    type={record.options?.tabsType}
                    size={record.options?.size}
                    tabPosition={record.options?.tabPosition}
                />
            )}
            {record.type === 'collapses' && (
                <Collapse
                    items={renderItems('collapses')}
                    defaultActiveKey={['1']}
                    bordered={record.options.bordered}
                    accordion={record.options.accordion}
                />
            )}
        </div>
    )
}

export default React.memo(FormItem)
