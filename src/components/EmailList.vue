<template>
  <div class="emails-page">
    <header class="emails-page__header header">
      <h2 class="header__title">
        Emails
      </h2>
      <p class="header__info">
        {{ filteredEmails.length }} messages
      </p>
    </header>
    <div class="emails-page__tab tab">
      <button
        class="button button--violet tab__button"
        @click="selectScreen('inbox')"
      >
        Inbox
      </button>
      <button
        class="button button--violet tab__button"
        @click="selectScreen('archived')"
      >
        Archived Emails
      </button>
    </div>
    <div class="list-wrapper">
      <ActionList :emails="filteredEmails" />
    </div>

    <ul
      v-if="filteredEmails.length > 0"
      class="emails-page__email-list email-list"
    >
      <li
        v-for="email in filteredEmails"
        :key="email.id"
        class="email-list__item"
        :class="{'email-list__item--active': email.read}"
      >
        <div class="email-item">
          <div class="email-item__header">
            <label for="checkbox" />
            <input
              id="checkbox"
              type="checkbox"
              name="checkbox"
              :checked="archivedEmails.selected.has(email)"
              @click="archivedEmails.toggle(email)"
            >
          </div>
          <div class="email-item__body email-body">
            <div
              class="email-body__title"
              @click="openEmail(email)"
            >
              {{ email.subject }}
            </div>
            <time class="email-body__time">{{ email.time }}</time>
          </div>
        </div>
      </li>
    </ul>
    <p
      v-else
    >
      Inbox is empty
    </p>
  </div>

  <Modal
    v-if="openBody"
    @close-modal="openBody = null"
  >
    <template
      #modal-content
    >
      <EmailView
        :email="openBody"
      />
    </template>
  </Modal>
</template>

<script>
    import EmailEvents from "../services/EmailEvents.js";
    import useEmailSelection from "../helpers/useSelectionEmail.js";
    import {ref, computed, reactive} from "vue";
    import Modal from "./ModalComponent.vue";
    import EmailView from "./EmailView.vue";
    import ActionList from "./ActionList.vue";

    export default {
        name: "EmailList",
        components: {ActionList, EmailView, Modal},
        async setup() {
            const openBody = ref(null);
            const selectedTab = ref("inbox");
            const archivedEmails = useEmailSelection();
            let emails = reactive(await EmailEvents.getEmailsList());


            const sortableEmails = computed(() => emails.slice(0).sort((a, b) => a.id - b.id));

            const filteredEmails = computed(() => {
                if (selectedTab.value === "inbox") {
                    return sortableEmails.value.slice(0).filter(email => !email.archived);
                } else {
                    return sortableEmails.value.slice(0).filter(email => email.archived);
                }
            });

            //methods
            const openEmail = email => {
                openBody.value = email;
                updateEmail(email);
            };

            const updateEmail = email => {
                EmailEvents.putEmailsList(email.id, email);
            };

            const selectScreen = newScreen => {
                selectedTab.value = newScreen;
                archivedEmails.selected.clear();
            };


            return {
                filteredEmails,
                emails,
                openEmail,
                updateEmail,
                openBody,
                archivedEmails,
                selectedTab,
                selectScreen,
            };
        },

    };
</script>
