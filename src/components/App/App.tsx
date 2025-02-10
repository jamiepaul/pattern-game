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
      <footer className={`container ${styles.footer}`}>
        <p>
          Icons by{' '}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
