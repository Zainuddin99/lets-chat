import classes from './Home.module.scss'
import { MdDateRange } from 'react-icons/md'
import { RiAdminLine } from 'react-icons/ri'
import { joinRoom, removeRequest, requestToJoin } from '../../Firebase/Database/rooms'
import { handleError } from "../../utils/handleError"
import { notify } from "../../utils/notify"
import { useState } from "react"
import { changeJoinedState, changeRequestState } from "../../Redux/rooms"
import { dispatch } from "../../Redux/store"
import Router from "next/router"
import { Room } from "../../TS Types/home.types"
import { Box } from "@mui/system"
import { Tooltip, Typography } from '@mui/material'

const toolTipEnterDelay: number = 500

function EachRoom({ item }: { item: Room }) {
    const { name, description, createdAt, participants, privateRoom, id, alreadyRequested, joined, adminData } = item
    const [requesting, setRequesting] = useState<boolean>(false)

    const requestJoinHandler = async (type: 'join' | 'remove' | 'join-request') => {
        setRequesting(true)
        try {
            if (type === "join-request") {
                //To request joining
                await requestToJoin(id)
                notify("success", "Successfully requested")
                dispatch(changeRequestState({ id }))
            } else if (type === "remove") {
                await removeRequest(id)
                notify("success", "Request cancelled")
                dispatch(changeRequestState({ id }))
            } else if (type === "join") {
                await joinRoom(id)
                dispatch(changeJoinedState({ id }))
                notify("success", "Joined room")
            }
        } catch (error: any) {
            handleError(error)
        }
        setRequesting(false)
    }

    const goToMessage = () => {
        Router.push({
            pathname: '/chat',
            query: { chatId: id }
        })
    }

    return (
        <Box sx={{ boxShadow: 6 }} className={classes.room}>
            <div className={`flex-sb-c ${classes.header}`}>
                <div className={classes.participant}>{participants} Participants</div>
                <div className={privateRoom ? classes.private : classes.public}>{privateRoom ? 'Private' : 'Public'}</div>
            </div>
            <div className={classes.details}>
                <Tooltip title="Room creation date" enterDelay={toolTipEnterDelay}>
                    <Typography color="text.secondary" className={classes.createdAt}>
                        <MdDateRange /> {createdAt}
                    </Typography>
                </Tooltip>
                <Tooltip title="Room admin" enterDelay={toolTipEnterDelay}>
                    <Typography color="text.secondary" className={classes.admin}>
                        <RiAdminLine /> {`${adminData.firstName} ${adminData.lastName}`}
                    </Typography>
                </Tooltip>
                <Typography variant="h5">
                    {name}
                </Typography>
                <Typography className={classes.description} color="text.secondary">
                    {description}
                </Typography>
                <button
                    disabled={requesting}
                    onClick={() => joined ? goToMessage() : (privateRoom ? (alreadyRequested ? requestJoinHandler("remove") : requestJoinHandler("join-request")) : requestJoinHandler("join"))}
                    className={joined ? "primary" : (privateRoom ? (alreadyRequested ? 'danger' : 'blue') : "secondary")}
                >
                    {
                        joined ? 'Message' : (privateRoom ? (alreadyRequested ? 'Requested' : 'Request to join') : 'Join room')
                    }
                </button>
            </div>
        </Box>
    )
}

export default EachRoom