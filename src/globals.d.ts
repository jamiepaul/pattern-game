export type GameCell = {
  id: string;
  status: CellStatus;
  pieces: string[];
};

export type CellStatus =
  | 'default'
  | 'previous'
  | 'active'
  | 'empty'
  | 'inactive';

export type GameStatus = 'running' | 'won' | 'complete';
