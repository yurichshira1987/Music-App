import { Card, Grid, IconButton } from '@mui/material';
import React from 'react';
import { ITrack } from '../types/track';
import styles from '../styles/TrackItem.module.scss'
import { PlayArrow, Pause, Delete } from '@mui/icons-material'
import { useRouter } from 'next/router';
import { useActions } from '../hooks/useActions';


interface TrackItemProps {
    track: ITrack,
    active?: boolean
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active }) => {
    const router = useRouter()
    const { playTrack, pauseTrack, setActiveTrack } = useActions()

    const play = (e: any) => {
        e.stopPropagation()
        playTrack()
        setActiveTrack(track)
    }



    return (
        <div>
            <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
                <IconButton onClick={play}>
                    {!active ? <PlayArrow /> : <Pause />}
                </IconButton>
                <img style={{ width: 70, height: 70, marginLeft: '10px' }} src={'http://localhost:1000/' + track.picture} alt="" />
                <Grid container direction='column' style={{ width: 200, margin: '0 20px' }}>
                    <div>{track.name}</div>
                    <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
                </Grid>
                {active && <div>02:42 / 03: 22</div>}
                <IconButton onClick={e => e.stopPropagation()} style={{ marginLeft: 'auto' }}>
                    <Delete />
                </IconButton>
            </Card>
        </div>
    );
};

export default TrackItem;