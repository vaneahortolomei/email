<template>
  <div class="container">
    <header>
      <h1>Inbox</h1>
    </header>
    <Suspense>
      <template #default>
        <EmailList />
      </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>
<script>
    import EmailList from "./components/EmailList.vue";

    export default {
        name: "App",
        components: {EmailList},
    };
</script>
