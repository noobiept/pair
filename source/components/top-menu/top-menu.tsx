import { useAtomValue } from 'jotai';

import { guessesCountAtom } from '../../modules/game';
import { highScoreAtom } from '../../modules/high-score';
import styles from './top-menu.module.css';

export function TopMenu() {
    const highScore = useAtomValue(highScoreAtom);
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
