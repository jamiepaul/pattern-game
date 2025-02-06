import { useState } from 'react';
import { produce } from 'immer';
import { createCells } from '@/utils';

import { TypeCell } from '@/globals';
import Cell from '@components/Cell';
import styles from './Game.module.css';

const initialCells = createCells(6);

function Game() {
  console.log('RENDER: Game Component');
  const [cells, setCells] = useState<TypeCell[]>(initialCells);

  const clearActiveCells = (draft: TypeCell[]) => {
    const activeCell = draft.find((item) => item.isActive);
    if (activeCell) {
      activeCell.isActive = false;
    }
    const prevActiveCell = draft.find((item) => item.isPrevious);
    if (prevActiveCell) {
      prevActiveCell.isPrevious = false;
    }
  };

  const removeMatchingPieces = (
    _draft: TypeCell[],
    activeCell: TypeCell,
    nextCell: TypeCell,
    matches: string[],
  ) => {
    matches.forEach((pieceId) => {
      activeCell.pieces = activeCell.pieces.filter((item) => item !== pieceId);
      nextCell.pieces = nextCell.pieces.filter((item) => item !== pieceId);
    });
  };

  const updateCellStates = (
    _draft: TypeCell[],
    activeCell: TypeCell,
    nextCell: TypeCell,
  ) => {
    if (activeCell) {
      activeCell.isActive = false;
      activeCell.isPrevious = true;
    }
    nextCell.isActive = true;
  };

  function handleCellEmptied(
    draft: TypeCell[],
    activeCell: TypeCell,
    nextCell: TypeCell,
  ) {
    // Clear any previous lastEmptied flags
    draft.forEach((cell) => (cell.isLastEmptied = false));

    if (activeCell) {
      activeCell.isPrevious = false;
    }
    nextCell.isActive = false;
    nextCell.isLastEmptied = true;
  }

  function updateCellsState(id: string, matches?: string[]) {
    console.log('CELL CLICKED: updateActiveCell');

    setCells(
      produce(cells, (draft) => {
        const nextCell = draft.find((item) => item.id === id)!;
        const activeCell = draft.find((item) => item.isActive);

        // zero matches
        if (matches && matches.length === 0) {
          clearActiveCells(draft);
        }

        // has matches
        if (matches && matches.length > 0) {
          removeMatchingPieces(draft, activeCell!, nextCell, matches);
          clearActiveCells(draft);
          updateCellStates(draft, activeCell!, nextCell);
          handleCellEmptied(draft, activeCell!, nextCell);
        }

        // comparison hasn't happened yet
        if (typeof matches === 'undefined') {
          updateCellStates(draft, activeCell!, nextCell);
        }
      }),
    );
  }

  return (
    <section className={styles.grid}>
      {cells.map(({ id, pieces, isActive, isLastEmptied }) => {
        return (
          <Cell
            key={id}
            id={id}
            pieces={pieces}
            isActive={isActive}
            isLastEmptied={isLastEmptied}
            previous={cells.find((cell: TypeCell) => cell.isActive)}
            updateCellsState={updateCellsState}
          />
        );
      })}
    </section>
  );
}

export default Game;
