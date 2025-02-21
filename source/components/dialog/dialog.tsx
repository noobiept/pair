import { useAtomValue } from 'jotai';

import { dialogAtom } from '../../modules/dialog';
import styles from './dialog.module.css';

export function Dialog() {
    const dialog = useAtomValue(dialogAtom);

    if (!dialog) {
        return null;
    }

    return (
        <>
            <div id={styles.DialogOverlay}></div>
            <div id={styles.Dialog}>
                <div id={styles.DialogTitle}>{dialog.title}</div>
                <div id={styles.DialogBody}>{dialog.body}</div>
                <hr />
                <div className={styles.buttons}>
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
