import Home from '../Components/Home/Home'
// import { getAllRooms } from '../Firebase/Database/rooms'
// import { HomePageProps } from '../TS Types/home.types'
// import { Rooms } from '../TS Types/redux.types'

function homePage() {

    return (
        <Home />
    )
}

//For now this is not needed since auth is anot accessible at server
// export async function getServerSideProps() {
//     const response: Rooms = await getAllRooms()
//     return {
//         props: {
//             rooms: response
//         }
//     }
// }

export default homePage