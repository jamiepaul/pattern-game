import { GRID_CELLS } from '@/constants';
import { GameCells } from '@/globals';
import { createCells } from '@/helpers/game.helpers';
import { produce } from 'immer';
import { useState } from 'react';

export type DropResult = 'no_match' | 'all_match' | 'partial_match';

export default function useCellData() {
  const [cells, setCells] = useState<GameCells>(() => createCells(GRID_CELLS));

  function areAllEmpty(): boolean {
    return Object.values(cells).every((cell) => cell.length === 0);
  }

  function dropMatches(cellId1: string, cellId2: string): DropResult {
    const cell1 = cells[cellId1];
    const cell2 = cells[cellId2];

    const matches = cell1.filter((piece) => cell2.includes(piece));

    if (matches.length === 0) {
      return 'no_match';
    }

    const nextCells = produce(cells, (draftCells) => {
      draftCells[cellId1] = cell1.filter((piece) => !matches.includes(piece));
      draftCells[cellId2] = cell2.filter((piece) => !matches.includes(piece));
    });

    setCells(nextCells);
    return nextCells[cellId2].length === 0 ? 'all_match' : 'partial_match';
  }

  return {
    areAllEmpty,
    dropMatches,
    cells,
  };
}
