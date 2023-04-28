<template>
  <ul class="list">
    <label for="marked" />
    <input
      id="marked"
      type="checkbox"
      name="marked"
    >
    <li class="list__item">
      MarkRead
    </li>
    <li class="list__item">
      MarkUnread
    </li>
    <li class="list__item">
      Archived
    </li>
  </ul>
</template>

<script>
    export default {
        name: "ActionList",
        props: {
            email: {
                type: Object,
                required: true,
            },
        },
    };
</script>
