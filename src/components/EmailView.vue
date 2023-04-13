<template>
    <div class="email-view">
        <h2>{{email.subject}}</h2>
        <p>{{email.body}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            email: {
                type: Object,
                required: true,
            }
        },
        name: "EmailView",
        setup(props){}
    }
</script>
