// import * as React from 'react';
import { range } from '@/utils';

import styles from './Game.module.css';

function Game() {
  return (
    <section className={styles.grid}>
      {range(12).map(() => (
        <div className={styles.cell}>X</div>
      ))}
    </section>
  );
}

export default Game;
