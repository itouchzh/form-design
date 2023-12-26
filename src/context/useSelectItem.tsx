import { IRecord } from '@/components/type'
import { createContext, useContext, useState } from 'react'

type SelectItemContextType = {
    selectItem: IRecord
    setSelectItem: React.Dispatch<React.SetStateAction<IRecord>>
}

const SelectItemContext = createContext<SelectItemContextType | null>(null)

export default function SelectItemContextProvider({ children }: { children: React.ReactNode }) {
    const [selectItem, setSelectItem] = useState<IRecord>({})
    return <SelectItemContext.Provider value={{ selectItem, setSelectItem }}>{children}</SelectItemContext.Provider>
}

export function useSelectItemContext() {
    const context = useContext(SelectItemContext)
    if (!context) {
        throw new Error('useSelectItemContext must be used within a SelectItemProvider')
    }
    return context
}
