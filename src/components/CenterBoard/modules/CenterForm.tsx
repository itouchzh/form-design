import React from 'react'
import { Button, Card, Col, Collapse, CollapseProps, Row, Tabs, Tooltip } from 'antd'
import styles from '@/components/index.module.scss'
import { ReactSortable, SortableEvent } from 'react-sortablejs'
import { IConfig, IRecord } from '@/components/type'
import useStopPropagation from '@/hooks/useStopPropagation'
import { useSelectItemContext } from '@/context/useSelectItem'
import BottomButton from './BottomButton'
import FormItem from './FormItem'
interface ICenterFormProps {
    record?: IRecord
    config?: IConfig
    hideKey?: boolean
    handleCopy: () => void
    handleDelete: () => void
    onChange: (value: any) => void
    handleColAdd: (evt: SortableEvent, record: IRecord, index: number, type?: string) => void
}
const CenterForm: React.FC<ICenterFormProps> = (props: ICenterFormProps) => {
    const { record, config, hideKey, handleCopy, handleDelete, handleColAdd, onChange } = props
    const { selectItem, setSelectItem } = useSelectItemContext()
    const handleCopyItem = useStopPropagation(handleCopy)
    const handleDeleteItem = useStopPropagation(handleDelete)
    const onClick = useStopPropagation(() => setSelectItem(record!))
    const renderItems = (type: string): any => {
        const items = record?.[type].map((item: any, i: number) => {
            return {
                key: item.key,
                label: item.label,
                children: (
                    <ReactSortable
                        group={'form-draggable'}
                        animation={150}
                        tag="div"
                        className="w-full h-full min-h-[50px] p-1 box-border border border-dashed border-gray-400"
                        ghostClass={styles['sortable-ghost']}
                        list={item.list}
                        setList={() => {}}
                        onAdd={(evt) => handleColAdd(evt, record, i, type)}
                    >
                        {item.list.map((tabListItem: IRecord, index: number) => {
                            return <CenterForm key={index} {...props} record={tabListItem} />
                        })}
                    </ReactSortable>
                ),
            }
        })
        return items
    }

    return (
        <>
            {record?.type === 'grid' && (
                <div
                    className={`${styles['form-list']} ${record.key === selectItem.key && styles['active']}`}
                    onClick={onClick}
                >
                    <Row gutter={record?.options?.gutter} key={record.key}>
                        {record?.columns?.map((colItem: any, colIndex: number) => {
                            return (
                                <Col span={colItem.span || 0} key={colIndex} className={styles['grid-col']}>
                                    <ReactSortable
                                        group="form-draggable"
                                        animation={150}
                                        tag="div"
                                        className="w-full h-full"
                                        ghostClass={styles['sortable-ghost']}
                                        list={colItem.list}
                                        setList={() => {}}
                                        onAdd={(evt) => handleColAdd(evt, record, colIndex)}
                                    >
                                        {colItem.list.map((item: any) => (
                                            <CenterForm key={item.key} {...props} record={item} />
                                        ))}
                                    </ReactSortable>
                                </Col>
                            )
                        })}
                        {record.type === selectItem.type && (
                            <BottomButton
                                handleCopyItem={handleCopyItem}
                                handleDeleteItem={handleDeleteItem}
                                record={record}
                                selectItem={selectItem}
                                hideKey={hideKey}
                            />
                        )}
                    </Row>
                </div>
            )}
            {record?.type === 'card' && (
                <div
                    className={`${styles['card-main']} ${record.key === selectItem.key && styles['active']}`}
                    onClick={onClick}
                >
                    <Card title={record.title} bordered={false}>
                        <ReactSortable
                            group="form-draggable"
                            animation={150}
                            tag="div"
                            className="border border-dashed border-blue-300 min-h-[50px] bg-white p-[1px]"
                            ghostClass={styles['sortable-ghost']}
                            list={record.list}
                            setList={() => {}}
                            onAdd={(evt) => handleColAdd(evt, record, 0, record.type)}
                        >
                            {record.list.map((item: any) => (
                                <CenterForm
                                    key={item.key}
                                    record={item}
                                    config={config}
                                    hideKey={hideKey}
                                    handleCopy={handleCopy}
                                    handleDelete={handleDelete}
                                    onChange={onChange}
                                    handleColAdd={handleColAdd}
                                />
                            ))}
                        </ReactSortable>
                    </Card>
                    {record.type === selectItem.type && (
                        <BottomButton
                            handleCopyItem={handleCopyItem}
                            handleDeleteItem={handleDeleteItem}
                            record={record}
                            selectItem={selectItem}
                            hideKey={hideKey}
                        />
                    )}
                </div>
            )}
            {record?.type === 'tabs' && (
                <div
                    onClick={onClick}
                    className={`mb-1 p-[1px] box-border relative min-h-[100px] ${
                        record.key === selectItem.key && styles['active']
                    }`}
                >
                    <Tabs
                        items={renderItems('tabs')}
                        className={styles['tab-main']}
                        centered={record.options?.centered}
                        type={record.options?.tabsType}
                        size={record.options?.size}
                        tabPosition={record.options?.tabPosition}
                    />
                    {record.type === selectItem.type && (
                        <BottomButton
                            handleCopyItem={handleCopyItem}
                            handleDeleteItem={handleDeleteItem}
                            record={record}
                            selectItem={selectItem}
                            hideKey={hideKey}
                        />
                    )}
                </div>
            )}
            {record?.type === 'collapses' && (
                <div
                    onClick={onClick}
                    className={`mb-1 p-[1px] box-border relative min-h-[100px] ${
                        record.key === selectItem.key && styles['active']
                    }`}
                >
                    <Collapse
                        items={renderItems('collapses')}
                        defaultActiveKey={['1']}
                        bordered={record.options?.bordered}
                        accordion={record.options?.accordion}
                    />
                    {record.type === selectItem.type && (
                        <BottomButton
                            handleCopyItem={handleCopyItem}
                            handleDeleteItem={handleDeleteItem}
                            record={record}
                            selectItem={selectItem}
                            hideKey={hideKey}
                        />
                    )}
                </div>
            )}
            {!['grid', 'card', 'tabs', 'collapses'].includes(record?.type as string) && (
                <div
                    onClick={onClick}
                    className={`pt-2 mb-[2px] relative rounded border-dashed border-blue-200 hover:bg-[#deebf8] border 
       ${record?.key === selectItem.key && styles['active']}`}
                >
                    <FormItem {...props} />
                    {record?.type === selectItem.type && (
                        <BottomButton
                            handleCopyItem={handleCopyItem}
                            handleDeleteItem={handleDeleteItem}
                            record={record}
                            selectItem={selectItem}
                            hideKey={hideKey}
                        />
                    )}
                </div>
            )}
        </>
    )
}

export default React.memo(CenterForm)
