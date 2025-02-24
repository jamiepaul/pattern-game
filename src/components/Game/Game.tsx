import { useState } from 'react';

import { GameStatus } from '@/globals';
import Cell from '@components/Cell';
import styles from './Game.module.css';
import Banner from '../Banner';
import Stats from '../Stats';
import { AnimatePresence, motion } from 'motion/react';
import useCellData from '@/hooks/useCellData';
import { useStreak } from '@/hooks/useStreak';
import { useActiveAndMatchCells } from '@/hooks/useActiveAndMatchCells';

const MotionBanner = motion.create(Banner);

function Game({ onReset }: { onReset: () => void }) {
  const [gameStatus, setGameStatus] = useState<GameStatus>('running');
  const [noMatchCount, setNoMatchCount] = useState(0);
  const { longestStreak, streak, resetStreak, incrementStreak } = useStreak();
  const { cells, dropMatches, areAllEmpty } = useCellData();

  const {
    activeCellId,
    matchCellId,
    matchCellStatus,
    activateCell,
    markNoMatch,
    markAllMatch,
    markPartialMatch,
  } = useActiveAndMatchCells();

  function handleClick(cellId: string) {
    if (activeCellId === cellId) {
      //do nothing if the same cell is clicked
      return;
    }

    if (activeCellId == null) {
      activateCell(cellId);
      return;
    }

    const nextMatchCellId = cellId;
    const dropResult = dropMatches(activeCellId, nextMatchCellId);

    if (dropResult === 'no_match') {
      markNoMatch(nextMatchCellId);
      setNoMatchCount(noMatchCount + 1);
      resetStreak();
      return;
    }

    if (dropResult === 'all_match') {
      markAllMatch(nextMatchCellId);
      incrementStreak();
      return;
    }

    if (dropResult === 'partial_match') {
      markPartialMatch(nextMatchCellId);
      incrementStreak();
    }
  }

  function getCellStatus(cellId: string) {
    if (gameStatus !== 'running') {
      return 'inactive';
    }
    if (activeCellId === cellId) {
      return 'active';
    }
    if (matchCellId === cellId && matchCellStatus !== null) {
      return matchCellStatus;
    }
    return 'default';
  }

  if (areAllEmpty() && gameStatus === 'running') {
    if (noMatchCount > 0) {
      setGameStatus('complete');
    } else {
      setGameStatus('won');
    }
  }

  return (
    <>
      <section className={styles.grid}>
        {Object.keys(cells).map((cellId) => {
          return (
            <Cell
              id={cellId}
              key={cellId}
              pieces={cells[cellId]}
              status={getCellStatus(cellId)}
              onClick={handleClick}
            />
          );
        })}
      </section>
      <Stats streak={streak} longestStreak={longestStreak} />
      <AnimatePresence>
        {gameStatus !== 'running' && (
          <MotionBanner
            status={gameStatus}
            longestStreak={longestStreak}
            resetGame={onReset}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Game;
