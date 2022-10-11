<template>
    <input
        class="form-control"
        type="text"

        :class="{ 'is-invalid': !valid }"

        :name="name"
        :value="_value"
        :required="settings.required"
        :placeholder="settings.placeholder"

        @input="event => _value = event.target.value"
        @change="onInputChanged"
        @keyup="onInputSubmitted"
    />
</template>

<script>
export default {
    emits: ['change', 'submit'],

    data() {
        return {
            error: 'Required value',
            valid: true,
            _value: null,
        }
    },

    props: {
        settings: {
            type: Object,
            default: { required: false },
        },
        nolabel: {
            type: Boolean,
            default: false,
        },
        name: String,
        value: String,
    },

    created() {
        this.error = this.$t('required_value');
    },

    mounted() {
        this._value = this.value;
    },

    methods: {
        isNull(value) {
            return value === undefined || value === null || value === '';
        },

        validate() {
            this.valid = !(this.settings.required && this.isNull(this._value)) && this.validateValue(this._value);

            return this.valid;
        },

        formatValue(value) {
            return value ? String(value) : null;
        },

        validateValue(value) {
            return true;
        },

        onInputChanged() {
            this.validate();

            this._value = this.formatValue(this._value);
            this.$emit('change', { name: this.name, value: this._value });
        },

        onInputSubmitted(event) {
            if (event.keyCode === 13 || (event.detail.keyCode && event.detail.keyCode === 13)) {
                this._value = this.formatValue(this._value);
            }
        }
    }
}
</script>
