import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { CSSProperties } from 'react'

type Props = {
    text: string,
    style?: CSSProperties,
    onClick?: () => void,
    className?: string
}

function CustomAvatar({ text, style = {}, onClick, className }: Props) {
    return (
        <Avatar style={{ backgroundColor: deepOrange[500], ...style }} onClick={onClick} className={className} >
            {text}
        </Avatar>
    )
}

export default CustomAvatar