import { v4 as uuidv4 } from 'uuid';
import { TypeCell } from './globals';

const gamePieces = [
  ['A1', 'B1'], // Cell 1
  ['A1', 'B2'], // Cell 2
  ['A1', 'B2'], // Cell 3
  ['A2', 'B2'], // Cell 4
  ['A1', 'B1'], // Cell 5
  ['A2', 'B1'], // Cell 6
  ['A1', 'B1'], // Cell 7
  ['A2', 'B2'], // Cell 8
  ['A1', 'B1'], // Cell 9
  ['A2', 'B2'], // Cell 10
  ['A1', 'B1'], // Cell 11
  ['A2', 'B2'], // Cell 12
];

export const createCells = (length: number): TypeCell[] => {
  // eslint-disable-next-line prefer-const
  let output = [];

  for (let i = 0; i < length; i += 1) {
    output.push({
      id: uuidv4(),
      pieces: gamePieces[i],
      isActive: false,
      isPrevious: false,
    });
  }

  return output;
};

export const range = (
  start: number,
  end: number | undefined = undefined,
  step: number = 1,
): number[] => {
  // eslint-disable-next-line prefer-const
  let output = [];

  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
};

export const getMatches = (
  prevActive: TypeCell | undefined,
  active: TypeCell | undefined,
): string[] => {
  const matching: string[] = [];

  if (!prevActive || !active) {
    console.log('two cells must be selected before comparison');
    return matching;
  }

  prevActive?.pieces.forEach((item) => {
    if (active?.pieces.includes(item)) {
      matching.push(item);
    }
  });

  return matching;
};
