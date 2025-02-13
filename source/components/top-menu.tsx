import { useAtomValue } from 'jotai';
import { getKey, highScoreAtom } from '../modules/high-score';
import { configAtom } from '../modules/config';
import { guessesCountAtom } from '../modules/game';

export function TopMenu() {
    const config = useAtomValue(configAtom);
    const highScore = useAtomValue(highScoreAtom(getKey(config)));
    const guesses = useAtomValue(guessesCountAtom);

    return (
        <div id="GameValues">
            <div>
                <span>High-score:</span>
                <span id="HighScore" className="value">
                    {highScore}
                </span>
            </div>

            <div>
                <span>
                    <span>Guesses:</span>
                    <span id="GuessesCount" className="value">
                        {guesses}
                    </span>
                </span>
            </div>
        </div>
    );
}
