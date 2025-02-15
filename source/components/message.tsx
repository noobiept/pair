import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { messageAtom } from '../modules/message';

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
        <div id="MessageContainer">
            <div className="message">{message}</div>
        </div>
    );
}
