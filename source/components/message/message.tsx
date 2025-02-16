import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { messageAtom } from '../../modules/message';
import styles from './message.module.css';

export function Message() {
    const [message, setMessage] = useAtom(messageAtom);

    useEffect(() => {
        if (!message) {
            return;
        }
        const clearMessage = () => {
            setMessage(undefined);
        };
        const id = window.setTimeout(clearMessage, 1000);

        return () => {
            window.clearTimeout(id);
        };
    }, [message, setMessage]);

    if (!message) {
        return null;
    }

    return (
        <div id={styles.MessageContainer}>
            <div className={styles.message}>{message}</div>
        </div>
    );
}
