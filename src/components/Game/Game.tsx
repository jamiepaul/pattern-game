import { useEffect, useState } from 'react';
import { produce } from 'immer';
import { GRID_CELLS } from '@/constants';
import { createCells } from '@/helpers/game.helpers';
import { GameStatus, GameCell } from '@/globals';
import Cell from '@components/Cell';
import styles from './Game.module.css';
import Banner from '../Banner';

// Create new game cells
const initialCells = createCells(GRID_CELLS);

function Game() {
  console.log('RENDER: Game Component');
  const [cells, setCells] = useState<GameCell[]>(initialCells);
  const [gameStatus, setGameStatus] = useState<GameStatus>('running');
  const [noMatchCount, setNoMatchCount] = useState(0);

  useEffect(() => {
    const allEmpty = cells.every((cell) => cell.pieces.length === 0);
    if (!allEmpty) {
      return;
    }

    setGameStatus(noMatchCount === 0 ? 'won' : 'complete');
  }, [cells, noMatchCount]);

  const removeMatchingPieces = (
    activeCell: GameCell,
    nextCell: GameCell,
    matches: string[],
  ) => {
    matches.forEach((pieceId) => {
      activeCell.pieces = activeCell.pieces.filter((item) => item !== pieceId);
      nextCell.pieces = nextCell.pieces.filter((item) => item !== pieceId);
    });
  };

  const resetCellStatuses = (
    prevActiveCell: GameCell | undefined,
    activeCell?: GameCell | undefined,
  ) => {
    if (prevActiveCell) {
      prevActiveCell.status = 'default';
    }
    if (activeCell) {
      activeCell.status = 'default';
    }
  };

  const updateCellStatuses = (
    emptyCell: GameCell | undefined,
    activeCell: GameCell | undefined,
    nextCell: GameCell,
  ) => {
    if (emptyCell) {
      emptyCell.status = 'default';
    }
    if (activeCell) {
      activeCell.status = nextCell.pieces.length > 0 ? 'previous' : 'default';
    }
    nextCell.status = nextCell.pieces.length > 0 ? 'active' : 'empty';
  };

  function updateCellsState(id: string, matches?: string[]) {
    if (matches && matches.length === 0) {
      setNoMatchCount((c) => c + 1);
    }

    setCells(
      produce(cells, (draft) => {
        const nextCell = draft.find((item) => item.id === id)!;
        const activeCell = draft.find((item) => item.status === 'active');
        const prevActiveCell = draft.find((item) => item.status === 'previous');
        const emptyCell = draft.find((item) => item.status === 'empty');

        // zero matches
        if (matches && matches.length === 0) {
          resetCellStatuses(prevActiveCell, activeCell);
        }

        // has matches
        if (matches && matches.length > 0) {
          removeMatchingPieces(activeCell!, nextCell!, matches);
          resetCellStatuses(prevActiveCell);
          updateCellStatuses(emptyCell, activeCell, nextCell);
        }

        // comparison hasn't happened yet
        if (typeof matches === 'undefined') {
          updateCellStatuses(emptyCell, activeCell, nextCell);
        }
      }),
    );
  }

  return (
    <>
      <section className={styles.grid}>
        {cells.map(({ id, status, pieces }) => {
          return (
            <Cell
              key={id}
              id={id}
              status={status}
              pieces={pieces}
              previous={cells.find(
                (cell: GameCell) => cell.status === 'active',
              )}
              updateCellsState={updateCellsState}
            />
          );
        })}
      </section>
      {gameStatus !== 'running' && <Banner status={gameStatus} />}
    </>
  );
}

export default Game;
