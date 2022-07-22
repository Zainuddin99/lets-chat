import Image from 'next/image'
import { useSelector } from 'react-redux'
import { signoutUser } from '../Firebase/auth'
import { RootState } from '../Redux/store'
import { firstChar } from '../utils/functions'
import CustomAvatar from './Reusable/Avatar'

function Header() {
    const { email } = useSelector((state: RootState) => state.users)

    return (
        <header className="flex-sa-c">
            <Image src={'/main2.png'} width="100" alt='lets-chat' height="90" />
            <div>
                <CustomAvatar onClick={signoutUser} text={firstChar(email)} style={{ padding: "25px", margin: "0 30px" }} />
            </div>
        </header>
    )
}

export default Header