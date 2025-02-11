import { useAtom } from 'jotai';
import { dialogAtom } from '../modules/dialog';

export function Dialog() {
    const [dialog, setDialog] = useAtom(dialogAtom);

    if (!dialog) {
        return null;
    }

    return (
        <>
            <div id="DialogOverlay" className="hidden"></div>
            <div id="Dialog" className="hidden">
                <div id="DialogTitle"></div>
                <div id="DialogBody"></div>
                <hr />
                <button id="DialogRestart">Restart</button>
            </div>
        </>
    );
}
