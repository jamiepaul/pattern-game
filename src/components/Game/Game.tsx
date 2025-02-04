import { useState } from 'react';
import { createCells } from '@/utils';
import Cell from '@components/Cell';

import styles from './Game.module.css';

const cells = createCells(12);

function Game() {
  const [activeCell, setActiveCell] = useState<string | null>(null);

  return (
    <section className={styles.grid}>
      {cells.map(({ id }) => {
        return (
          <Cell
            key={id}
            id={id}
            isActive={activeCell === id}
            setActiveCell={setActiveCell}
          />
        );
      })}
    </section>
  );
}

export default Game;
