import { ChangeEventHandler, ReactNode, useState } from "react";
import { Board } from "./components/board";
import { useEngine } from "./hooks/use-engine";
import { DraughtsPlayer, DraughtsSquare1D } from "rapid-draughts";

enum PlaceMode {
  PlaceLight = "place_light",
  PlaceLightKing = "place_light_king",
  PlaceDark = "place_dark",
  PlaceDarkKing = "place_dark_king",
  RemovePiece = "remove_piece",
}

export function App(): ReactNode {
  const engine = useEngine();
  const [placeMode, setPlaceMode] = useState<string>(PlaceMode.PlaceDark);
  const handlePlaceModeChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPlaceMode(event.target.value);
  };
  const handleBoardClick = (clickedSquare: DraughtsSquare1D) => {
    if (clickedSquare.position !== undefined) {
      console.log(">>> CLICK:", clickedSquare);
      if (placeMode === PlaceMode.PlaceLight) {
        engine.setBoard(
          engine.board.map((square) => {
            if (square.position === clickedSquare.position) {
              return {
                ...square,
                piece: {
                  king: false,
                  player: DraughtsPlayer.LIGHT,
                },
              };
            }
            return square;
          })
        );
      }
      if (placeMode === PlaceMode.PlaceLightKing) {
        engine.setBoard(
          engine.board.map((square) => {
            if (square.position === clickedSquare.position) {
              return {
                ...square,
                piece: {
                  king: true,
                  player: DraughtsPlayer.LIGHT,
                },
              };
            }
            return square;
          })
        );
      }
      if (placeMode === PlaceMode.PlaceDark) {
        engine.setBoard(
          engine.board.map((square) => {
            if (square.position === clickedSquare.position) {
              return {
                ...square,
                piece: {
                  king: false,
                  player: DraughtsPlayer.DARK,
                },
              };
            }
            return square;
          })
        );
      }
      if (placeMode === PlaceMode.PlaceDarkKing) {
        engine.setBoard(
          engine.board.map((square) => {
            if (square.position === clickedSquare.position) {
              return {
                ...square,
                piece: {
                  king: true,
                  player: DraughtsPlayer.DARK,
                },
              };
            }
            return square;
          })
        );
      }
      if (placeMode === PlaceMode.RemovePiece) {
        engine.setBoard(
          engine.board.map((square) => {
            if (square.position === clickedSquare.position) {
              return {
                ...square,
                piece: undefined,
              };
            }
            return square;
          })
        );
      }
    }
  };
  const handlePlayerChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value === DraughtsPlayer.DARK) {
      engine.setPlayer(DraughtsPlayer.DARK);
    }
    if (event.target.value === DraughtsPlayer.LIGHT) {
      engine.setPlayer(DraughtsPlayer.LIGHT);
    }
  };
  return (
    <div>
      <h1>Draughts Engine</h1>
      <fieldset style={{ maxWidth: "600px", marginBottom: "10px" }}>
        <legend>Current player</legend>
        <div>
          <input
            type="radio"
            id="dark_player"
            name="current_player"
            value={DraughtsPlayer.DARK}
            checked={engine.player === DraughtsPlayer.DARK}
            onChange={handlePlayerChange}
          />
          <label htmlFor="dark_player">Dark</label>
        </div>
        <div>
          <input
            type="radio"
            id="light_player"
            name="current_player"
            value={DraughtsPlayer.LIGHT}
            checked={engine.player === DraughtsPlayer.LIGHT}
            onChange={handlePlayerChange}
          />
          <label htmlFor="light_player">Light</label>
        </div>
      </fieldset>
      <fieldset style={{ maxWidth: "600px", marginBottom: "10px" }}>
        <legend>Place mode</legend>
        <div>
          <input
            type="radio"
            id="place_dark"
            name="place_mode"
            value={PlaceMode.PlaceDark}
            checked={placeMode === PlaceMode.PlaceDark}
            onChange={handlePlaceModeChange}
          />
          <label htmlFor="place_dark">Place dark piece</label>
        </div>
        <div>
          <input
            type="radio"
            id="place_dark_king"
            name="place_mode"
            value={PlaceMode.PlaceDarkKing}
            checked={placeMode === PlaceMode.PlaceDarkKing}
            onChange={handlePlaceModeChange}
          />
          <label htmlFor="place_dark_king">Place dark king</label>
        </div>
        <div>
          <input
            type="radio"
            id="place_light"
            name="place_mode"
            value={PlaceMode.PlaceLight}
            checked={placeMode === PlaceMode.PlaceLight}
            onChange={handlePlaceModeChange}
          />
          <label htmlFor="place_light">Place light piece</label>
        </div>
        <div>
          <input
            type="radio"
            id="place_light_king"
            name="place_mode"
            value={PlaceMode.PlaceLightKing}
            checked={placeMode === PlaceMode.PlaceLightKing}
            onChange={handlePlaceModeChange}
          />
          <label htmlFor="place_light_king">Place light king</label>
        </div>
        <div>
          <input
            type="radio"
            id="remove_piece"
            name="place_mode"
            value={PlaceMode.RemovePiece}
            checked={placeMode === PlaceMode.RemovePiece}
            onChange={handlePlaceModeChange}
          />
          <label htmlFor="remove_piece">Remove piece</label>
        </div>
      </fieldset>
      <Board board={engine.board} onClick={handleBoardClick} />
      <div>
        <h2>Status: {engine.status ?? ""}</h2>
      </div>
      <div style={{ maxWidth: "600px" }}>
        <h2>Best Move</h2>
        <button
          style={{ fontSize: "large", padding: "10ox" }}
          disabled={engine.moves.length === 0}
          onClick={() => {
            engine.move(engine.moves[0]);
          }}
        >
          Play best move
        </button>
        <pre style={{ padding: "5px", backgroundColor: "lightgray" }}>
          {JSON.stringify(engine.bestMove, null, 2)}
        </pre>
      </div>
      <div style={{ maxWidth: "600px" }}>
        <h2>Available Moves</h2>
        {engine.moves.map((move, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
              borderBottom: "1px solid black",
            }}
          >
            <strong>#{index + 1}</strong>
            <pre style={{ padding: "5px", backgroundColor: "lightgray" }}>
              {JSON.stringify(move, null, 2)}
            </pre>
            <button
              onClick={() => {
                engine.move(move);
              }}
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
