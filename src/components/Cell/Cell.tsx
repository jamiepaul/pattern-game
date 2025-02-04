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
    <div id={id} data-status={statusAttr} className={styles.cell}>
      <button
        className={styles.btn}
        onClick={() => setActive(id, pieces)}
      ></button>
      <div className={styles.pieces}>
        <p>pieces</p>
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
