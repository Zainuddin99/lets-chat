import { Box, Fab } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useModalState } from '../../customHooks/useModal'
import { dispatch, RootState } from '../../Redux/store'
import classes from './Home.module.scss'
import AddRoomModal from './AddRoomModal'
import EachRoom from './EachRoom'
import AddIcon from '@mui/icons-material/Add';
import { Room } from '../../TS Types/home.types'
import { QueryDocumentSnapshotType } from '../../TS Types/firebase.types'
import { addRoomsList, changeRoomsLoadingState } from '../../Redux/rooms'
import { AllRoomsResponse } from '../../Firebase/Database/rooms.types'
import { getAllRooms } from '../../Firebase/Database/rooms'
import RoomsSkeleton from './RoomsSkeleton'
import { inRange } from '../../utils/functions'

function Rooms() {
    const [isModalOpen, openModal, closeModal] = useModalState(false)
    //Storing in ref because the data needs to be updated at event listner which can be done using refs
    const paginationDataRef = useRef<{ lastDocumentSnap: QueryDocumentSnapshotType | null; noMoreRooms: boolean } | null>(null)
    const { roomsList, loading } = useSelector((state: RootState) => state.rooms)

    const mainDiv = useRef<HTMLDivElement>(null)

    const fetchRooms = async (
        //At first it will be null
        lastDocumentSnapData: QueryDocumentSnapshotType | null
    ) => {
        try {
            dispatch(changeRoomsLoadingState(true));
            const { rooms, noMoreRooms, lastDocumentSnap }: AllRoomsResponse =
                await getAllRooms(lastDocumentSnapData);
            paginationDataRef.current = { lastDocumentSnap, noMoreRooms }
            dispatch(addRoomsList({ rooms, paginated: lastDocumentSnapData ? true : false }));
            dispatch(changeRoomsLoadingState(false));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (roomsList.length === 0) {
            fetchRooms(null)
        }
    }, [])

    useEffect(() => {
        //Ref might change later (to remove warning) store in local var to maintain its identity
        const divRef = mainDiv.current

        const handleSroll = function (event: any) {
            if (paginationDataRef.current?.noMoreRooms) {
                return () => divRef?.removeEventListener('scroll', handleSroll)
            }
            let element = event.target as HTMLDivElement;
            //Because there can be some difference
            const scrollValue = element.scrollHeight - element.scrollTop
            if (element && inRange(scrollValue, element.clientHeight - 4, element.clientHeight + 100)) {
                fetchRooms(paginationDataRef.current?.lastDocumentSnap || null)
            }
        }

        divRef?.addEventListener('scroll', handleSroll);
        return () => divRef?.removeEventListener('scroll', handleSroll);
    }, [])

    return (
        <>
            {isModalOpen && <AddRoomModal close={closeModal} />}
            <Box ref={mainDiv} className={classes.rooms + " " + "flex-se-c"} sx={{ bgColor: "rgb(251, 251, 251)", boxShadow: 7 }}>

                <div className={"grid-c" + " " + classes.createRoom}>
                    <Fab color='primary' variant="extended" className={classes.createBtn} onClick={openModal}>
                        <AddIcon />
                        Create room
                    </Fab>
                </div>

                {
                    roomsList.map((item: Room) => {
                        return <EachRoom item={item} key={item.id} />
                    })
                }

                {
                    loading && <RoomsSkeleton />
                }

            </Box>
        </>
    )
}

export default Rooms