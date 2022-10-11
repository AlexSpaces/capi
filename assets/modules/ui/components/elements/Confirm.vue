<template>
    <Modal :options="{ backdrop: 'static', keyboard: false }">
        <template #header>
            <div class="modal-header">
                <h5 class="modal-title">{{ $t('confirm_action') }}</h5>
            </div>
        </template>

        <template #body>
            <slot></slot>
        </template>

        <template #footer="{ success, close }">
            <Button :level="level" @click="success">{{ $t('yes') }}</Button>
            <Button level="secondary" @click="close">{{ $t('no') }}</Button>
        </template>
    </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import Button from "./Button.vue";

export default {
    components: {
        Button,
        Modal
    },

    props: {
        level: {
            type: String,
            default: 'danger',
        }
    }
}
</script>
