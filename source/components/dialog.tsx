import { useAtomValue } from 'jotai';
import { dialogAtom } from '../modules/dialog';

export function Dialog() {
    const dialog = useAtomValue(dialogAtom);

    if (!dialog) {
        return null;
    }

    return (
        <>
            <div id="DialogOverlay"></div>
            <div id="Dialog">
                <div id="DialogTitle">{dialog.title}</div>
                <div id="DialogBody">{dialog.body}</div>
                <hr />
                <div>
                    {dialog.buttons.map((button, index) => (
                        <button key={index} onClick={button.action}>
                            {button.text}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
