import {reactive} from 'vue';
import EmailEvents from "../services/EmailEvents.js";

let selected = reactive(new Set());

export const useEmailSelection = () => {

    let toggle = (email) => {
        if (selected.has(email)) {
            selected.delete(email)
        } else {
            selected.add(email)
        }
    };

    const clear = () => {
        selected.clear();
    };

    const addMultiple = (newEmails) => {
        newEmails.forEach(email => {
            selected.add(email);
        })
    };

    const markRead = () => {
        selected.forEach(email => {
            email.read = true;
            updateEmail(email);
        })
    };
    const markUnread = () => {
        selected.forEach(email => {
            email.read = false;
            updateEmail(email);
        })
    };

    const archived = () => {
        selected.forEach(email => {
            email.archived = true;
            updateEmail(email);
        })
    };
    const desarchived = () => {
        selected.forEach(email => {
            email.archived = false;
            updateEmail(email);
        })
    };

    const updateEmail = (email) => {
        EmailEvents.putEmailsList(email.id, email).then(r => r);
    };

    return {
        selected,
        toggle,
        addMultiple,
        clear,
        markRead,
        markUnread,
        archived,
        desarchived
    }
};

export default useEmailSelection;
