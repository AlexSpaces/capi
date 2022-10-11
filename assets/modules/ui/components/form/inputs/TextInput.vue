<template>
    <label class="form-label" v-if="settings.label && !nolabel" :for="name">
        {{ settings.label }}
    </label>
    <input
        class="form-control"
        type="text"

        :class="{ 'is-invalid': !valid }"

        :id="name"
        :value="_value"
        :required="settings.required"
        :placeholder="settings.placeholder"

        @input="event => _value = event.target.value"
        @change="onInputChanged"
        @keyup="onInputSubmitted"
    >
    <div v-if="!valid" class="invalid-feedback">{{ error }}</div>
</template>

<script>
import Input from './Input.vue';

export default {
    ...Input
}
</script>
