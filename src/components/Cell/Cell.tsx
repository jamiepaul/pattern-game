import VisuallyHidden from '../VisuallyHidden';
import styles from './Cell.module.css';

type CellProps = {
  id: string;
  isPrevActive: boolean;
  isActive: boolean;
  setActive: (id: string, pieces: string[]) => void;
  pieces: string[];
};

type CellStatus = 'default' | 'previous' | 'active';

function Cell({ id, isActive, setActive, isPrevActive, pieces }: CellProps) {
  let statusAttr: CellStatus = 'default';
  if (isActive) {
    statusAttr = 'active';
  } else if (isPrevActive) {
    statusAttr = 'previous';
  }

  return (
    <div
      id={id}
      className={styles.cell}
      data-status={statusAttr}
      data-pieces={pieces.length}
    >
      <button className={styles.btn} onClick={() => setActive(id, pieces)}>
        <VisuallyHidden>
          {`Select cell with pieces ${pieces.join(', ')}`}
        </VisuallyHidden>
      </button>
      <div className={styles.pieces}>
        {pieces.map((item) => (
          <div key={item} id={item} data-piece={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cell;
