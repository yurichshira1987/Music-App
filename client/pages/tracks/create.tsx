
import { useInput } from "@mui/base"
import { Button, Grid, TextField } from "@mui/material"
import { NextPage } from "next"
import React, { useState } from "react"
import FileUpload from "../../components/FileUpload"
import StepWrapper from "../../components/StepWrapper"
import MainLayout from "../../layouts/MainLayouts"
import axios from 'axios'
import { useRouter } from "next/router"

const Create: NextPage = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState('')
    const [audio, setAudio] = useState('')
    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [artist, setArtist] = useState('')
    const router = useRouter()


    const next = () => {
        if (activeStep < 2) setActiveStep(prev => prev + 1)
        else {
            loadTrack()
        }
    }

    const loadTrack = () => {
        console.log(audio[0])
        console.log(picture[0])
        const formData = new FormData()
        formData.append('name', name)
        formData.append('text', text)
        formData.append('artist', artist)
        formData.append('audio', audio[0])
        formData.append('picture', picture[0])
        axios.post('http://localhost:1000/tracks', formData)
            .then(res => router.push('/tracks'))
            .catch(e => console.log(e))
    }

    const back = () => {
        setActiveStep(prev => prev - 1)
    }

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid container direction='column' style={{ padding: 20 }}>
                        <TextField
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            style={{ marginTop: 10 }}
                            label='Название трека'
                        />
                        <TextField
                            value={text}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                            style={{ marginTop: 10 }}
                            label='Имя исполнителя'
                        />
                        <TextField
                            value={artist}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArtist(e.target.value)}
                            style={{ marginTop: 10 }}
                            label='Слова к треку'
                            multiline
                            rows={3}
                        />
                    </Grid>
                }
                {activeStep === 1 &&
                    <FileUpload setFile={setPicture} accept='image/*'>
                        <Button>Загрузить изображение</Button>
                    </FileUpload>
                }
                {activeStep === 2 &&
                    <FileUpload setFile={setAudio} accept='audio/*'>
                        <Button>Загрузить аудио</Button>
                    </FileUpload>
                }
            </StepWrapper>

            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                <Button onClick={next}>Далее</Button>
            </Grid>
        </MainLayout>
    )
}

export default Create