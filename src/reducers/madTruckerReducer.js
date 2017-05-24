import { SET_VAL, SET_UPDATED_AMOUNT, REDIRECT_TO_BET } from '../actions/madTruckerAction';

const initialState={
  randomNum:''
}
export default function madTruckerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VAL:
     console.log(action);
     return [Object.assign({},state, {randomNum:action.data})]

     case SET_UPDATED_AMOUNT:
      console.log(action);
      return [action.data]

      case REDIRECT_TO_BET:
       console.log(action);
       return [action.data]

    default:
      return state;
  }
}
