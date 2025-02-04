import styles from './Cell.module.css';

type CellProps = {
  id: string;
  isActive: boolean;
  setActiveCell: React.Dispatch<React.SetStateAction<string | null>>;
};

// TODO: Track active vs empty status if no game pieces left
// type CellStatus = 'default' | 'active' | 'empty';

function Cell({ id, isActive, setActiveCell }: CellProps) {
  // const [status, setStatus] = useState<CellStatus>('default');

  return (
    <div
      key={id}
      id={id}
      data-status={isActive ? 'active' : 'default'}
      className={styles.cell}
    >
      <button
        className={styles.btn}
        onClick={() => {
          setActiveCell(id);
        }}
      ></button>
      <div>game pieces</div>
    </div>
  );
}

export default Cell;
