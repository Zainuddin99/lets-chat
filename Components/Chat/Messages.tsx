import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import classes from './chat.module.scss'
import MessageBox from './MessageBox'

function Messages() {
    const { messages } = useSelector((state: RootState) => state.chats)

    return (
        <div className={classes.messagesContainer}>
            {
                messages.map(item => <MessageBox key={item.id} data={item} />)
            }
        </div>
    )
}

export default Messages