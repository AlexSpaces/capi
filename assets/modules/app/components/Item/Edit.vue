<template>
    <Modal :id="modalId('edit')" size="md" :title="modalTitle">
        <template #body="{ success }">
            <p v-if="error" class="alert alert-danger">{{ error }}</p>
            <Form ref="form" id="edit-form" :model="item" :parameters="parameters" @submit="formSubmitted($event, success)"/>
        </template>

        <template #footer="{ close }">
            <Button level="success" type="submit" :loading="loading" form="edit-form">
                {{ buttonTitle }}
            </Button>

            <Button level="secondary" @click="close()">{{ $t('cancel') }}</Button>
        </template>
    </Modal>
</template>

<script setup>
import Modal from "../../../ui/components/elements/Modal.vue";
import Button from "../../../ui/components/elements/Button.vue";
import Form from "../../../ui/components/form/Form.vue";

import { eventName, modalId, getUrl, createUrl, getForm } from './parameters';
import { inject, ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const repository = inject('repository');
const emitter = inject('emitter');

const parameters = reactive(getForm(t));
const item = ref({});
const loading = ref(false);
const error = ref(null);
const form = ref();

const buttonTitle = computed(() => item.value._id ? t('edit') : t('create'));
const modalTitle = computed(() => item.value._id ? t('edit_resource') : t('create_resource'));

onMounted(() => {
    emitter.on(eventName('edit'), resource => item.value = resource);
});

const formSubmitted = (data, success) => {
    error.value = null;
    loading.value = true;
    data.env = JSON.stringify(data.env);

    repository.post(data._id ? getUrl(data._id) : createUrl(), data, { 'Content-Type': 'application/json' })
        .then(() => success())
        .then(() => form.value.reset())
        .catch(({ code, message }) => error.value = `[${code}] ${message}`)
        .then(() => loading.value = false);
}
</script>
