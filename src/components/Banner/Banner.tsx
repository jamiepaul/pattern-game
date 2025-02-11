import { GameStatus } from '@/globals';
import styles from './Banner.module.css';

type BannerProps = {
  status: GameStatus;
  longestStreak: number;
  resetGame: () => void;
};

function Banner({ status, longestStreak, resetGame }: BannerProps) {
  const isWon = status === 'won';
  return (
    <aside className={`${styles.banner} ${isWon ? styles.won : ''}`}>
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
    </aside>
  );
}

export default Banner;
