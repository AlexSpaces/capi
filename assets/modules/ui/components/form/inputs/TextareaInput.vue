<template>
    <label class="form-label" v-if="settings.label && !nolabel" :for="name">
        {{ settings.label }}
    </label>
    <textarea
        class="form-control"

        :class="{ 'is-invalid': !valid }"

        :id="name"
        :required="settings.required"
        :placeholder="settings.placeholder"

        @input="event => _value = event.target.value"
        @change="onInputChanged"
    >{{ value }}</textarea>
    <div v-if="!valid" class="invalid-feedback">{{ error }}</div>
</template>

<script>
import Input from './Input.vue';

export default {
    ...Input
}
</script>
