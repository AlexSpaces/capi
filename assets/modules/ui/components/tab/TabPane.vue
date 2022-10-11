<template>
    <div class="tab-pane fade" role="tabpanel" :class="{ active, show: active }">
        <slot></slot>
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
