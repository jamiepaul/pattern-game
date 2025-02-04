import { v4 as uuidv4 } from 'uuid';

export const createCells = (length: number) => {
  // eslint-disable-next-line prefer-const
  let output = [];

  for (let i = 0; i < length; i += 1) {
    output.push({ id: uuidv4() });
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
