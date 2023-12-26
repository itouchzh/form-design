// useClickAction.ts
import { useCallback } from 'react';

type StopPropagation = () => void;

const useStopPropagation = (callback: StopPropagation) => {
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
            e.stopPropagation();
            callback();
        },
        [callback]
    );

    return handleClick;
};

export default useStopPropagation;
