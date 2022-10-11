<template>
    <div class="accordion-header">
        <slot name="button">
            <button ref="button" class="accordion-button" :class="{ collapsed }" type="button">
                {{ title }}
            </button>
        </slot>
    </div>
</template>

<script>
import Utils from "../../services/utils";

export default {
    props: {
        target: {
            type: String,
            required: true,
        },

        collapsed: {
            type: Boolean,
            default: true,
        },

        title: String,
    },

    mounted() {
        const button = Utils.getRef(this, 'button');
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', `#${this.target}`);
    }
}
</script>
