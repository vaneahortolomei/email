<template>
    <ul class="list">
        <label for="marked"/>
        <input type="checkbox" id="marked" name="marked"/>
        <li class="list__item">MarkRead</li>
        <li class="list__item">MarkUnread</li>
        <li class="list__item">Archived</li>
    </ul>
</template>

<script>
    export default {
        props: {
            email: {
                type: Object,
                required: true,
            }
        },
        name: "ActionList",
        setup(props) {

        }
    }
</script>
