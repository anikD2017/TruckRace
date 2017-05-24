export const START_GAME = 'START_GAME';

export function startGame(data) {
  console.log(data);
  return {
    type: START_GAME,
    data
  }
}
