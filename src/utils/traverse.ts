import { IRecord } from '@/components/type'

// 通用的递归函数
const traverse = (array: IRecord[], callback: (element: IRecord, index: number, array: IRecord[]) => void) => {
    array.forEach((element, index) => {
        if (element.type === 'grid') {
            element.columns!.forEach((item: any) => {
                item.list = traverse(item.list, callback)
            })
        }
        if (element.type === 'card') {
            element.list = traverse(element.list, callback)
        }
        callback(element, index, array)
    })
}

export default traverse
