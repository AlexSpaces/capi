<template>
    <i :class="className"></i>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true,
        },
        style: {
            type: String,
            default: 'solid',
        },
        size: {
            type: Number,
            default: 1,
        },
        animation: {
            type: String,
            default: null
        }
    },

    computed: {
        className() {
            return `fa${this.style[0]} fa-${this.icon} fa-${this.size}x ${(this.animation ? 'fa-' + this.animation : '')}`;
        }
    }
}
</script>
