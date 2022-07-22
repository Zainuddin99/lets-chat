import { Skeleton, Stack } from '@mui/material'
import React from 'react'
import classes from './Home.module.scss'

function RoomsSkeleton() {
    return (
        <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (<Skeleton key={item} variant="rectangular" animation="wave" height={"270px"} />))}
        </>
    )
}

export default RoomsSkeleton