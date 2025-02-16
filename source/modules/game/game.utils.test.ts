import { describe, expect, test } from 'vitest';

import { removeRandomElement } from './game.utils';

describe(removeRandomElement.name, () => {
    test('should remove one item', () => {
        const array = [1, 2, 3];
        const length = array.length;

        removeRandomElement(array);
        expect(array.length).toBe(length - 1);
    });
});
