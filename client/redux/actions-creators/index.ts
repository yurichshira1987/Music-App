
import * as PlayerActionCreators from '../actions-creators/player'
import * as TrackActionCreators from '../actions-creators/track'

export default{ ...PlayerActionCreators, ...TrackActionCreators}









// import { useDispatch } from "react-redux"
// import { bindActionCreators } from "redux"

// const actionsCreators = {
//     ...PlayerActionCreators
// }


// export const useActions = () =>{
//     const dispatch = useDispatch()
//     return bindActionCreators(actionsCreators, dispatch)
// }
