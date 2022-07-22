import { Paper, useTheme } from "@mui/material"
import { ModalProps } from "../TS Types/utils.types"

function Modal({ children, style, animate, close, className, label }: ModalProps) {
    const theme = useTheme()

    return (
        <>
            <div className="modal-wrapper" onClick={close}></div>
            <Paper sx={{ borderRadius: "20px" }} elevation={10} className={`modal-container ${animate || 'fade-down'} ${className || ''}`} style={style}>
                {
                    label && <>
                        <div style={{ backgroundColor: theme.palette.tertiary.main, color: "#fff" }} className="label">{label}</div>
                    </>
                }
                {children || "Modal"}
            </Paper>
        </>
    )
}

export default Modal