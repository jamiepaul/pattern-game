import { useEffect, useState } from 'react';
import { CellStatus, GameCell } from '@/globals';
import { getMatches } from '@/helpers/game.helpers';
import { AnimatePresence, motion } from 'motion/react';
import VisuallyHidden from '../VisuallyHidden';
import styles from './Cell.module.css';

type CellProps = {
  id: string;
  disabled: boolean;
  status: CellStatus;
  pieces: string[];
  previous: GameCell | undefined;
  updateCellsState: (id: string, matches?: string[]) => void;
};

function Cell({
  id,
  disabled,
  status,
  pieces,
  previous,
  updateCellsState,
}: CellProps) {
  const [showNoMatch, setShowNoMatch] = useState(false);

  useEffect(() => {
    if (setShowNoMatch) {
      const timerId = setTimeout(() => {
        setShowNoMatch(false);
      }, 2500);
      return () => clearTimeout(timerId);
    }
  }, [showNoMatch]);

  function handleClick() {
    // do nothing if same cell is clicked twice OR game is over
    if (status === 'active' || disabled) return;

    // only one cell has been clicked, comparison can't be run
    if (!previous) {
      updateCellsState(id);
      return;
    }

    const matches = getMatches(previous.pieces, pieces);
    if (matches.length === 0) {
      setShowNoMatch(true);
    }

    updateCellsState(id, matches);
  }

  return (
    <div
      id={id}
      className={styles.cell}
      data-status={disabled ? 'default' : status}
      data-pieces={pieces.length}
    >
      <div className={styles.message}>{showNoMatch && <p>no match</p>}</div>
      <button className={styles.btn} onClick={handleClick}>
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
              animate={{
                scale: [0, 1.5, 1],
                rotate: [180, 360, 360],
                transition: {
                  duration: 2,
                  delay: i * 0.3,
                  times: [0, 0.25, 0.5],
                },
              }}
              exit={{
                scale: [1, 1.5, 0],
                rotate: [0, 0, 0],
                transition: {
                  duration: 1,
                  delay: i * 0.15,
                  times: [0, 0.25, 0.5],
                },
              }}
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
