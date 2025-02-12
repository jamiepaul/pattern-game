import { useEffect, useState } from 'react';
import { produce } from 'immer';
import { GRID_CELLS } from '@/constants';
import { createCells } from '@/helpers/game.helpers';
import { GameStatus, GameCell } from '@/globals';
import Cell from '@components/Cell';
import styles from './Game.module.css';
import Banner from '../Banner';
import Stats from '../Stats';
import { AnimatePresence, motion } from 'motion/react';

const MotionBanner = motion.create(Banner);

// Create new game cells
const initialCells = createCells(GRID_CELLS);

function Game() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('running');
  const [noMatchCount, setNoMatchCount] = useState(0);
  const [streak, setStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [cells, setCells] = useState<GameCell[]>(initialCells);

  useEffect(() => {
    const allEmpty = cells.every((cell) => cell.pieces.length === 0);
    if (!allEmpty) {
      return;
    }

    setGameStatus(noMatchCount === 0 ? 'won' : 'complete');
  }, [cells, noMatchCount]);

  const handleRestart = () => {
    const newCells = createCells(GRID_CELLS);
    setCells(newCells);
    setGameStatus('running');
    setNoMatchCount(0);
    setStreak(0);
    setLongestStreak(0);
  };

  const removeMatchingPieces = (
    activeCell: GameCell,
    nextCell: GameCell,
    matches: string[],
  ) => {
    matches.forEach((pieceId) => {
      activeCell.pieces = activeCell.pieces.filter((item) => item !== pieceId);
      nextCell.pieces = nextCell.pieces.filter((item) => item !== pieceId);
    });
  };

  const resetCellStatuses = (
    prevActiveCell: GameCell | undefined,
    activeCell?: GameCell | undefined,
  ) => {
    if (prevActiveCell) {
      prevActiveCell.status = 'default';
    }
    if (activeCell) {
      activeCell.status = 'default';
    }
  };

  const updateCellStatuses = (
    emptyCell: GameCell | undefined,
    activeCell: GameCell | undefined,
    nextCell: GameCell,
  ) => {
    if (emptyCell) {
      emptyCell.status = 'default';
    }
    if (activeCell) {
      activeCell.status = nextCell.pieces.length > 0 ? 'previous' : 'default';
    }
    nextCell.status = nextCell.pieces.length > 0 ? 'active' : 'empty';
  };

  const updateCounts = (hasMatches: boolean) => {
    if (!hasMatches) {
      setNoMatchCount((c) => c + 1);
      setStreak(0);
      return;
    }

    setLongestStreak((ls) => {
      if (ls > streak) {
        return ls;
      } else {
        return ls + 1;
      }
    });
    setStreak((s) => s + 1);
  };

  const updateCellsState = (id: string, matches?: string[]) => {
    if (matches) {
      updateCounts(matches.length > 0);
    }

    setCells(
      produce(cells, (draft) => {
        const nextCell = draft.find((item) => item.id === id)!;
        const activeCell = draft.find((item) => item.status === 'active');
        const prevActiveCell = draft.find((item) => item.status === 'previous');
        const emptyCell = draft.find((item) => item.status === 'empty');

        // zero matches
        if (matches && matches.length === 0) {
          resetCellStatuses(prevActiveCell, activeCell);
        }

        // has matches
        if (matches && matches.length > 0) {
          removeMatchingPieces(activeCell!, nextCell!, matches);
          resetCellStatuses(prevActiveCell);
          updateCellStatuses(emptyCell, activeCell, nextCell);
        }

        // comparison hasn't happened yet
        if (typeof matches === 'undefined') {
          updateCellStatuses(emptyCell, activeCell, nextCell);
        }
      }),
    );
  };

  return (
    <>
      <section className={styles.grid}>
        {cells.map(({ id, status, pieces }) => {
          return (
            <Cell
              key={id}
              id={id}
              status={status}
              disabled={gameStatus !== 'running'}
              pieces={pieces}
              previous={cells.find(
                (cell: GameCell) => cell.status === 'active',
              )}
              updateCellsState={updateCellsState}
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
            resetGame={handleRestart}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Game;
