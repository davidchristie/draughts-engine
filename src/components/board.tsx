import {
  DraughtsBoard1D,
  DraughtsPlayer,
  DraughtsSquare1D,
} from "rapid-draughts";
import { ReactNode } from "react";
import styles from "./board.module.css";

export type BoardProps = {
  board: DraughtsBoard1D;
  onClick: (square: DraughtsSquare1D) => void;
};

export function Board(props: BoardProps): ReactNode {
  console.log;
  return (
    <div className={styles.container}>
      {props.board.map((square, index) => (
        <div
          key={index}
          className={square.dark ? styles.black : styles.white}
          onClick={() => {
            props.onClick(square);
          }}
        >
          {square.piece !== undefined && (
            <div
              style={{
                backgroundColor:
                  square.piece.player === DraughtsPlayer.LIGHT
                    ? "white"
                    : "red",
                width: "70%",
                height: "70%",
                margin: "15%",
                borderRadius: "50%",
                boxSizing: "border-box",
                border: square.piece.king ? "3px solid gold" : undefined,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {square.piece.king && "👑"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
