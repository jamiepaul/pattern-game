import Game from '../Game';
import styles from './App.module.css';

function App() {
  return (
    <>
      <header className={`container ${styles.header}`}>
        <h1>Patterns Game</h1>
      </header>
      <main className="main container">
        <Game />
      </main>
      <footer className={styles.footer}>
        <div className={`container ${styles.footerContainer}`}>
          <p>
            Created by{' '}
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
    </>
  );
}

export default App;
