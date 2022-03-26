
import { Dispatch } from "react"
import { ITrack, TrackActions, TrackActionTypes } from "../../types/track"
import axios from 'axios'


export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackActions>) => {
        try {

            const res = await axios.get('http://localhost:1000/tracks')
            dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: res.data })
        } catch (e) {
            dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Произошла ошибка' })
        }
    }
}

export const setTracks = (payload: ITrack[]) => {
    return { type: TrackActionTypes.FETCH_TRACKS, payload }
}


export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackActions>) => {
        try {
            const res = await axios.get('http://localhost:1000/tracks/search?songname=' + query)
            dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: res.data })
        } catch (e) {
            dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Произошла ошибка' })
        }
    }
}