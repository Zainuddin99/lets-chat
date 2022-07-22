import { ModalImplementationType } from "../../TS Types/utils.types";
import Modal from "../Modal";
import classes from './Home.module.scss'
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { MaxInputsLength, NewRoomInputs } from "../../TS Types/home.types";
import { useInputs } from "../../customHooks/useInputs";
import { handleError } from "../../utils/handleError";
import { addRoom, inputsLengthCriteria } from "../../Firebase/Database/rooms";
import { notify } from "../../utils/notify";
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react";

const initialInputs: NewRoomInputs = {
    name: '',
    description: '',
    privateRoom: false
}

function AddRoomModal({ close }: ModalImplementationType) {
    let [inputs, handleInputsChange, setInputs] = useInputs(initialInputs)
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false)
    const [maxInputsLegth, setMaxInputsLength] = useState<MaxInputsLength>(inputsLengthCriteria)

    //To add extra functionality for existing handle change
    const handleInputsChangeCopy = handleInputsChange
    handleInputsChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (name === "name" && value.length > inputsLengthCriteria.name || name === "description" && value.length >= inputsLengthCriteria.description) {
            setInputs({ ...inputs, [name]: value.slice(0, inputsLengthCriteria[name]) })
            return
        }
        handleInputsChangeCopy(e)
    }

    //To change the length in inputs
    useEffect(() => {
        const { name, description } = inputs
        setMaxInputsLength({ name: inputsLengthCriteria.name - name.length, description: inputsLengthCriteria.description - description.length })
    }, [inputs])

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        setDisableSubmit(true)
        try {
            await addRoom(inputs)
            notify("success", "Successfylly added room")
            close()
        } catch (error: any) {
            handleError(error)
        }
        setDisableSubmit(false)
    }

    return <Modal close={close} className={classes.createRoomModal} label="Create new room">
        <form onSubmit={handleSubmit}>
            <TextField autoFocus id="outlined-basic" label={`Name (${maxInputsLegth.name})`} variant="outlined" autoComplete="off" type="text" name="name" required value={inputs.name} onChange={handleInputsChange} />
            <TextField id="outlined-multiline-static" label={`Description (${maxInputsLegth.description})`} multiline name="description" rows={3} required value={inputs.description} onChange={handleInputsChange} />
            <div className={`flex-fs-c`}>
                <FormControlLabel control={<Switch value={inputs.privateRoom} onChange={handleInputsChange} name="privateRoom" />} label="Private room" />
            </div>
            <button type="submit" disabled={disableSubmit}>Add</button>
        </form>
    </Modal>;
}

export default AddRoomModal;
