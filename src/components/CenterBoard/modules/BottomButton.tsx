import React from "react"
import { Button, Tooltip } from "antd"
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { IRecord } from "@/components/type"

interface IBottomButton {
    handleCopyItem: (e: any) => void
    handleDeleteItem: (e: any) => void
    record?: IRecord
    selectItem?: IRecord
    hideKey?: boolean
}
const BottomButton: React.FC<IBottomButton> = ({
    handleCopyItem,
    handleDeleteItem,
    record,
    selectItem,
    hideKey,
}: IBottomButton) => {
    return (
        <div className={`flex justify-end gap-4 h-8 items-center absolute top-0 right-0 `}>
            {/* {hideKey ? '' : <div className="text-blue-500 absolute bottom-0">{record.key}</div>} */}
            <div className={`w-15 rounded-tl-[16px] ${record?.key === selectItem?.key ? '' : 'hidden'}`}>
                <Tooltip title="复制">
                    <Button
                        shape="circle"
                        className="text-blue-400 cursor-pointer"
                        icon={<CopyOutlined />}
                        onClick={handleCopyItem}
                    />
                </Tooltip>
                <Tooltip title="删除">
                    <Button
                        shape="circle"
                        className="text-blue-400 cursor-pointer ml-2"
                        icon={<DeleteOutlined />}
                        onClick={handleDeleteItem}
                    />
                </Tooltip>
            </div>
        </div>
    )
}
export default React.memo(BottomButton)
