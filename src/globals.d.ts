export type TypeCell = {
  id: string;
  status: 'default' | 'previous' | 'active' | 'empty';
  pieces: string[];
};

export type CellStatus = 'default' | 'previous' | 'active' | 'empty';
