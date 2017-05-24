export const SET_VAL = 'SET_VAL';
export const SET_UPDATED_AMOUNT = 'SET_UPDATED_AMOUNT';
export const REDIRECT_TO_BET = 'REDIRECT_TO_BET';

export function setVal(data) {
  console.log(data);
  return {
    type: SET_VAL,
    data
  }
}

export function setUpdatedAmount(data){
  console.log(data);
  return {
    type: SET_UPDATED_AMOUNT,
    data
  }
}

export function redirectToBet(data){
  console.log(data);
  return {
    type: REDIRECT_TO_BET,
    data
  }
}
