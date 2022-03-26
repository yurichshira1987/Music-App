import axios from 'axios'
import { Button, Grid, TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayouts';
import { ITrack } from '../../types/track';

interface TrackPageProps {
    serverTrack: ITrack
}


const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [text, setText] = useState('')

    const addComment = async () => {
        try {
            const res = await axios.post('http://localhost:1000/tracks/comment', {
                username, text, trackId: track._id
            })
            console.log([...track.comments, res.data])
            setTrack({...track, comments: [...track.comments, res.data]})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout title={'Трек - ' + track.name}>
            <Button variant={'outlined'} style={{ fontSize: '32px' }} onClick={() => router.push('/tracks')}>
                К списку
            </Button>
            <Grid container style={{ margin: '20px 0' }}>
                <img src={'http://localhost:1000/' + track.picture} style={{ width: '200px', height: '200px' }}></img>
                <div style={{ margin: '0 20px' }}>
                    <h1> Название трека - {track.name}</h1>
                    <h1> Исполнитель - {track.artist}</h1>
                    <h1> Прослушиваний - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Слова к треку</h1>
            <p>{track.text}</p>

            <h1>Комментарии</h1>
            <Grid container>
                <TextField onChange={(e) => setUsername(e.target.value)} value={username} label='Ваше имя' fullWidth />
                <TextField onChange={(e) => setText(e.target.value)} value={text} label='Ваш текст' fullWidth multiline rows={4} />
                <Button onClick={addComment}> Отправить </Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <div key={comment._id}>
                        <div> Автор - {comment.username}</div>
                        <div>Комментарии - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};


export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const res = await axios.get('http://localhost:1000/tracks/' + params?.id)
    return {
        props: {
            serverTrack: res.data
        }
    }
}
