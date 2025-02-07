import { useState } from 'react';
import { produce } from 'immer';
import { GRID_CELLS } from '@/constants';
import { createCells } from '@/helpers/game.helpers';
import { TypeCell } from '@/globals';
import Cell from '@components/Cell';
import styles from './Game.module.css';

// Create new game cells
const initialCells = createCells(GRID_CELLS);

function Game() {
  console.log('RENDER: Game Component');
  const [cells, setCells] = useState<TypeCell[]>(initialCells);

  const removeMatchingPieces = (
    activeCell: TypeCell,
    nextCell: TypeCell,
    matches: string[],
  ) => {
    matches.forEach((pieceId) => {
      activeCell.pieces = activeCell.pieces.filter((item) => item !== pieceId);
      nextCell.pieces = nextCell.pieces.filter((item) => item !== pieceId);
    });
  };

  const resetCellStatuses = (
    prevActiveCell: TypeCell | undefined,
    activeCell?: TypeCell | undefined,
  ) => {
    console.log('resetCellStatuses');
    if (prevActiveCell) {
      prevActiveCell.status = 'default';
    }
    if (activeCell) {
      activeCell.status = 'default';
    }
  };

  const updateCellStatuses = (
    emptyCell: TypeCell | undefined,
    activeCell: TypeCell | undefined,
    nextCell: TypeCell,
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
    <section className={styles.grid}>
      {cells.map(({ id, status, pieces }) => {
        return (
          <Cell
            key={id}
            id={id}
            status={status}
            pieces={pieces}
            previous={cells.find((cell: TypeCell) => cell.status === 'active')}
            updateCellsState={updateCellsState}
          />
        );
      })}
    </section>
  );
}

export default Game;
