import { ChangeEvent, CSSProperties, Dispatch, ReactNode, SetStateAction } from "react";

export type ModalProps = {
    children: ReactNode;
    close: () => void;
    style?: CSSProperties;
    animate?: "fade-in" | "pop-down" | "fade-down" | "none";
    className?: string;
    label?: string;
};

export type ModalImplementationType = {
    close: () => void;
};

export type UseModalReturn = [boolean, () => void, () => void];

export type UseInputsReturn = [
    any,
    (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => void,
    Dispatch<SetStateAction<any>>
];
