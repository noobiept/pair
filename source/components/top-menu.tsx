export function TopMenu() {
    return (
        <div id="GameValues">
            <div>
                High-score: <span id="HighScore" className="value"></span>
            </div>

            <div>
                <span>
                    Guesses:
                    <span id="GuessesCount" className="value">
                        0
                    </span>
                </span>
            </div>
        </div>
    );
}
