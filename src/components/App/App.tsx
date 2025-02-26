import { MotionConfig } from 'motion/react';
import styles from './App.module.css';
import GameResetController from '../GameResetController';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <header className={`container ${styles.header}`}>
        <h1>Pattern Game</h1>
        <p>Match pieces to get the longest streak</p>
      </header>
      <main className="main container">
        <GameResetController />
      </main>
      <footer className={styles.footer}>
        <div className={`container ${styles.footerContainer}`}>
          <p>
            Created with ❤️ by{' '}
            <a target="_blank" href="https://jamiepaul.io">
              Jamie Paul
            </a>
          </p>
          <p>
            Icons by{' '}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </p>
        </div>
      </footer>
    </MotionConfig>
  );
}

export default App;
