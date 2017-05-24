import { PLACE_BET } from '../actions/placeBetAction';
const initialState={
 redirect: false
}
export default function placeBetReducer(state = initialState, action) {
  switch (action.type) {
    case PLACE_BET:
     console.log(action);
     return Object.assign({},state,{
       data: action.data,
       reaminingAmount: action.reaminingAmount,
       redirect: true
     })



    default:
      return state;
  }
}
