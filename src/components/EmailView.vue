<template>
    <div class="email-view">
        <ul class="button-list">
            <li class="button-list__button">
                <button @click="archivedEmail(email)">{{email.archived ? 'Desarchived' : 'Archived'}}</button>
            </li>
            <li class="button-list__button">
                <button @click="readEmail(email)">{{email.read ? 'Unread' : 'Read'}}</button>
            </li>
            <li class="button-list__button">
                <button>New</button>
            </li>
            <li class="button-list__button">
                <button>Old</button>
            </li>
        </ul>
        <p>From: {{email.from}}</p>
        <h2>{{email.subject}}</h2>
        <p>{{email.body}}</p>
    </div>
</template>

<script>
    import EmailEvents from "../services/EmailEvents.js";
    export default {
        props: {
            email: {
                type: Object,
                required: true,
            }
        },
        name: "EmailView",
        setup(props){
            const readEmail = (email) => {
                email.read = !email.read;
                updateEmail(email);
            };

            const archivedEmail = (email) => {
                email.archived = !email.archived;
                updateEmail(email);
            };
            const updateEmail = (email) => {
                EmailEvents.putEmailsList(email.id, email);
            };

            return {
                readEmail,
                archivedEmail,
                updateEmail,
            }
        }
    }
</script>
