<template>
    <li class="nav-item">
        <button ref="button" class="nav-link" :class="{ active, disabled }"
            type="button"
            role="tab"
        >
            <slot></slot>
        </button>
    </li>
</template>

<script>
import Utils from "../../services/utils";

export default {
    props: {
        target: {
            type: String,
            required: true,
        },

        active: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    mounted() {
        const button = Utils.getRef(this, 'button');
        button.setAttribute('data-bs-toggle', 'tab');
        button.setAttribute('data-bs-target', `#${this.target}`);
    }
}
</script>
