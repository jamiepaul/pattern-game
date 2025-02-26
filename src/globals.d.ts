export type CellData = {
  id: string;
  pieces: []
}

export type ActiveCellStatus = "active";
export type MatchCellStatus = "no_match" | "all_match";

export type GameCells = { [key: string]: string[] };

export type CellStatus =
  | 'default'
  | ActiveCellStatus
  | MatchCellStatus
  | 'inactive';

export type GameStatus = 'running' | 'won' | 'complete';
