import {reactive} from 'vue';

let selected = reactive(new Set());

export const useEmailSelection = () => {

    let toggle = (email) => {
        if (selected.has(email)) {
            selected.delete(email)
        } else {
            selected.add(email)
        }

        console.log(selected.size)
    };

    return {
        selected,
        toggle,
    }
};

export default useEmailSelection;
