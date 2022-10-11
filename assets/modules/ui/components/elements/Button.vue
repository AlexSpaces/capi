<template>
    <button :type="type" :form="form" :class="className" :disabled="loading" v-tooltip:500="title">
        <Icon class="me-lg-2 me-1" v-if="hasLeftIcon" :icon="icon"/>
        <Icon class="me-lg-2 me-1" v-if="hasLeftIconLoading" icon="spinner" animation="pulse"/>
        <slot></slot>
        <Icon class="ms-lg-2 ms-1" v-if="hasRightIcon" :icon="icon"/>
        <Icon class="ms-lg-2 ms-1" v-if="hasRightIconLoading" icon="spinner" animation="pulse"/>
    </button>
</template>

<script>
import Icon from "./Icon.vue";

export default {
    components: {
        Icon
    },

    props: {
        icon: {
            type: String,
            default: null,
        },
        level: {
            type: String,
            default: 'primary',
        },
        type: {
            type: String,
            default: 'button',
        },
        size: {
            type: String,
            default: null,

            validator(value) {
                ['lg', 'sm'].includes(value);
            }
        },
        form: {
            type: String,
            default: null,
        },
        position: {
            type: String,
            default: 'left',

            validator(value) {
                return ['left', 'right'].includes(value);
            }
        },
        loading: {
            type: Boolean,
            default: false,
        },
        outline: {
            type: Boolean,
            default: false,
        },
        title: String,
    },

    computed: {
        hasLeftIcon () {
            return this.icon && this.position === 'left' && !this.loading;
        },

        hasRightIcon() {
            return this.icon && this.position === 'right' && !this.loading;
        },

        hasLeftIconLoading() {
            return this.icon && this.position === 'left' && this.loading;
        },

        hasRightIconLoading() {
            return this.icon && this.position === 'right' && this.loading;
        },

        className() {
            return `btn btn-${this.outline ? 'outline-' : ''}${this.level} ${this.getButtonSize()}`;
        },
    },

    methods: {
        getButtonSize() {
            if (this.size) {
                return `btn-${this.size}`;
            } else if (this.$xs() || this.$sm() || this.$md()) {
                return 'btn-sm';
            }

            return '';
        }
    }
}
</script>
