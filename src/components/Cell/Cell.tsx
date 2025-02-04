import styles from './Cell.module.css';

type CellProps = {
  id: string;
  isPrevActive: boolean;
  isActive: boolean;
  setActive: (id: string) => void;
};

type CellStatus = 'default' | 'previous' | 'active';

function Cell({ id, isActive, setActive, isPrevActive }: CellProps) {
  let statusAttr: CellStatus = 'default';
  if (isActive) {
    statusAttr = 'active';
  } else if (isPrevActive) {
    statusAttr = 'previous';
  }

  return (
    <div key={id} id={id} data-status={statusAttr} className={styles.cell}>
      <button
        className={styles.btn}
        onClick={() => {
          setActive(id);
        }}
      ></button>
      <div>game pieces</div>
    </div>
  );
}

export default Cell;
