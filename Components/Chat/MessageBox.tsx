import { Paper } from "@mui/material"
import { blue, grey } from "@mui/material/colors"
import { MessageBoxProps } from "../../TS Types/chat.types"
import { getNameConstants } from "../../utils/functions"
import CustomAvatar from "../Reusable/Avatar"
import classes from './chat.module.scss'

function MessageBox({ data }: MessageBoxProps) {
    const { text, messagedBy, loggedUser, messagedOn } = data

    const messageTextStyle = {
        backgroundColor: loggedUser ? grey[200] : blue[600],
        color: loggedUser ? "#000" : "#fff",
        borderRadius: loggedUser ? "20px 20px 0 20px" : "0 20px 20px 20px"
    }

    return (
        <div className={classes.message}>
            <div className={classes.image}>
                {
                    !loggedUser && <CustomAvatar
                        text={getNameConstants(messagedBy.firstName, messagedBy.lastName)}
                        style={{ fontSize: "0.8rem" }}
                    />
                }
            </div>
            <div className={`${classes.main} ${loggedUser ? classes.loggedUser : ''}`}>
                <div className={classes.userData}>
                    <div>
                        {
                            !loggedUser && `${messagedBy.firstName} ${messagedBy.lastName}`
                        }
                    </div>
                    <div>
                        {messagedOn}
                    </div>
                </div>
                <Paper style={messageTextStyle} className={classes.messageText}>
                    {text}
                </Paper>
            </div>
        </div>
    )
}

export default MessageBox