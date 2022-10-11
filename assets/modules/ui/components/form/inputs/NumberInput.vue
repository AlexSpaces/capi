<template>
    <label class="form-label" v-if="settings.label && !nolabel" :for="name">
        {{ settings.label }}
    </label>
    <input
        class="form-control"
        type="number"

        :class="{ 'is-invalid': !valid }"

        :id="name"
        :value="_value || settings.value"
        :required="settings.required"
        :min="settings.min"
        :max="settings.max"
        :step="settings.step"
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
    emits: Input.emits,

    data() {
        return {
            ...Input.data(),
        }
    },

    props: {
        ...Input.props,
    },

    created() {
        Input.created.call(this);
    },

    mounted() {
        Input.mounted.call(this);
    },

    methods: {
        ...Input.methods,

        validate() {
            this.error = this.$t('required_value');

            return Input.methods.validate.call(this);
        },

        validateValue(value) {
            if (isNaN(value)) {
                this.error = this.$t('invalid_number');

                return false;
            }

            if (value && this.settings.min !== undefined && value < this.settings.min) {
                this.error = this.$t('invalid_min_number').replace('%d', this.settings.min);

                return false;
            }

            if (value && this.settings.max !== undefined && value > this.settings.max) {
                this.error = this.$t('invalid_max_number').replace('%d', this.settings.max);

                return false;
            }

            return Input.methods.validateValue.call(value);
        },

        formatValue(value) {
            return isNaN(value) ? null : parseFloat(value);
        },
    }
}
</script>
