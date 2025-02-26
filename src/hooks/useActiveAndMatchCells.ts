import { MatchCellStatus } from '@/globals';
import { useState } from 'react';

export function useActiveAndMatchCells() {
  const [activeCellId, setActiveCellId] = useState<string | null>(null);
  const [matchCellId, setMatchCellId] = useState<string | null>(null);
  const [matchCellStatus, setMatchCellStatus] =
    useState<MatchCellStatus | null>(null);

  function activateCell(cellId: string) {
    setActiveCellId(cellId);
    setMatchCellId(null);
    setMatchCellStatus(null);
  }

  function markNoMatch(cellId: string) {
    setActiveCellId(null);
    setMatchCellId(cellId);
    setMatchCellStatus('no_match');
  }

  function markAllMatch(cellId: string) {
    setActiveCellId(null);
    setMatchCellStatus('all_match');
    setMatchCellId(cellId);
  }

  function markPartialMatch(cellId: string) {
    activateCell(cellId);
  }

  return {
    activeCellId,
    matchCellId,
    matchCellStatus,
    activateCell,
    markNoMatch,
    markAllMatch,
    markPartialMatch,
  };
}
