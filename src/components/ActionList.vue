<template>
  <ul class="button-list">
    <label for="marked" />
    <input
      id="marked"
      class="marker"
      type="checkbox"
      name="marked"
      :checked="allEmailsChecked"
      @click="useAction"
    >
    <li class="button-list__button">
      <button @click="emailSelection.markRead()">
        MarkRead
      </button>
    </li>
    <li class="button-list__button">
      <button @click="emailSelection.markUnread()">
        MarkUnread
      </button>
    </li>
    <li class="button-list__button">
      <button @click="emailSelection.archived()">
        Archived
      </button>
    </li>
    <li class="button-list__button">
      <button @click="emailSelection.desarchived()">
        Desarchived
      </button>
    </li>
    <li class="button-list__button">
      <button @click="emailSelection.clear()">
        ClearCheckbox
      </button>
    </li>
  </ul>

  {{ emailLength }}
  {{ numberSelected }}
  {{ allEmailsChecked }}
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
            const emailSelection = useEmailSelection();
            const numberSelected = computed(() => emailSelection.selected.size);
            const emailLength = computed(() => props.emails.length);
            const allEmailsChecked = computed(() => numberSelected.value === emailLength.value);

            const useAction = () => {
                if (allEmailsChecked.value) {
                    emailSelection.clear();
                } else {
                    emailSelection.addMultiple(props.emails);
                }
            };

            return {
                emailSelection,
                emailLength,
                numberSelected,
                allEmailsChecked,
                useAction,
            };
        },
    };
</script>
