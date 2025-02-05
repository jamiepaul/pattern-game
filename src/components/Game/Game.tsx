import { useEffect, useState } from 'react';
import { produce } from 'immer';
import { TypeCell, createCells, getMatches } from '@/utils';
import Cell from '@components/Cell';

import styles from './Game.module.css';

const initialCells = createCells(6);

function Game() {
  const [cells, setCells] = useState<TypeCell[]>(initialCells);

  useEffect(() => {
    const prevCell = cells.find((cell: TypeCell) => cell.isPrevious);
    const activeCell = cells.find((cell: TypeCell) => cell.isActive);
    const matches = getMatches(prevCell, activeCell);

    if (matches.length === 0) {
      console.log('NO MATCHES');
    } else {
      console.log(matches);
      setCells(
        produce(cells, (draft) => {
          // we already checked both exist in getMatches
          const activeCell = draft.find((item) => item.isActive)!;
          const prevActiveCell = draft.find((item) => item.isPrevious)!;

          // remove the matching pieces from both cells
          matches.forEach((pieceId) => {
            activeCell.pieces = activeCell?.pieces.filter(
              (item) => item !== pieceId,
            );
            prevActiveCell.pieces = prevActiveCell?.pieces.filter(
              (item) => item !== pieceId,
            );
          });
        }),
      );
    }
  }, [cells]);

  function updateActiveCell(id: string) {
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
      }),
    );
  }

  console.log(cells);

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
