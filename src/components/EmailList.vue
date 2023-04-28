<template>
  <section style="margin-bottom: 100px">
    <header><h2>NewEmails</h2></header>
    <span>{{ filterArchivedEmails.length }} email/emails</span>
    <span>{{ archivedEmails.selected.size }} selected emails</span>
    <ul
      v-if="filterArchivedEmails.length > 0"
      class="list"
    >
      <li
        v-for="email in filterArchivedEmails"
        :key="email.id"
        class="list__item"
        :class="{'list__item--active': email.read}"
      >
        <div class="body-item">
          <div class="body-item__header">
            <span style="margin-right: 5px">{{ email.id }}</span>
            <label for="checkbox" />
            <input
              id="checkbox"
              type="checkbox"
              name="checkbox"
              :selected="archivedEmails.selected.has(email)"
              @click="archivedEmails.toggle(email)"
            >
          </div>
          <div class="body-item__body">
            <div @click="openEmail(email)">
              {{ email.subject }}
            </div>
            <span>{{ email.time }}</span>
          </div>
        </div>
      </li>
    </ul>
    <p
      v-else
      style="margin: 30px 0"
    >
      Inbox is empty
    </p>
  </section>

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

    export default {
        name: "EmailList",
        components: {EmailView, Modal},
        async setup() {
            const openBody = ref(null);
            let response = reactive(await EmailEvents.getEmailsList());


            const sortableEmails = computed(() => response.slice(0).sort((a, b) => a.id - b.id));
            const filterArchivedEmails = computed(() => sortableEmails.value.slice(0).filter(email => !email.archived));
            const filterDesarchivedEmails = computed(() => sortableEmails.value.slice(0).filter(email => email.archived));

            //methods
            const openEmail = (email) => {
                openBody.value = email;
                updateEmail(email);
            };

            const updateEmail = (email) => {
                EmailEvents.putEmailsList(email.id, email);
            };


            return {
                filterArchivedEmails,
                filterDesarchivedEmails,
                response,
                openEmail,
                updateEmail,
                openBody,
                archivedEmails: useEmailSelection(),
            };
        },

    };
</script>
