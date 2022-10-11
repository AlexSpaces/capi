<template>
    <Confirm :id="modalId('delete')" @success="confirmed">
        <p class="mb-0">{{ $t('delete_resource') }} "{{ item.name }}".</p>
    </Confirm>
</template>

<script setup>
import Confirm from "../../../ui/components/elements/Confirm.vue";

import { eventName, modalId, deleteUrl } from './parameters';
import { inject, defineEmits, ref, onMounted } from "vue";

const emit = defineEmits(['success']);

const repository = inject('repository');
const emitter = inject('emitter');

const item = ref({});

onMounted(() => {
    emitter.on(eventName('delete'), resource => item.value = resource);
});

const confirmed = () => {
    if (item.value._id) {
        repository.delete(deleteUrl(item.value._id))
            .then(() => emit('success'));
    }
}
</script>
