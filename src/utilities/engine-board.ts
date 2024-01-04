import { DraughtsBoard1D, DraughtsPlayer } from "rapid-draughts";
import { EnglishDraughtsBitSquare as S } from "rapid-draughts/english";
import { DraughtsEngineBoard } from "rapid-draughts/dist/core/engine";

export function toEngineBoard(
  board: DraughtsBoard1D
): DraughtsEngineBoard<number> {
  let light = 0;
  let dark = 0;
  let king = 0;
  board.forEach((square) => {
    if (square.position !== undefined) {
      if (square.piece?.player === DraughtsPlayer.LIGHT) {
        light = light | positionToBit(square.position);
      }
      if (square.piece?.player === DraughtsPlayer.DARK) {
        dark = dark | positionToBit(square.position);
      }
      if (square.piece?.king) {
        king = king | positionToBit(square.position);
      }
    }
  });
  return {
    light,
    dark,
    king,
  };
}

function positionToBit(position: number): number {
  const layout = [
    S[11],
    S[5],
    S[31],
    S[25],
    S[10],
    S[4],
    S[30],
    S[24],
    S[3],
    S[29],
    S[23],
    S[17],
    S[2],
    S[28],
    S[22],
    S[16],
    S[27],
    S[21],
    S[15],
    S[9],
    S[26],
    S[20],
    S[14],
    S[8],
    S[19],
    S[13],
    S[7],
    S[1],
    S[18],
    S[12],
    S[6],
    S[0],
  ];
  return layout[position];
}
