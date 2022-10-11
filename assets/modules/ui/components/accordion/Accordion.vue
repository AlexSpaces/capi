<template>
    <div ref="accordion" class="accordion">
        <slot></slot>
    </div>
</template>

<script>
import { Collapse } from 'bootstrap';
import Utils from "../../services/utils";

export default {
    mounted() {
        const accordion = Utils.getRef(this, 'accordion');
        Array.from(accordion.querySelectorAll('.accordion-button')).forEach(el => {
            return new Collapse(el);
        });
    }
}
</script>
