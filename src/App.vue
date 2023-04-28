<template>
    <div class="wrapper">
        <div class="content">
            <div class="main-page">
                <div class="main-page__menu">
                    <EmailMenu/>
                </div>
                <div class="main-page__list">
                    <Suspense>
                        <template #default>
                            <EmailList/>
                        </template>
                        <template #fallback>
                            Loading...
                        </template>
                    </Suspense>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import EmailList from "./components/EmailList.vue";
    import EmailMenu from "./components/EmailMenuComponent.vue";

    export default {
        name: "App",
        components: {EmailList, EmailMenu},
    };
</script>
