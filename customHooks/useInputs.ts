import { ChangeEvent, useState } from "react";
import { UseInputsReturn } from "../TS Types/utils.types";

export const useInputs = (initialInputs: object | string): UseInputsReturn => {
    const [inputs, setInputs] = useState(initialInputs);

    const handleInputsChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        //handle both types differnetly
        if (initialInputs instanceof Object) {
            setInputs((prev: object) => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setInputs(value);
        }
    };

    return [inputs, handleInputsChange, setInputs];
};
