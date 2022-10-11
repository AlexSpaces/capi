<template>
    <Modal :id="modalId('show')" :title="$t('show_resource')">
        <template v-if="item" #body="{ success }">
            <p v-if="error" class="alert alert-danger">[{{ error.code }}] {{ error.message }}</p>

            <table class="table table-hover mt-4">
                <tbody>
                    <tr>
                        <td>{{ $t('name') }}</td>
                        <td>{{ item.name }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('type') }}</td>
                        <td>{{ item.type }}</td>
                    </tr>
                    <tr>
                        <td>{{ $t('created_at') }}</td>
                        <td><Date :date="item.createdAt"/></td>
                    </tr>
                    <tr>
                        <td>{{ $t('edited_at') }}</td>
                        <td><Date :date="item.updatedAt"/></td>
                    </tr>
                </tbody>
            </table>
        </template>

        <template #footer="{ close }">
            <Button level="secondary" @click="close()">{{ $t('close') }}</Button>
        </template>
    </Modal>
</template>

<script setup>
import Modal from "../../../ui/components/elements/Modal.vue";
import Button from "../../../ui/components/elements/Button.vue";
import Icon from "../../../ui/components/elements/Icon.vue";
import Date from "../../../ui/components/elements/Date.vue";

import { eventName, modalId } from './parameters';
import { inject, ref, onMounted } from "vue";

const repository = inject('repository');
const emitter = inject('emitter');

const item = ref({});
const error = ref();

onMounted(() => {
    emitter.on(eventName('show'), resource => item.value = resource);
});
</script>
