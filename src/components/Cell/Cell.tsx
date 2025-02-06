import { useEffect } from 'react';
import VisuallyHidden from '../VisuallyHidden';
import styles from './Cell.module.css';
import { TypeCell } from '@/globals';
import { getMatches } from '@/utils';

type CellProps = {
  id: string;
  isActive: boolean;
  setActive: (id: string, matches?: string[]) => void;
  pieces: string[];
  previous: TypeCell | undefined;
  resetCells: () => void;
};

function Cell({
  id,
  isActive,
  setActive,
  pieces,
  previous,
  resetCells,
}: CellProps) {
  // console.log('RENDER: Cell Component');

  useEffect(() => {
    // watch pieces - if length is reduced, show message
    // show message by injecting text, not w/ state
    // setShowMessage(true);
    // const timerId = setTimeout(() => {
    //   setShowMessage(false);
    // }, 2500);
    // return () => {
    //   clearTimeout(timerId);
    //   setShowMessage(false);
    // };
  }, []);

  function handleClick() {
    if (!previous) {
      // only one cell has been clicked
      // we need to update cells state to run comparison on next cell click
      setActive(id);
      return;
    }

    console.log(
      `COMPARING: Previous (${previous.pieces.join(', ')}) and Active (${pieces.join(', ')})`,
    );
    const matches = getMatches(previous.pieces, pieces);
    console.log(`Matches: ${matches.join(', ')}`);

    if (matches.length === 0) {
      // TODO: trigger "no match" message
      resetCells();
      return;
    }

    // if no matches, reset isActive & isPrevious properties
    // if matches, remove matching pieces
    setActive(id, matches);
  }

  return (
    <div
      id={id}
      className={styles.cell}
      data-status={isActive ? 'active' : 'default'}
      data-pieces={pieces.length}
    >
      <div className={styles.message}>{/* <p>no match</p> */}</div>
      <button className={styles.btn} onClick={handleClick}>
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
