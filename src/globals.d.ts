export type TypeCell = {
  id: string;
  status: string;
  pieces: string[];
};

export type CellStatus = 'default' | 'previous' | 'active' | 'empty';
