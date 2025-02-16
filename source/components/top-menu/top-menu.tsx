import { useAtomValue } from 'jotai';

import { configAtom } from '../../modules/config';
import { guessesCountAtom } from '../../modules/game';
import { getKey, highScoreAtom } from '../../modules/high-score';
import styles from './top-menu.module.css';

export function TopMenu() {
    const config = useAtomValue(configAtom);
    const highScore = useAtomValue(highScoreAtom(getKey(config)));
    const guesses = useAtomValue(guessesCountAtom);

    return (
        <div id={styles.GameValues}>
            <div className={styles.row}>
                <span>High-score:</span>
                <span id="HighScore" className={styles.value}>
                    {highScore ? `${highScore}%` : '--'}
                </span>
            </div>

            <div className={styles.row}>
                <span>Guesses:</span>
                <span id="GuessesCount" className={styles.value}>
                    {guesses}
                </span>
            </div>
        </div>
    );
}
