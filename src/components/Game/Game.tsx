import { useState } from 'react';
import { createCells } from '@/utils';
import Cell from '@components/Cell';

import styles from './Game.module.css';

type ComparableCellsState = {
  prevId: string | null;
  activeId: string | null;
};

const cells = createCells(6);

function Game() {
  const [comparableCells, setComparableCells] = useState<ComparableCellsState>({
    activeId: null,
    prevId: null,
  });

  console.log(cells);

  function updateCells(id: string) {
    setComparableCells({
      prevId: comparableCells.activeId,
      activeId: id,
    });
  }

  return (
    <section className={styles.grid}>
      {cells.map(({ id, pieces }) => {
        return (
          <Cell
            key={id}
            id={id}
            isPrevActive={comparableCells.prevId === id}
            isActive={comparableCells.activeId === id}
            setActive={updateCells}
            pieces={pieces}
          />
        );
      })}
    </section>
  );
}

export default Game;
