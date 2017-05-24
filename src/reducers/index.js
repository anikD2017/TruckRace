import {combineReducers} from 'redux';
import gameSetUpReducer from './gameSetUpReducer'
import placeBetReducer from './placeBetReducer'
import madTruckerReducer from './madTruckerReducer'
const rootReducer = combineReducers({
  gameSetUpReducer,
  placeBetReducer,
  madTruckerReducer
});

const appReducer = (state,action) => {

  return rootReducer(state,action)
}
export default appReducer;
