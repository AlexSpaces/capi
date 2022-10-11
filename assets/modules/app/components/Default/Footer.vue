<template>
    <footer class="footer bg-white border-top">
        <div class="container-fluid py-lg-4 py-3 px-3 text-end">
            © {{ new Date().getFullYear() }} {{ projectName }}
            <span class="d-none d-md-inline">- kevinbalicot[at]gmail.com - all rights reserved</span>
        </div>
    </footer>
</template>

<script setup>
import { inject, computed } from "vue";

const config = inject('config');
const projectName = computed(() => config.name);
</script>
