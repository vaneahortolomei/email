<template>
    <section style="margin-bottom: 100px">
        <header><h2>NewEmails</h2></header>
        <span>{{filterArchivedEmails.length}} email/emails</span>
        <ul v-if="filterArchivedEmails.length > 0" class="list">
            <li class="list__item"
                v-for="email in filterArchivedEmails"
                :key="email.id"
                :class="{'list__item--active': email.read}"
                @click="openEmail(email)"
            >

                <label for="checkbox"/>
                <input type="checkbox" name="checkbox" id="checkbox" :checked="email.read"/>

                <p>{{email.from}}</p>
                <div>{{email.subject}}</div>
                <span>{{email.time}}</span>
                <span>{{email.id}}</span>
                <button @click="archivedEmail(email)">Archived</button>
            </li>
        </ul>
        <p v-else style="margin: 30px 0">Inbox is empty</p>
    </section>

    <section>
        <header><h2>ArchivedEmails</h2></header>
        <span>{{filterDesarchivedEmails.length}} email/emails</span>
        <ul v-if="filterDesarchivedEmails.length > 0" class="list">
            <li class="list__item"
                v-for="email in filterDesarchivedEmails"
                :key="email.id"
                :class="{'list__item--active': email.read}"
                @click="openEmail(email)"
            >

                <label for="checkbox1"/>
                <input type="checkbox" name="checkbox" id="checkbox1" :checked="email.read"/>

                <p>{{email.from}}</p>
                <div>{{email.subject}}</div>
                <span>{{email.time}}</span>
                <span>{{email.id}}</span>
                <button @click="desarchivedEmail(email)">Desarchived</button>
            </li>
        </ul>
        <p v-else style="margin: 30px 0">Inbox is empty</p>
    </section>

    <Modal v-if="openBody" @closeModal="openBody = null">
        <template #modal-content>
            <EmailView :email="openBody"/>
        </template>
    </Modal>
</template>

<script>
    import axios from "axios";
    import EmailEvents from "../services/EmailEvents.js";
    import {ref, computed, watch, watchEffect, onMounted, reactive} from 'vue';
    import Modal from "./Modal.vue";
    import EmailView from "./EmailView.vue";

    export default {
        name: "EmailList",
        components: {EmailView, Modal},
        async setup() {
            const openBody = ref(null);
            let response = await EmailEvents.getEmailsList();
            const filterArchivedEmails = computed(() => response.filter(email => !email.archived));
            const filterDesarchivedEmails = computed(() => response.filter(email => email.archived));

            //methods
            const data = (email) => {
               EmailEvents.putEmailsList(email.id, email);
               // window.location.reload();
            };

            const archivedEmail = (email) => {
                email.archived = true;
                data(email)
            };

            const desarchivedEmail = (email) => {
                email.archived = false;
                data(email)
            };

            const openEmail = (email) => {
                // email.read = !email.read;
                openBody.value = email;
                data(email)
            };

            return {
                archivedEmail,
                filterArchivedEmails,
                filterDesarchivedEmails,
                response,
                desarchivedEmail,
                openEmail,
                data,
                openBody
            }
        },

    }
</script>
