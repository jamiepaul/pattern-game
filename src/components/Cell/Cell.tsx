import { useEffect, useState } from 'react';
import { CellStatus, GameCell } from '@/globals';
import { getMatches } from '@/helpers/game.helpers';
import VisuallyHidden from '../VisuallyHidden';
import styles from './Cell.module.css';

type CellProps = {
  id: string;
  status: CellStatus;
  pieces: string[];
  previous: GameCell | undefined;
  updateCellsState: (id: string, matches?: string[]) => void;
};

function Cell({ id, status, pieces, previous, updateCellsState }: CellProps) {
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
    // do nothing if same cell is clicked twice
    if (status === 'active') return;

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
      data-status={status}
      data-pieces={pieces.length}
    >
      <div className={styles.message}>{showNoMatch && <p>no match</p>}</div>
      <button className={styles.btn} onClick={handleClick}>
        <VisuallyHidden>
          {`Select cell with pieces ${pieces.join(', ')}`}
        </VisuallyHidden>
      </button>
      <div className={styles.pieces}>
        {pieces.map((pieceId) => (
          <div key={pieceId} data-piece={pieceId}>
            {pieceId}
          </div>
          // <svg key={pieceId} data-piece={pieceId}>
          //   <use xlinkHref={`/svg-sprite.svg#${pieceId}`} />
          // </svg>
        ))}
      </div>
    </div>
  );
}

export default Cell;
