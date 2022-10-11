<template>
    <span :class="className" v-tooltip:500="title"><slot></slot></span>
</template>

<script>
export default {
    props: {
        level: {
            type: String,
            default: 'secondary',
        },
        pill: {
            type: Boolean,
            default: false,
        },
        title: String,
    },

    computed: {
        className() {
            return `badge bg-${this.level}${this.pill ? ' rounded-pill' : ''}`;
        }
    }
}
</script>
