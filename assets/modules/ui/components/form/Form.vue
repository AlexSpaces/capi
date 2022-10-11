<template>
    <form ref="form" @submit.prevent="onFormSubmitted($event)" novalidate :key="render">
        <div class="row">
            <div v-for="(value, name, index) in parameters" :class="value.col || 'col-12 mb-3'" :key="index">
                <TextInput
                    v-if="value.type === 'text'"

                    ref="inputs"

                    :name="name"
                    :value="model[name] || value.value || null"
                    :settings="value"

                    @change="onInputChanged"
                    @submit="onFormSubmitted">
                </TextInput>

                <NumberInput
                    v-if="value.type === 'number'"

                    ref="inputs"

                    :name="name"
                    :value="model[name] || value.value"
                    :settings="value"

                    @change="onInputChanged"
                    @submit="onFormSubmitted">
                </NumberInput>

                <SelectInput
                    v-if="value.type === 'select'"

                    ref="inputs"

                    :name="name"
                    :value="model[name] || value.value || null"
                    :settings="value"

                    @change="onInputChanged"
                    @submit="onFormSubmitted">

                </SelectInput>

                <TextareaInput
                    v-if="value.type === 'textarea'"

                    ref="inputs"

                    :name="name"
                    :value="model[name] || value.value || null"
                    :settings="value"

                    @change="onInputChanged"
                    @submit="onFormSubmitted">

                </TextareaInput>

                <ObjectInput
                    v-if="value.type === 'object'"

                    ref="inputs"

                    :name="name"
                    :value="model[name] || value.value || {}"
                    :settings="value"

                    @change="onInputChanged"
                    @submit="onFormSubmitted">

                </ObjectInput>
            </div>
        </div>
    </form>
</template>

<script>
import TextInput from "./inputs/TextInput.vue";
import NumberInput from "./inputs/NumberInput.vue";
import SelectInput from "./inputs/SelectInput.vue";
import TextareaInput from "./inputs/TextareaInput.vue";
import ObjectInput from "./inputs/ObjectInput.vue";
import Utils from "../../services/utils";

export default {
    components: {
        ObjectInput,
        TextareaInput,
        SelectInput,
        TextInput,
        NumberInput,
    },

    emits: ['submit', 'change'],

    data() {
        return {
            col: '',
            _model: {},
            render: 0,
        }
    },

    props: {
        model: {
            type: Object,
            default: {},
        },
        parameters: {
            type: Object,
            default: {},
        },
    },

    mounted() {
        this.$watch('model', (newModel) => {
            this._model = newModel;
            this.render++;
        });

        this._model = this.model;
    },

    methods: {
        submit() {
            this.onFormSubmitted();
        },

        onFormSubmitted(event) {
            if (!this.validate()) {
                event.stopPropagation();

                return;
            }

            this.$emit('submit', this._model);
        },

        onInputChanged({ name, value }) {
            this._model[name] = value;
            this.$emit('change', this._model, { name, value });
        },

        validate() {
            let valid = true;
            for (const input of this.$refs.inputs) {
                if (!input.validate()) {
                    valid = false;
                }
            }

            return valid;
        },

        reset() {
            const form = Utils.getRef(this, 'form');
            form.reset();
        }
    }
}
</script>
