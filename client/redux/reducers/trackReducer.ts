import { TrackActions, TrackActionTypes, trackState } from "../../types/track"

const initialState: trackState = {
    tracks: [],
    error: ''
}

export const trackReducer = (state = initialState, action: TrackActions): trackState => {
    switch (action.type) {

        case TrackActionTypes.FETCH_TRACKS:
            return { ...state, error: '', tracks: action.payload }

        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return { ...state, error:action.payload }

        default: return { ...state }
    }
}