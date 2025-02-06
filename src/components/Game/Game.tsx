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

  function updateActiveCell(id: string, matches?: string[]) {
    console.log('CELL CLICKED: updateActiveCell');

    setCells(
      produce(cells, (draft) => {
        const nextCell = draft.find((item) => item.id === id)!;
        const activeCell = draft.find((item) => item.isActive);
        const prevActiveCell = draft.find((item) => item.isPrevious);

        // ZERO MATCHES
        // Don't set isActive on clicked cell
        // Negate the current isActive property
        if (matches && matches.length === 0) {
          if (activeCell) {
            activeCell.isActive = false;
          }
        }

        // MACTCHES UNDEFINED -OR- HAS MATCHES
        // Update isActive & isPrevious properties
        if (typeof matches === 'undefined' || (matches && matches.length > 0)) {
          console.log('two cells must be selected before comparison');
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
          nextCell.isActive = true;
        }

        // HAS MATCHES
        // remove matching pieces
        if (matches && matches.length > 0) {
          matches.forEach((pieceId) => {
            if (activeCell) {
              activeCell.pieces = activeCell?.pieces.filter(
                (item) => item !== pieceId,
              );
            }
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
      {cells.map(({ id, pieces, isActive }) => {
        return (
          <Cell
            key={id}
            id={id}
            pieces={pieces}
            isActive={isActive}
            setActive={updateActiveCell}
            previous={cells.find((cell: TypeCell) => cell.isActive)}
          />
        );
      })}
    </section>
  );
}

export default Game;
