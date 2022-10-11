<template>
    <label class="form-label" v-if="settings.label && !nolabel">
        {{ settings.label }}
    </label>

    <div v-if="availableParameters.length !== parameters.length" class="input-group mb-3">
        <select class="form-select" ref="select">
            <option v-for="parameterName in availableParameters" :value="parameterName">
                {{ settings.parameters[parameterName].label || parameterName }}
            </option>
        </select>

        <Button level="secondary" outline @click="onAddedParameter">
            {{ $t('add') }}
        </Button>
    </div>

    <div :style="{ maxHeight: '400px' }">
        <table class="table table-responsive table-sm table-borderless">
            <tbody>
                <tr class="d-flex align-items-center" v-for="parameterName in parameters" :key="parameterName">
                    <td>{{ settings.parameters[parameterName].label }}</td>
                    <td class="flex-fill">
                        <TextInput
                            v-if="settings.parameters[parameterName].type === 'text'"

                            ref="inputs"

                            :nolabel="true"
                            :name="parameterName"
                            :value="value[parameterName] || settings.parameters[parameterName].value || null"
                            :settings="settings.parameters[parameterName]"

                            @change="onInputChanged"
                            @submit="onInputSubmitted">
                        </TextInput>

                        <NumberInput
                            v-if="settings.parameters[parameterName].type === 'number'"

                            ref="inputs"

                            :nolabel="true"
                            :name="parameterName"
                            :value="value[parameterName] || settings.parameters[parameterName].value"
                            :settings="settings.parameters[parameterName]"

                            @change="onInputChanged"
                            @submit="onInputSubmitted">
                        </NumberInput>

                        <SelectInput
                            v-if="settings.parameters[parameterName].type === 'select'"

                            ref="inputs"

                            :nolabel="true"
                            :name="parameterName"
                            :value="value[parameterName] || settings.parameters[parameterName].value || null"
                            :settings="settings.parameters[parameterName]"

                            @change="onInputChanged"
                            @submit="onInputSubmitted">

                        </SelectInput>

                        <TextareaInput
                            v-if="settings.parameters[parameterName].type === 'textarea'"

                            ref="inputs"

                            :nolabel="true"
                            :name="parameterName"
                            :value="value[parameterName] || settings.parameters[parameterName].value || null"
                            :settings="settings.parameters[parameterName]"

                            @change="onInputChanged"
                            @submit="onInputSubmitted">

                        </TextareaInput>
                    </td>
                    <td v-if="!settings.parameters[parameterName].required">
                        <Button
                            level="danger"
                            @click="onDeleteParameter($event, name)">
                            <Icon icon="trash"></Icon>
                        </Button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="!valid" class="invalid-feedback">{{ error }}</div>
</template>

<script>
import Input from './Input.vue';
import TextInput from "./TextInput.vue";
import NumberInput from "./NumberInput.vue";
import SelectInput from "./SelectInput.vue";
import TextareaInput from "./TextareaInput.vue";
import Button from "../../elements/Button.vue";
import Icon from "../../elements/Icon.vue";

export default {
    components: {
        Icon,
        Button,
        TextareaInput,
        SelectInput,
        TextInput,
        NumberInput,
    },

    emits: Input.emits,

    data() {
        return {
            ...Input.data(),
            parameters: [],
            availableParameters: [],
        }
    },

    props: {
        ...Input.props,
        value: {
            type: Object,
            default: {},
        }
    },

    created() {
        Input.created.call(this);
    },

    mounted() {
        for (let name in this.settings.parameters) {
            if (!this.availableParameters.includes(name)) {
                this.availableParameters.push(name);
            }

            if (
                (
                    this.value[name] !== undefined ||
                    this.settings.parameters[name].value !== undefined ||
                    this.settings.parameters[name].required
                ) &&
                !this.parameters.includes(name)
            ) {
                this.parameters.push(name);
            }
        }

        Input.mounted.call(this);
    },

    methods: {
        ...Input.methods,

        validate() {
            let valid = true;
            for (const input of this.$refs.inputs || []) {
                if (!input.validate()) {
                    valid = false;
                }
            }

            return valid;
        },

        formatValue() {
            const result = {};
            for (const input of this.$refs.inputs || []) {
                result[input.name] = input.formatValue(input._value);
            }

            return result;
        },

        addParameter(selectedParameter) {
            if (selectedParameter && this.settings.parameters[selectedParameter] && !this.parameters.includes(selectedParameter)) {
                this.parameters.push(selectedParameter);
            }
        },

        onAddedParameter() {
            this.addParameter(this.$refs.select.value);
        },

        onDeleteParameter(event, name) {
            this.parameters.splice(this.parameters.indexOf(name), 1);

            this.onInputChanged(event);
        },
    }
}
</script>
