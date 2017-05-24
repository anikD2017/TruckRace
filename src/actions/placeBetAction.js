export const PLACE_BET = 'PLACE_BET';

export function placeBet(data, reaminingAmount) {
  console.log(data);
  return {
    type: PLACE_BET,
    data,
    reaminingAmount
  }

}
