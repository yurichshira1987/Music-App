

import { Button, Card, Grid, Box, TextField } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import axios from 'axios'
import TrackList from "../../components/TrackList"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import MainLayout from "../../layouts/MainLayouts"
import { NextThunkDispatch, wrapper } from "../../redux"
import { fetchTracks } from "../../redux/actions-creators/track"
import { ITrack } from "../../types/track"


interface TrackPageProps {
    serverTracks: ITrack[]
}

const Tracks: NextPage<TrackPageProps> = ({ serverTracks }) => {
    const router = useRouter()
    const { searchTracks } = useActions()

    const { tracks, error } = useTypedSelector(state => state.track)
    const { setTracks } = useActions()
    const [query, setQuery] = useState('')
    const [timer, setTimer]: any = useState(null)

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)

        if (timer) {
            clearTimeout(timer)
        }
        setTimer(setTimeout(() => { searchTracks(e.target.value) }, 500))
    }




    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    useEffect(() => {
        setTracks(serverTracks)
    }, [])

    return (
        <MainLayout title={'Список треков'} keywords={'артисты, музло по кайфу'}>

            <Grid container justifyContent='center'>
                <Card style={{ width: 900 }}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Список треков</h1>
                            <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
                        </Grid>
                    </Box>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    <TrackList tracks={tracks} />
                </Card>
            </Grid>
        </MainLayout>
    )
}

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }): Promise<any> => {
//     const dispatch = store.dispatch as NextThunkDispatch
//     await dispatch(fetchTracks())

// });


export const getServerSideProps: GetServerSideProps = async () => {
    const res = await axios.get('http://localhost:1000/tracks')
    return {
        props: {
            serverTracks: res.data
        }
    }
}



export default Tracks


