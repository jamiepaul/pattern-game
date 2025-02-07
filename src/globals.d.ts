export type GameCell = {
  id: string;
  status: 'default' | 'previous' | 'active' | 'empty';
  pieces: string[];
};

export type CellStatus = 'default' | 'previous' | 'active' | 'empty';

export type GameStatus = 'running' | 'won' | 'complete';
