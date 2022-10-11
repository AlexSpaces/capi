<template>
    <li>
        <a v-if="href" class="dropdown-item" :class="{ disabled, active }" :href="href">
            <Icon class="me-2" v-if="icon" :icon="icon" :style="style"/><slot></slot>
        </a>
        <router-link v-if="!href" class="dropdown-item" :class="{ disabled, active }" :to="to">
            <Icon class="me-2" v-if="icon" :icon="icon" :style="style"/><slot></slot>
        </router-link>
    </li>
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
        disabled: Boolean,
        active: Boolean,
    },
}
</script>
