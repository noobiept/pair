import { shuffle } from '@drk4/utilities';
import type { GridPosition, GridPositionId } from '../grid';
import { removeRandomElement } from '../../utilities';
import type { Config } from '../config';
import { IMAGES } from '../../constants';

/**
 * Start a new game.
 */
export function newGame(config: Config) {
    const columnCount = config.columns;
    const lineCount = config.lines;
    let imagesUsed = config.imagesUsed;
    const totalTiles = columnCount * lineCount;
    const totalPairs = totalTiles / 2;

    if (totalTiles % 2 !== 0) {
        throw new Error(
            `Total number of tiles needs to be an even number. -- columnCount: ${columnCount} / lineCount: ${lineCount} / total (column * line): ${totalTiles}`,
        );
    }

    // trying to use more images than possible (given the columns/lines combination)
    if (imagesUsed > totalPairs) {
        imagesUsed = totalPairs;
    }

    // create the tiles
    const pairsPerImage = Math.floor(totalPairs / imagesUsed);
    let extraPairs = totalPairs % imagesUsed;
    const imagesCopy = IMAGES.slice();
    const tiles: GridPosition[] = [];

    for (let a = 0; a < imagesUsed; a++) {
        const imageName = removeRandomElement(imagesCopy);

        for (let b = 0; b < pairsPerImage; b++) {
            // need to add a pair each time
            tiles.push(
                {
                    imageName,
                    id: crypto.randomUUID() as GridPositionId,
                },
                {
                    imageName,
                    id: crypto.randomUUID() as GridPositionId,
                },
            );
        }

        // add an extra pair until there are no more extra
        if (extraPairs > 0) {
            tiles.push(
                { imageName, id: crypto.randomUUID() as GridPositionId },
                { imageName, id: crypto.randomUUID() as GridPositionId },
            );
            extraPairs--;
        }
    }

    shuffle(tiles);

    const grid = [];
    for (let i = 0; i < lineCount; i++) {
        const row = [];
        for (let j = 0; j < columnCount; j++) {
            row.push(tiles[i * columnCount + j]);
        }
        grid.push(row);
    }

    return grid;
}
