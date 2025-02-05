import { useState } from 'react';
import { produce } from 'immer';
import { createCells, getMatches } from '@/utils';

import { TypeCell } from '@/globals';
import Cell from '@components/Cell';
import styles from './Game.module.css';

const initialCells = createCells(6);

function Game() {
  console.log('RENDER: Game Component');
  const [cells, setCells] = useState<TypeCell[]>(initialCells);

  function updateActiveCell(id: string) {
    console.log('CELL CLICKED: updateActiveCell');
    const prevCell = cells.find((cell: TypeCell) => cell.isActive);
    const activeCell = cells.find((cell: TypeCell) => cell.id === id);
    const matches = getMatches(prevCell, activeCell);

    setCells(
      produce(cells, (draft) => {
        const nextCell = draft.find((item) => item.id === id);
        const activeCell = draft.find((item) => item.isActive);
        const prevActiveCell = draft.find((item) => item.isPrevious);

        // negate previously active cell
        if (prevActiveCell) {
          prevActiveCell.isPrevious = false;
        }
        // set active cell to previous
        if (activeCell) {
          activeCell.isActive = false;
          activeCell.isPrevious = true;
        }
        // set new active cell
        if (nextCell !== undefined) {
          nextCell.isActive = true;
        }

        // remove matching pieces
        if (matches.length && activeCell && nextCell) {
          matches.forEach((pieceId) => {
            activeCell.pieces = activeCell?.pieces.filter(
              (item) => item !== pieceId,
            );
            nextCell.pieces = nextCell?.pieces.filter(
              (item) => item !== pieceId,
            );
          });
        }
      }),
    );
  }

  return (
    <section className={styles.grid}>
      {cells.map(({ id, pieces, isActive, isPrevious }) => {
        return (
          <Cell
            key={id}
            id={id}
            pieces={pieces}
            isPrevActive={isPrevious}
            isActive={isActive}
            setActive={updateActiveCell}
          />
        );
      })}
    </section>
  );
}

export default Game;
