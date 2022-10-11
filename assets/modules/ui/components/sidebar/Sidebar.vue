<template>
    <nav class="sidebar" :class="{ show }">
        <div class="sidebar-container">
            <Button level="link" class="sidebar-close-button" @click="toggle">
                <Icon type="light" icon="times"></Icon>
            </Button>
            <slot></slot>
        </div>
    </nav>
</template>

<script>
import Button from "../elements/Button.vue";
import Icon from "../elements/Icon.vue";
export default {
    components: {
        Icon,
        Button
    },

    data() {
        return {
            show: false,
        }
    },

    inject: ['emitter'],

    mounted() {
        this.emitter.on('sidebar:toggle', () => this.toggle());
        this.$el.querySelectorAll('a').forEach(el => {
            el.addEventListener('click', () => this.close());
        });
    },

    methods: {
        toggle() {
            this.show = !this.show;
        },

        close() {
            if (this.show) {
                this.show = false;
            }
        }
    }
}
</script>
