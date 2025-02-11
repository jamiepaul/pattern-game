import styles from './Stats.module.css';

type StatsProps = {
  streak: number;
  longestStreak: number;
};

function Stats({ streak, longestStreak }: StatsProps) {
  return (
    <div className={styles.stats}>
      <dl>
        <div className={styles.stat}>
          <dt>Streak:</dt>
          <dd>{streak}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Longest Streak:</dt>
          <dd>{longestStreak}</dd>
        </div>
      </dl>
    </div>
  );
}

export default Stats;
