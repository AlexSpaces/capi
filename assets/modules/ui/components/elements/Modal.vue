<template>
    <div ref="modal" class="modal fade" tabindex="-1">
        <div :class="className">
            <div class="modal-content">
                <slot name="header" :success="success" :close="close" :modal="modal">
                    <div v-if="title" class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                </slot>

                <div class="modal-body">
                    <slot name="body" :success="success" :close="close" :modal="modal"></slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer" :success="success" :close="close" :modal="modal">
                        <Button level="success" @click="success">{{ $t('validate') }}</Button>
                        <Button level="secondary" @click="close">{{ $t('cancel') }}</Button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';
import Button from "./Button.vue";
import Utils from "../../services/utils";

export default {
    components: {
        Button
    },

    emits: ['success', 'close'],
    inject: ['emitter'],

    data() {
        return {
            modal: null,
            modalId: null,
        }
    },

    props: {
        title: String,
        options: {
            type: Object,
            default: {}
        },

        scroll: {
            type: Boolean,
            default: false,
        },

        size: {
            type: String,
            default: 'md',

            validator(value) {
                return ['sm', 'md', 'lg', 'xl'].includes(value);
            }
        }
    },

    computed: {
        className() {
            return `modal-dialog modal-${this.size} ${this.scroll ? 'modal-dialog-scrollable' : ''}`;
        }
    },

    mounted() {
        const modal = Utils.getRef(this, 'modal');
        modal.addEventListener('hidden.bs.modal', () => {
            this.$emit('close');
        });

        this.modal = new Modal(modal, this.options);
        this.modalId = modal.id;

        if (this.modalId) {
            this.emitter.on(`modal:${this.modalId}:show`, () => this.show());
            this.emitter.on(`modal:${this.modalId}:hide`, () => this.hide());
        }
    },

    unmounted() {
        if (this.modalId) {
            this.emitter.off(`modal:${this.modalId}:show`);
            this.emitter.off(`modal:${this.modalId}:hide`);
        }
    },

    methods: {
        success(detail = {}) {
            this.$emit('success', detail);
            this.close();
        },

        close(detail) {
            this.modal.hide();
            this.$emit('close', detail);
        },

        show() {
            this.modal.show();
        },

        hide() {
            this.modal.hide();
        }
    }
}
</script>
