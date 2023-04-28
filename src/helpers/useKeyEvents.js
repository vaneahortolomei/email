import {onBeforeUnmount} from "vue";

const useKeyDown = (keyGroup) => {
    
    const onKeyDown = (e) => {
        return keyGroup.find(k => {
            if (k.eKey === e.key) {
                k.eventMethod();
            }
        });
    };

    window.addEventListener("keydown", onKeyDown);

    onBeforeUnmount(() => {
        window.removeEventListener("keydown", onKeyDown);
    });
};

export default useKeyDown;
