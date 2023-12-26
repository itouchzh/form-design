import { IOptions } from '@/components/type'
import { basicList } from './formComponentsConfig'

export const listTypeOption: IOptions[] = [
    { label: 'text', value: 'text' },
    { label: 'picture', value: 'picture' },
    { label: 'picture-card', value: 'picture-card' },
    { label: 'picture-circle', value: 'picture-circle' },
]

export const inputAttrOptions: readonly IOptions[] = [
    { label: '隐藏', value: 'hidden' },
    { label: '只读', value: 'readonly' },
    { label: '禁用', value: 'disabled' },
    { label: '边框', value: 'bordered' },
    { label: '可清除', value: 'clearable' },
    { label: '可搜索', value: 'showSearch' },
    { label: '默认展开', value: 'treeDefaultExpandAll' },
    { label: '可勾选', value: 'treeCheckable' },
    { label: '危险按钮', value: 'danger' },
    { label: '幽灵按钮', value: 'ghost' },
    { label: '显示图标', value: 'showIcon' },
    { label: '可关闭', value: 'closable' },
    { label: '顶部公告', value: 'banner' },
] as const

export const sizeOptions: IOptions[] = [
    { label: '小', value: 'small' },
    { label: '默认', value: 'middle' },
    { label: '大', value: 'large' },
]

export const datePickerOptions: IOptions[] = [
    { label: '日期', value: 'data' },
    { label: '月', value: 'month' },
    { label: '周', value: 'week' },
    { label: '季度', value: 'quarter' },
    { label: '年', value: 'year' },
]

export const buttonTypeOptions: IOptions[] = [
    { label: 'default', value: 'default' },
    { label: 'primary', value: 'primary' },
    { label: 'dashed', value: 'dashed' },
    { label: 'link', value: 'link' },
    { label: 'text', value: 'text' },
]
export const buttonShapeOptions: IOptions[] = [
    { label: 'default', value: 'default' },
    { label: 'circle', value: 'circle' },
    { label: 'round', value: 'round' },
]

export const alertTypeOptions: IOptions[] = [
    { label: 'success', value: 'success' },
    { label: 'info', value: 'info' },
    { label: 'warning', value: 'warning' },
    { label: 'error', value: 'error' },
]
const itemsToExclude = ['text', 'html', 'alert', 'button','table']
export const INFORMITEM = [...basicList.map((item) => item.type).filter((item) => !itemsToExclude.includes(item))]
