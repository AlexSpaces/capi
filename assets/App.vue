<template>
    <div class="viewport">
        <section class="d-flex flex-column flex-grow-1 h-screen overflow-y-auto">
            <main class="flex-grow-1">
                <router-view></router-view>
            </main>

            <Footer></Footer>
        </section>
    </div>
</template>

<script setup>
import Footer from "./modules/app/components/Default/Footer.vue";
</script>
