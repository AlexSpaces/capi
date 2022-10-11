<template>
    <a v-if="href" class="sidebar-item-action" active-class="active" :href="href">
        <Icon v-if="icon" :icon="icon" :style="style"/><span class="sidebar-content"><slot></slot></span>
    </a>
    <router-link v-if="!href" class="sidebar-item-action" active-class="active" :to="to">
        <Icon v-if="icon" :icon="icon" :style="style"/><span class="sidebar-content"><slot></slot></span>
    </router-link>
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
        to: {
            type: [Object, String],
            default: '/',
        },
        href: String,
    },
}
</script>
