import { Pause, PlayArrow, PlaylistAddCircleRounded, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import styles from '../styles/Player.module.scss'
import { ITrack } from '../types/track';
import TrackProgress from './TrackProgress';

let audio: any


const Player: React.FC = () => {
    const track: ITrack = {
        _id: '2',
        name: 'Trek 2',
        artist: 'Mary Gu',
        text: 'лалалал лалала',
        listens: 0,
        picture: 'https://sun1-90.userapi.com/s/v1/ig2/CuG4gzm-2HMV2-JtZt6rMQtZfvC5MGBWMKESVsYExwpGxJuNtGayMlE0sFyZNRsXsEGCwN-y_1_pL7uTmAZHXQ8E.jpg?size=200x200&quality=96&crop=12,12,200,200&ava=1',
        audio: 'http://localhost:1000/audio/e3b49cac-e632-49a8-a234-55804f42ffa4.mp3',
        comments: []
    }
    const ref = useRef(null)
    const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
    const { playTrack, pauseTrack, setVolume, setCurrentTime, setDuration, setActiveTrack } = useActions()


    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        }
        else {
            pauseTrack()
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value))
        audio.volume = Number(e.target.value) / 100
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTime(Number(e.target.value))
        audio.currentTime = Number(e.target.value)
    }

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        }
        else {
            setAudio()
            play()
        }
    }, [active])

    const setAudio = () => {
        if (active) {
            audio.src = 'http://localhost:1000/' + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    if (!active) return null

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {pause
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <Grid container direction='column' style={{ width: 200, margin: '0 20px' }}>
                <div >{active?.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
            <VolumeUp style={{ marginLeft: 'auto' }} />
            <TrackProgress left={volume} right={100} onChange={changeVolume} />
        </div>
    );
};

export default Player;