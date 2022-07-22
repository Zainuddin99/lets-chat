import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import classes from './chat.module.scss'

function RoomHeader() {
    const { name, participants, description } = useSelector((state: RootState) => state.chats)
    return (
        <Box className={classes.roomHeader} sx={{ boxShadow: 3 }}>
            <div className='flex-sb-c'>
                <h4>{name}</h4>
                <div>
                    <p>{participants} participants</p>
                </div>
            </div>
            <p>{description}</p>
            
        </Box>
    )
}

export default RoomHeader