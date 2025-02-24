import { CellStatus } from '@/globals';

import { AnimatePresence, motion } from 'motion/react';
import VisuallyHidden from '../VisuallyHidden';
import styles from './Cell.module.css';
import { staggeredScaleRotate } from './animations';

type CellProps = {
  id: string;
  status: CellStatus;
  pieces: string[];
  onClick: (id: string) => void;
};

function Cell({ id, status, pieces, onClick }: CellProps) {
  const showNoMatch = status === 'no_match';

  return (
    <div id={id} className={styles.cell} data-status={status}>
      <div className={styles.message}>{showNoMatch && <p>no match</p>}</div>
      <button
        className={styles.btn}
        onClick={() => {
          if(status === 'inactive') return; //do nothing
          onClick(id);
        }}
      >
        <VisuallyHidden>
          {`Select cell with pieces ${pieces.join(', ')}`}
        </VisuallyHidden>
      </button>
      <div className={styles.pieces}>
        <AnimatePresence>
          {pieces.map((pieceId, i) => (
            <motion.svg
              key={pieceId}
              data-piece={pieceId}
              {...staggeredScaleRotate(i)}
            >
              <use xlinkHref={`/svg-sprite.svg#${pieceId}`} />
            </motion.svg>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Cell;
