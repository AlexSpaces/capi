<template>
    <a href="#" class="sidebar-item">
        <Icon v-if="icon" :icon="icon" :style="style"/><span class="sidebar-content"><slot></slot></span>
    </a>
</template>

<script>
import Icon from "../elements/Icon.vue";

export default {
    components: {
        Icon
    },
    props: {
        icon: {
            type: String,
            default: null,
        },
        style: {
            type: String,
            default: 'light',
        },
    },
}
</script>
