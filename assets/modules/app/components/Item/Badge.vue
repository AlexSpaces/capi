<template>
    <Badge :title="instance.server._id">
        {{ instance.server.name }}
        <a :href="'//' + instance.server.host + ':' + instance.port" target="_blank">
            {{ instance.name }}
        </a>
    </Badge>
</template>

<script setup>
import Badge from "../../../ui/components/elements/Badge.vue";
import { inject, ref, onMounted } from "vue";

import { getUrl } from "./parameters";

defineProps({
    instance: Object,
});
</script>
