<template>
    <label class="form-label" v-if="settings.label && !nolabel" :for="name">
        {{ settings.label }}
    </label>
    <select
        class="form-select"

        :class="{ 'is-invalid': !valid }"

        :id="name"
        :multiple="settings.multiple"
        :required="settings.required"

        @input="event => _value = event.target.value"
        @change="onInputChanged"
    >
        <option v-if="!settings.multiple" value="">{{ $t('choose_one') }}</option>
        <option
            v-for="(option, key) in settings.values || {}"
            :value="key"
            :selected="value == key"
        >
            {{ option }}
        </option>
    </select>
    <div v-if="!valid" class="invalid-feedback">{{ error }}</div>
</template>

<script>
import Input from './Input.vue';

export default {
    ...Input,
};
</script>
