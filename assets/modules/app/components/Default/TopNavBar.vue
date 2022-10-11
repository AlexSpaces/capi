<template>
    <TopNavbar>
        <Button class="ms-0 sidebar-lg-toggle" outline level="secondary" @click="toggleSidebar">
            <Icon icon="bars"></Icon>
        </Button>
        <slot></slot>
    </TopNavbar>
</template>

<script setup>
import TopNavbar from "../../../ui/components/navbar/TopNavbar.vue";
import Button from "../../../ui/components/elements/Button.vue";
import Icon from "../../../ui/components/elements/Icon.vue";
// import AuthNav from "../../../auth/components/AuthNav.vue";

import { inject } from "vue";

const emitter = inject('emitter');

const toggleSidebar = () => emitter.emit('sidebar:toggle');
</script>
