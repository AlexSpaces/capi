<template>
    <Modal :id="menuId">
        <template #body>
            <div class="dropdown-menu d-block show shadow-none" style="position: relative;">
                <slot></slot>
            </div>
        </template>

        <template #footer="{ close }">
            <Button level="secondary" @click="close">{{ $t('cancel') }}</Button>
        </template>
    </Modal>

    <Dropdown ref="dropdown" @click="openModal" :options="options" :direction="direction">
        <template #button>
            <slot name="button">
                <Button :level="level" :outline="outline">
                    <Icon :icon="icon"></Icon>
                </Button>
            </slot>
        </template>

        <slot></slot>
    </Dropdown>
</template>

<script>
import Dropdown from "../dropdown/Dropdown.vue";
import Modal from "../elements/Modal.vue";
import Button from "../elements/Button.vue";
import Icon from "../elements/Icon.vue";
import Utils from "../../services/utils";

let menuId = 0;

export default {
    components: {
        Icon,
        Button,
        Modal,
        Dropdown
    },

    data() {
        return {
            menuId: ++menuId,
        }
    },

    props: {
        options: {
            type: Object,
            default: {},
        },
        direction: {
            type: String,
            default: 'end'
        },
        level: {
            type: String,
            default: 'light'
        },
        icon: {
            type: String,
            default: 'ellipsis-h',
        },
        outline: Boolean,
    },

    inject: ['emitter'],

    methods: {
        openModal() {
            const dropdown = Utils.getRef(this, 'dropdown');
            if (this.$xs()) {
                dropdown.$el.querySelector('.dropdown-menu').classList.add('d-none');
                this.emitter.emit(`modal:${this.menuId}:show`);
            } else {
                dropdown.$el.querySelector('.dropdown-menu').classList.remove('d-none');
            }
        },
    }
}
</script>
