import { START_GAME } from '../actions/gameSetUpAction';
const initialState={
  fund:'',
  playerName: '',
  numberOfTrucks: ''
}
export default function gameSetUpReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
     console.log(action);
     return [
       ...state,
       Object.assign({}, action.data)
     ]



    default:
      return state;
  }
}
