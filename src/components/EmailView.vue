<template>
  <div class="email-view">
    <ul class="email-view__controls controls controls--modal-controls">
      <li class="controls__item">
        <button
          class="button"
          @click="archivedEmail(email)"
        >
          {{ email.archived ? 'Desarchived' : 'Archived' }}
        </button>
      </li>
      <li class="controls__item">
        <button
          class="button"
          @click="readEmail(email)"
        >
          {{ email.read ? 'Unread' : 'Read' }}
        </button>
      </li>
    </ul>
    <p class="email-view__email">
      <span class="email-view__option">From:</span> {{ email.from }}
    </p>
    <h2 class="email-view__subject">
      <span class="email-view__option">Subject:</span>{{ email.subject }}
    </h2>
    <p class="email-view__body">
      <span class="email-view__option">Body:</span>{{ email.body }}
    </p>
  </div>
</template>

<script>
    import EmailEvents from "../services/EmailEvents.js";
    export default {
        name: "EmailView",
        props: {
            email: {
                type: Object,
                required: true,
            },
        },
        setup(){
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
            };
        },
    };
</script>
