import { v4 as uuidv4 } from 'uuid';
import { GameCell } from '@/globals';
import { random } from '@/utils';
import { GAME_SET } from '@/constants';

export const getMatches = (
  prevPieces: string[],
  activePieces: string[],
): string[] => {
  const matching: string[] = [];

  prevPieces.forEach((item) => {
    if (activePieces.includes(item)) {
      matching.push(item);
    }
  });

  return matching;
};

export const createCells = (amountOfCells: number): GameCell[] => {
  const output = [];
  const gamePieces = getGamePieces(amountOfCells);

  for (let i = 0; i < amountOfCells; i += 1) {
    output.push({
      id: uuidv4(),
      status: 'default' as const,
      pieces: gamePieces[i],
    });
  }

  return output;
};

/**
 * Generate an array of game pieces with nested arrays for each layer
 */
export const getGamePieces = (amountOfCells: number) => {
  const cellPieces = [];
  // TODO: dynamically get amount of layers or loop through later?
  // Randomized layer pieces to distribute
  const layerAPieces = getLayerPieces(amountOfCells, GAME_SET[0]);
  const layerBPieces = getLayerPieces(amountOfCells, GAME_SET[1]);
  const layerCPieces = getLayerPieces(amountOfCells, GAME_SET[2]);

  for (let i = 0; i < amountOfCells; i += 1) {
    const aPiece = layerAPieces[i];
    const bPiece = layerBPieces[i];
    const cPiece = layerCPieces[i];

    cellPieces.push([aPiece, bPiece, cPiece]);
  }

  return cellPieces;
};

/**
 * Generate an array of layer pieces, where each piece has a match
 */
export const getLayerPieces = (amountOfCells: number, options: string[]) => {
  const pairs = [];
  const amountOfPairs = amountOfCells / 2;

  // Randomly select layer pieces
  for (let i = 0; i < amountOfPairs; i += 1) {
    const piece = options[random(0, options.length)];
    pairs.push(piece);
  }

  // Double the array length to match the length of grid cells
  // Duplicate pieces to create pairs, so the game is solvable
  const pieces = pairs.flatMap((item) => [item, item]);
  // Shuffle the order of array elements randomly
  pieces.sort(() => Math.random() - 0.5);

  return pieces;
};
