<template>
    <div class="btn-group mr-1">
        <button class="btn btn-secondary" disabled>{{ options.name }}</button>

        <button v-if="options.value" class="btn btn-secondary" type="button"
            @click="onSelect"
        >
            {{ getLabelOf(options.value) }}
        </button>

        <button v-if="options.value" class="btn btn-secondary search-bar-button-remove" type="button"
            @click="onRemove"
        >
            <i class="fa fa-times"></i>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Object,
            default: {},
        }
    },

    emits: ['select', 'remove'],

    methods: {
        onSelect() {
            this.$emit('select', { token: this.options });
        },

        onRemove() {
            this.options.value = null;
            this.$emit('remove', { token: this.options });
        },

        getLabelOf(item) {
            if (!item) {
                return null;
            }

            return item.label ? item.label : item;
        },
    },
}
</script>
