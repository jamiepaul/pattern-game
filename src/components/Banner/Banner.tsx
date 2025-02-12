import { GameStatus } from '@/globals';
import styles from './Banner.module.css';
import { motion } from 'motion/react';

type BannerProps = {
  status: GameStatus;
  longestStreak: number;
  resetGame: () => void;
};

function Banner({ status, longestStreak, resetGame }: BannerProps) {
  const isWon = status === 'won';
  return (
    <motion.aside
      className={`${styles.banner} ${isWon ? styles.won : ''}`}
      key="banner"
      style={{ x: '-50%' }}
      initial={{ y: '-100%' }}
      animate={{
        y: '-1%',
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          restDelta: 0.01,
        },
      }}
      exit={{
        y: '-100%',
        transition: {
          type: 'spring',
          stiffness: 900,
          damping: 50,
        },
      }}
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>{isWon ? 'Flawless!' : 'Almost!'}</h2>
        <p>
          {isWon
            ? "You're unstoppable. A modern-day genius. What can't you do?"
            : 'Well, that was unsatisfying. Shake it off. I believe in you.'}
        </p>
        <p>
          Longest streak: <strong>{longestStreak}</strong>
        </p>
        <button className={styles.btn} onClick={resetGame}>
          Play again
        </button>
      </div>
    </motion.aside>
  );
}

export default Banner;
