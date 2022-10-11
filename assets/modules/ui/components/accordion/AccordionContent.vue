<template>
    <div class="accordion-collapse collapse" :class="{ show: active }">
        <div class="accordion-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: false,
        }
    }
}
</script>
