import { useEffect, useState } from 'react';
import { createCells, getMatches } from '@/utils';
import Cell from '@components/Cell';

import styles from './Game.module.css';

export type ComparableCellsState = {
  previous: null | {
    id: string;
    pieces: string[];
  };
  active: null | {
    id: string;
    pieces: string[];
  };
};

const cells = createCells(6);

function Game() {
  const [comparableCells, setComparableCells] = useState<ComparableCellsState>({
    active: null,
    previous: null,
  });

  useEffect(() => {
    if (comparableCells.previous === null) {
      console.log('two cells must be selected before comparison');
      return;
    }

    const matches = getMatches(comparableCells);
    if (matches.length === 0) {
      console.log('NO MATCHES');
    } else {
      console.log(matches);
    }
  }, [comparableCells]);

  function updateCells(id: string, pieces: string[]) {
    setComparableCells({
      previous: comparableCells.active ? { ...comparableCells.active } : null,
      active: {
        id: id,
        pieces: pieces,
      },
    });
  }

  return (
    <section className={styles.grid}>
      {cells.map(({ id, pieces }) => {
        return (
          <Cell
            key={id}
            id={id}
            isPrevActive={comparableCells.previous?.id === id}
            isActive={comparableCells.active?.id === id}
            setActive={updateCells}
            pieces={pieces}
          />
        );
      })}
    </section>
  );
}

export default Game;
