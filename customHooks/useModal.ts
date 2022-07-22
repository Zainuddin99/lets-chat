import { useState } from "react";
import { UseModalReturn } from "../TS Types/utils.types";

//Hook to implement modals states
export const useModalState = (value: boolean): UseModalReturn => {
    const [isOpen, setIsOpen] = useState<boolean>(value);

    const open = () => {
        setIsOpen(true);
    };

    const close = (): void => {
        setIsOpen(false);
    };

    return [isOpen, open, close];
};
