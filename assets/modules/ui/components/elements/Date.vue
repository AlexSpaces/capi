<template>
    <span v-tooltip:500="title">{{ formattedDate }}</span>
</template>

<script>
export default {
    props: {
        date: {
            type: [Date, String, Number],
            required: true,
        },

        format: {
            type: Object,
            default: {},
        }
    },

    inject: ['config'],

    computed: {
        formattedDate() {
            return (new Date(this.date)).toLocaleDateString(
                this.config.locale || navigator.language,
                this.format
            );
        },

        title() {
            return (new Date(this.date)).toLocaleDateString(
                this.config.locale || navigator.language,
                {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                }
            );
        },
    }
}
</script>
