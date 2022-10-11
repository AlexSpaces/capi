<template>
    <TopNavbar/>

    <main class="container-fluid">
        <h2 class="mb-4">{{ $t('hello_world') }} <Emoji code="waving"></Emoji></h2>
    </main>
</template>

<script setup>
import TopNavbar from "../modules/app/components/Default/TopNavBar.vue";
import Emoji from "../modules/ui/components/elements/Emoji.vue";
</script>
