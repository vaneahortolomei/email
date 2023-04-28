<template>
    <ul class="controls controls--email-controls">
        <label for="marked"/>
        <input
            id="marked"
            class="marker"
            type="checkbox"
            name="marked"
            :checked="allEmailsChecked"
            @click="useAction"
        >
        <li class="controls__item">
            <button class="button" @click="emailSelection.markRead()">
                ReadLetters({{readLettersLength.length}})
            </button>
        </li>
        <li class="controls__item">
            <button class="button" @click="emailSelection.markUnread()">
                UnreadLetters({{unreadLettersLength.length}})
            </button>
        </li>
        <li class="controls__item">
            <button class="button" @click="emailSelection.archived()">
                Archived
            </button>
        </li>
        <li class="controls__item">
            <button class="button" @click="emailSelection.desarchived()">
                Inbox
            </button>
        </li>
    </ul>
</template>

<script>
    import useEmailSelection from "../helpers/useSelectionEmail.js";
    import {computed} from "vue";

    export default {
        name: "ActionList",
        props: {
            emails: {
                type: Array,
                required: true,
            },
        },
        setup(props) {

            const data = props.emails;

            const emailSelection = useEmailSelection();
            const numberSelected = computed(() => emailSelection.selected.size);
            const emailLength = computed(() => data.length);
            const allEmailsChecked = computed(() => numberSelected.value === emailLength.value);

            const readLettersLength = computed(() => {
                return data.filter(item => {
                    return item.read;
                });
            });

            const unreadLettersLength = computed(() => {
                return data.filter(item => {
                    return !item.read;
                });
            });

            const useAction = () => {
                if (allEmailsChecked.value) {
                    emailSelection.clear();
                } else {
                    emailSelection.addMultiple(props.emails);
                }
            };

            return {
                data,
                emailSelection,
                emailLength,
                numberSelected,
                allEmailsChecked,
                useAction,
                readLettersLength,
                unreadLettersLength
            };
        },
    };
</script>
