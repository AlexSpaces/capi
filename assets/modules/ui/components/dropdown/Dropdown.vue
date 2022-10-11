<template>
    <div class="dropdown">
        <slot name="button">
            <Button class="dropdown-toggle" :level="level" :outline="outline">
                {{ title }}
            </Button>
        </slot>

        <ul :class="dropdownMenuClassName">
            <slot></slot>
        </ul>
    </div>
</template>
<script>
import Button from "../elements/Button.vue";
import { Dropdown } from 'bootstrap';

export default {
    components: {
        Button
    },

    props: {
        title: String,
        options: {
            type: Object,
            default: {},
        },
        direction: {
            type: String,
            default: 'end'
        },
        level: {
            type: String,
            default: 'light'
        },
        show: {
            type: Boolean,
            default: false,
        },
        outline: Boolean,
    },

    computed: {
        dropdownMenuClassName() {
            return `dropdown-menu dropdown-menu-${this.direction}${this.show ? ' show' : ''}`;
        }
    },

    mounted() {
        const button = this.$el.querySelector('.dropdown button');

        if (button) {
            button.setAttribute('data-bs-toggle', 'dropdown');
            new Dropdown(button, this.options);
        }
    },
}
</script>
