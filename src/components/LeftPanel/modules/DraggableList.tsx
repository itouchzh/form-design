import IconFont from '@/components/IconFont'
import { IRecord } from '@/components/type'
import { ReactSortable } from 'react-sortablejs'

// as a component
interface IDraggableListProps {
    list: Array<any>
    setList: React.Dispatch<React.SetStateAction<any[]>>
    getDragItem: (record: IRecord) => void
    addList: (val: IRecord) => void
}
const DraggableList = ({ list, setList, getDragItem, addList }: IDraggableListProps) => {
    return (
        <ReactSortable
            list={list}
            setList={setList}
            group={{
                name: 'form-draggable',
                pull: 'clone',
                put: false,
            }}
            animation={150}
            tag="div"
            className="px-4 flex flex-wrap justify-between gap-2 items-center"
            sort={false}
        >
            {list.map((item, index) => (
                <div
                    className="text-center w-[40%] p-2 flex items-center cursor-move bg-blue-50 border-solid border
                          border-gray-300 rounded hover:border-blue-500 hover:border-dashed hover:border hover:text-blue-500 hover:bg-[#eceff7]"
                    draggable
                    key={index}
                    onDragStart={() =>
                        getDragItem({
                            ...list[index],
                            key: `${list[index].type}_${new Date().getTime()}`,
                        })
                    }
                    onClick={() => addList(item)}
                >
                    <IconFont type={item.icon} className="mr-1" />
                    {item.label}
                </div>
            ))}
        </ReactSortable>
    )
}
export default DraggableList
