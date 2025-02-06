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

  const resetCellStatuses = (
    activeCell: TypeCell | undefined,
    prevActiveCell: TypeCell | undefined,
  ) => {
    if (activeCell) {
      activeCell.status = 'default';
    }
    if (prevActiveCell) {
      prevActiveCell.status = 'default';
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
    draft: TypeCell[],
    activeCell: TypeCell,
    nextCell: TypeCell,
  ) => {
    const emptyCell = draft.find((item) => item.status === 'empty');
    if (emptyCell) {
      emptyCell.status = 'default';
    }
    if (activeCell) {
      activeCell.status = 'previous';
    }
    nextCell.status = 'active';
  };

  function handleCellEmptied(
    _draft: TypeCell[],
    activeCell: TypeCell,
    nextCell: TypeCell,
  ) {
    if (nextCell.pieces.length > 0) {
      return;
    }

    if (activeCell) {
      activeCell.status = 'default';
    }
    nextCell.status = 'empty';
  }

  function updateCellsState(id: string, matches?: string[]) {
    setCells(
      produce(cells, (draft) => {
        const nextCell = draft.find((item) => item.id === id)!;
        const activeCell = draft.find((item) => item.status === 'active');
        const prevActiveCell = draft.find((item) => item.status === 'previous');

        // zero matches
        if (matches && matches.length === 0) {
          resetCellStatuses(activeCell, prevActiveCell);
        }

        // has matches
        if (matches && matches.length > 0) {
          removeMatchingPieces(draft, activeCell!, nextCell, matches);
          resetCellStatuses(activeCell, prevActiveCell); // needed?
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

  console.log(cells);

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
