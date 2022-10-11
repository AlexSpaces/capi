<template>
    <li>
        <button class="dropdown-item" :class="{ disabled, active }" type="button">
            <Icon class="me-2" v-if="icon" :icon="icon" :style="style"/><slot></slot>
        </button>
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
        disabled: Boolean,
        active: Boolean,
    },
}
</script>
