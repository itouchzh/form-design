import { CSSProperties, ReactNode } from 'react'

export interface IOptions {
    label: string
    value: string
    [key: string]: any
}

export interface IConfig {
    layout?: 'vertical' | 'horizontal' | 'inline'
    labelCol?: { span: number }
    wrapperCol?: { span: number }
    required?: boolean
    customStyle?: CSSProperties
    size?: 'small' | 'middle' | 'large'
    disabled?: boolean
    [key: string]: any
}

export interface IRecordOptions {
    readonly?: boolean
    allowClear?: boolean
    bordered?: boolean
    disabled?: boolean
    placeholder?: string
    clearable?: boolean
    maxLength?: number
    type?: string
    rows?: number
    option?: Array<IOptions>
    showSearch?: boolean
    size?: 'small' | 'middle' | 'large'
    mode?: string
    value?: string | string[] | number
    max?: number
    min?: number
    step?: number
    checked?: boolean
    hidden?: boolean
    picker?: string
    count?: number
    allowHalf?: boolean
    defaultValue?: string[] | string | number
    action?: string
    listType?: string
    accept?: string
    headers?: ReactNode | string
    name?: string
    multiple?: boolean
    alertType?: string
    showIcon?: boolean
    treeCheckable?: boolean
    treeDefaultExpandAll?: boolean
    data?: any
    [key: string]: any
}

interface IColumn {
    span: number
    list: TRecord[]
}

interface IRecordRules {
    required?: boolean
    message?: string
    pattern?: string
}
export interface IRecord {
    label?: string
    key?: string
    type?: string
    icon?: string
    options?: IRecordOptions
    columns?: IColumn[]
    rules?: IRecordRules[]
    unique?: boolean
    is_inherited?: boolean
    is_auth?: boolean
    is_combine?: boolean
    combine_item?: string
    [key: string]: any
}

// export type TRecord = Partial<IRecord>

export interface IData {
    list: TRecord[]
    config: IConfig
}



