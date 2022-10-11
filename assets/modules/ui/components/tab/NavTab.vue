<template>
    <ul ref="tab" class="nav" :class="{ 'nav-tabs': type === 'tabs', 'nav-pills': type === 'pills' }" role="tablist">
        <slot></slot>
    </ul>
</template>

<script>
import Utils from "../../services/utils";

export default {
    props: {
        type: {
            type: String,
            default: 'tabs',

            validator(value) {
                return ['tabs', 'pills'].includes(value);
            }
        }
    },

    mounted() {
        const tab = Utils.getRef(this, 'tab');
        Array.from(tab.querySelectorAll('button')).forEach(triggerEl => {
            const tabTrigger = new bootstrap.Tab(triggerEl)

            triggerEl.addEventListener('click', event => {
                event.preventDefault()
                tabTrigger.show()
            });
        });
    }
}
</script>
