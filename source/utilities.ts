import { getRandomInt } from '@drk4/utilities';

/**
 * Remove a random element from the given array.
 */
export function removeRandomElement<T>(array: T[]): T {
    const position = getRandomInt(0, array.length - 1);

    return array.splice(position, 1)[0];
}

/**
 * Set a minimum width of the container so it doesn't ruin the grid as the view is resized.
 */
export function adjustContainerWidth(
    container: HTMLElement,
    columnCount: number,
    tileWidth: number
) {
    container.style.minWidth = columnCount * tileWidth + 'px';
}
