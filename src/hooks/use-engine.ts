import {
  DraughtsBoard1D,
  DraughtsMove1D,
  DraughtsPlayer,
  DraughtsStatus,
} from "rapid-draughts";
import {
  EnglishDraughts as Draughts,
  EnglishDraughtsGame,
} from "rapid-draughts/english";
import { useEffect, useRef, useState } from "react";
import { toEngineBoard } from "../utilities/engine-board";

export type Engine = {
  board: DraughtsBoard1D;
  player: DraughtsPlayer;
  moves: DraughtsMove1D[];
  setBoard: (board: DraughtsBoard1D) => void;
  setPlayer: (player: DraughtsPlayer) => void;
  move: (move: DraughtsMove1D) => void;
  status?: DraughtsStatus;
};

export function useEngine(): Engine {
  const draughts = useRef<EnglishDraughtsGame>();
  const [board, setBoard] = useState<DraughtsBoard1D>([]);
  const [player, setPlayer] = useState<DraughtsPlayer>(DraughtsPlayer.DARK);
  const [moves, setMoves] = useState<DraughtsMove1D[]>([]);
  useEffect(() => {
    draughts.current = Draughts.setup();
    setBoard(draughts.current.board);
    setPlayer(draughts.current.player);
    setMoves(draughts.current.moves);
  }, []);
  console.log(">>> BOARD:", board);
  console.log(">>> PLAYER:", player);
  console.log(">>> MOVES:", moves);
  console.log(">>> HISTORY:", draughts.current?.history);
  return {
    board,
    player,
    moves,
    setBoard: (board) => {
      draughts.current = Draughts.setup({
        board: toEngineBoard(board),
        player,
      });
      setMoves(draughts.current.moves);
      setPlayer(draughts.current.player);
      setBoard(draughts.current.board);
    },
    setPlayer: (player) => {
      draughts.current = Draughts.setup({
        board: toEngineBoard(board),
        player,
      });
      setMoves(draughts.current.moves);
      setPlayer(draughts.current.player);
      setBoard(draughts.current.board);
    },
    move: (move) => {
      if (draughts.current) {
        draughts.current.move(move);
        setMoves(draughts.current.moves);
        setPlayer(draughts.current.player);
        setBoard(draughts.current.board);
      }
    },
    status: draughts.current?.status,
  };
}
