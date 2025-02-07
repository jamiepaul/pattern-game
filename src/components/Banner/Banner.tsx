import { GameStatus } from '@/globals';
import styles from './Banner.module.css';

type BannerProps = {
  status: GameStatus;
};

function Banner({ status }: BannerProps) {
  const isWon = status === 'won';
  return (
    <aside className={`${styles.banner} ${isWon ? styles.won : ''}`}>
      <h2 className={styles.heading}>{isWon ? 'Flawless!' : 'Almost!'}</h2>
      <p className={styles.text}>
        {isWon
          ? "You're unstoppable. A modern-day genius. What can't you do?"
          : 'Well, that was unsatisfying. Shake it off. I believe in you.'}
      </p>
    </aside>
  );
}

export default Banner;
