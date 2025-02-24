import { useState } from 'react';

import { GameStatus, MatchCellStatus } from '@/globals';
import Cell from '@components/Cell';
import styles from './Game.module.css';
import Banner from '../Banner';
import Stats from '../Stats';
import { AnimatePresence, motion } from 'motion/react';
import useCellData from '@/hooks/useCellData';

const MotionBanner = motion.create(Banner);

function Game({ onReset }: { onReset: () => void }) {
  const [gameStatus, setGameStatus] = useState<GameStatus>('running');
  const [noMatchCount, setNoMatchCount] = useState(0);
  const [streak, setStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const { cells, dropMatches, areAllEmpty } = useCellData();
  const [activeCellId, setActiveCellId] = useState<string | null>(null);
  const [matchCellId, setMatchCellId] = useState<string | null>(null);
  const [matchCellStatus, setMatchCellStatus] =
    useState<MatchCellStatus | null>(null);

  if (areAllEmpty() && gameStatus === 'running') {
    if (noMatchCount > 0) {
      setGameStatus('complete');
    } else {
      setGameStatus('won');
    }
  }
  function handleClick(cellId: string) {
    if (activeCellId === cellId) {
      //do nothing if the same cell is clicked
      return;
    }

    if (activeCellId == null) {
      setActiveCellId(cellId);
      setMatchCellId(null);
      setMatchCellStatus(null);
      return;
    }

    const nextMatchCellId = cellId;
    setMatchCellId(nextMatchCellId);
    const dropResult = dropMatches(activeCellId, nextMatchCellId);

    if (dropResult === 'no_match') {
      setActiveCellId(null);
      setMatchCellId(nextMatchCellId);
      setMatchCellStatus('no_match');
      setNoMatchCount(noMatchCount + 1);
      setStreak(0);
      return;
    }

    if (dropResult === 'all_match') {
      setMatchCellStatus('all_match');
      setActiveCellId(null);

      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > longestStreak) {
        setLongestStreak(nextStreak);
      }
      return;
    }

    if (dropResult === 'partial_match') {
      setActiveCellId(nextMatchCellId);
      setMatchCellId(null);
      setMatchCellStatus(null);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > longestStreak) {
        setLongestStreak(nextStreak);
      }
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
