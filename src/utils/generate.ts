// 通过json数据生成表单
import { IConfig, IRecord, IRecordOptions } from '@/components/type'

/**
 * @param config form config
 * @param formItems form items
 */
const generateForm = (config: IConfig, formItems: string) => {
    let str = `<Form form = {form} layout="${config.layout}" size="${config.size}">\n${formItems}\n</Form>`
    return str
}

const generateFormFooterButtons = (config: IConfig) => {
    let str = `
    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Space>
            <Button type="primary" htmlType="submit">
            提交
            </Button>
            <Button htmlType="reset">重置</Button>
        </Space>
    </Form.Item>`
    return str
}

const generateLayoutItem = (record: IRecord) => {
    const items = record[record.type!].map((item: any) => ({
        key: item.key,
        label: item.label,
        children: `<>${item.list.map((listItem: IRecord) => tags[listItem.type as string](listItem)).join('')}</>`,
    }))

    const itemsString = JSON.stringify(items)
        .replace(/\\n+|\s+/g, ' ')
        .replace(/\\+/g, '')
        .replace('"<>', '<>')
        .replace('</>"', '</>')

    return itemsString
}

interface Tags {
    input: (record: IRecord) => string
    textarea: (record: IRecord) => string
    select: (record: IRecord) => string
    number: (record: IRecord) => string
    checkbox: (record: IRecord) => string
    radio: (record: IRecord) => string
    date: (record: IRecord) => string
    time: (record: IRecord) => string
    slider: (record: IRecord) => string
    rate: (record: IRecord) => string
    button: (record: IRecord) => string
    switch: (record: IRecord) => string
    alert: (record: IRecord) => string
    uploadFile: (record: IRecord) => string
    divider: (record: IRecord) => string
    text: (record: IRecord) => string
    html: (record: IRecord) => string
    treeSelect: (record: IRecord) => string
    cascader: (record: IRecord) => string
    grid: (record: IRecord) => string
    card: (record: IRecord) => string
    table: (record: IRecord) => string
    tabs: (record: IRecord) => string
    collapses: (record: IRecord) => string
    [key: string]: (record: IRecord) => string
}

const tags: Tags = {
    input(record) {
        const { bordered, disabled, placeholder, allowClear, maxLength, type, value, size } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" initialValue="${value}" rules={${JSON.stringify(
            record.rules
        )}}>
                <Input
                    placeholder="${placeholder}"
                    maxLength={${maxLength}}
                    allowClear={${allowClear}}
                    bordered={${bordered}}
                    disabled={${disabled}}
                    type="${type}"
                    size="${size}"
                />
            </Form.Item>`
    },
    textarea(record) {
        const { rows, maxLength, clearable, bordered, disabled, placeholder, value, hidden } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" initialValue="${value}" hidden={${hidden}}>
                <Input.TextArea
                    placeholder="${placeholder}"
                    rows={${rows}}
                    maxLength={${maxLength}}
                    allowClear={${clearable}}
                    bordered={${bordered}}
                    disabled={${disabled}}
                />
            </Form.Item>`
    },
    select(record) {
        const { option, bordered, disabled, clearable, placeholder, showSearch, size, mode, value } =
            record.options || {}
        let realMode = mode ? `mode="${mode}"` : 'mode={undefined}'
        return `
            <Form.Item label="${record.label}" name="${record.key}" initialValue={${value}}>
                <Select
                    options={${JSON.stringify(option)}}
                    bordered={${bordered}}
                    disabled={${disabled}}
                    allowClear={${clearable}}
                    placeholder="${placeholder}" 
                    size="${size}"
                    showSearch={${showSearch}}
                    ${realMode}
                />
            </Form.Item>`
    },
    number(record) {
        const { min, max, step, value } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" initialValue={${value}}>
                <InputNumber
                    min={${min}}
                    max={${max}}
                    step={${step}}
                />
            </Form.Item>`
    },
    checkbox(record) {
        const { value, option, disabled } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" initialValue={${JSON.stringify(value)}}>
                <Checkbox.Group options={${JSON.stringify(option)}} disabled={${disabled}}/>
            </Form.Item>`
    },
    radio(record) {
        const { value, option, disabled, hidden } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" hidden={${hidden}} initialValue="${value}">
                <Radio.Group options={${JSON.stringify(option)}} disabled={${disabled}}/>
            </Form.Item>`
    },
    date(record) {
        const { hidden, picker, value, placeholder, bordered } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" initialValue="${value}" hidden={${hidden}}>
                <DatePicker picker="${picker}" placeholder="${placeholder}" bordered={${bordered}}/>
            </Form.Item>`
    },
    time(record) {
        const { hidden, value, placeholder, bordered } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" initialValue="${value}" hidden={${hidden}}>
                <TimePicker placeholder="${placeholder}" bordered={${bordered}}/>
            </Form.Item>`
    },
    slider(record) {
        const { min, max, step, value, disabled } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" initialValue={${value}}>
                <Slider
                    min={${min}}
                    max={${max}}
                    step={${step}}
                    disabled={${disabled}}
                />
            </Form.Item>`
    },
    rate(record) {
        const { value, count, allowHalf, disabled } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" initialValue={${value}}>
                <Rate count={${count}} allowHalf={${allowHalf}} disabled={${disabled}}/>
            </Form.Item>`
    },
    button(record) {
        const { placeholder, buttonType, size } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}">
                <Button type="${buttonType}" size="${size}">"${placeholder}"</Button>
            </Form.Item>`
    },
    switch(record) {
        const { value, disabled } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" >
                <Switch disabled={${disabled}} checked={${value}}/>
            </Form.Item>`
    },
    treeSelect(record) {
        const { data, value, disabled, hidden, allowClear, treeCheckable, treeDefaultExpandAll, multiple, showSearch } =
            record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" hidden={${hidden}} initialValue={${value}}>
                <TreeSelect
                    treeData={${JSON.stringify(data)}}
                    disabled={${disabled}}
                    allowClear={${allowClear}}
                    treeCheckable={${treeCheckable}}
                    treeDefaultExpandAll={${treeDefaultExpandAll}}
                    mutiple={${multiple}}
                    showSearch={${showSearch}}
                />
            </Form.Item>`
    },
    cascader(record) {
        const { data, value, disabled, hidden, clearable } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" hidden={${hidden}} initialValue={${value}}>
                <Cascader
                    options={${JSON.stringify(data)}}
                    disabled={${disabled}}
                    allowClear={${clearable}}
                />
            </Form.Item>`
    },
    alert(record) {
        const { description, alertType, showIcon } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}" >
                <Alert message={${description}} alertType="${alertType}" showIcon={${showIcon}}/>
            </Form.Item>`
    },
    uploadFile(record) {
        const { action, listType, headers, multiple, name, accept } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}">
                <Upload
                    action="${action}"
                    listType="${listType}"
                    headers={${JSON.stringify(headers)}}
                    name="${name}"
                    multiple={${multiple}}
                    accept="${accept}"
                />
            </Form.Item>`
    },
    divider(record) {
        return `
            <Form.Item label="${record.label}" name="${record.key}">
                <Divider/>
            </Form.Item>`
    },
    text(record) {
        const { value } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}">
                <p>"${value}"</p>
            </Form.Item>`
    },
    html(record) {
        const { value } = record.options || {}
        return `
            <Form.Item label="${record.label}" name="${record.key}">
                <div dangerouslySetInnerHTML={{ __html: ${value} }} />
            </Form.Item>`
    },
    grid(record) {
        const { columns } = record
        return `
        <Row gutter={${record?.options?.gutter}}>
        ${columns?.map((colItem: any) => {
            return `<Col span={${colItem.span}}>${colItem.list
                .map((item: IRecord) => tags[item.type as string](item))
                .join('')}</Col>`
        })}
        </Row>`
    },
    card(record) {
        return `
        <Card title="${record.title}">
        ${record.list.map((item: IRecord) => tags[item.type as string](item)).join('')}
        </Card>`
    },
    table(record) {
        return `<h1><tagble>`
    },
    tabs(record) {
        const itemsString = generateLayoutItem(record)
        return `<Tabs items={${itemsString}} 
                defaultActiveKey="1" 
                centered={${record.options?.centered}}
                type={"${record.options?.tabsType}"}
                size={"${record.options?.size}"}
                tabPosition={"${record.options?.tabPosition}"}
                />`
    },
    collapses(record) {
        const itemsString = generateLayoutItem(record)
        return `
        <Collapse items={${itemsString}} defaultActiveKey={['1']} bordered={${record.options?.bordered}} accordion={${record.options?.accordion}}/>`
    },
}

export const generateReactTSXCode = (data: { list: IRecord[]; config: any }) => {
    const { list, config } = data
    let formItems: string = ''
    let importArr: string[] = []
    const searchItemToImport = (arr: IRecord[]) => {
        arr.forEach((item: IRecord) => {
            if (IMPORT_DICT[item.type as string]) {
                importArr.push(IMPORT_DICT[item.type as string])
            }
            if (item.type === 'grid') {
                item.columns?.forEach((col: any) => {
                    searchItemToImport(col.list)
                })
            }
            if (item.type === 'card') {
                searchItemToImport(item.list)
            }
            if (item.type === 'tabs' || item.type === 'collapses') {
                item[item.type].forEach((item: any) => searchItemToImport(item.list))
            }
        })
    }
    searchItemToImport(list)
    list.forEach((item) => {
        formItems += tags[item.type as string](item)
    })
    const importStr = Array.from(new Set(importArr)).join(',')
    // generate buttonchuxian1
    const footer = generateFormFooterButtons(config)
    // generate from
    const form = generateForm(config, formItems + footer)

    return `import React,{useState,useEffect} from 'react'
    import {Form, Space, Button, ${importStr}} from 'antd'
    interface IProps{}
    const App:React.FC<IProps> = ({}:IProps) => {
        const [form] = Form.useForm()
        return  <>
                    ${form}
                </>
    }
    export default App`
}

type TImportDict = {
    input: string
    textarea: string
    select: string
    button: string
    space: string
    form: string
    date: string
    time: string
    slider: string
    rate: string
    checkbox: string
    switch: string
    number: string
    treeselect: string
    cascader: string
    uploadFile: string
    alert: string
    divider: string
    [key: string]: string
}
// build dict from antd to import components
const IMPORT_DICT: TImportDict = {
    input: 'Input',
    textarea: 'Input',
    select: 'Select',
    button: 'Button',
    space: 'Space',
    form: 'Form',
    date: 'DatePicker',
    time: 'TimePicker',
    slider: 'Slider',
    rate: 'Rate',
    checkbox: 'Checkbox',
    switch: 'Switch',
    number: 'InputNumber',
    treeselect: 'TreeSelect',
    cascader: 'Cascader',
    uploadFile: 'Upload',
    alert: 'Alert',
    divider: 'Divider',
    gird: 'Row, Col',
    radio: 'Radio',
    card: 'Card',
    tabs: 'Tabs',
    collapses: 'Collapse',
}
