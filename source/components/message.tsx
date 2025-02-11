import { useAtom } from 'jotai';
import { messageAtom } from '../modules/message';
import { useEffect } from 'react';

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
