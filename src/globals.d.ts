export type TypeCell = {
  id: string;
  pieces: string[];
  isActive: boolean;
  isPrevious: boolean;
  isLastEmptied?: boolean;
};

export type CellStatus = 'default' | 'active' | 'empty';
