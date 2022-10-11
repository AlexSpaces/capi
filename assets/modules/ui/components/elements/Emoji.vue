<template>
    <img v-if="url" :src="url" :alt="name"/>
</template>

<script>
export default {
    inject: ['emoji'],

    data() {
        return {
            url: null,
            name: null,
        }
    },

    props: {
        code: {
            type: String,
            required: true,
        }
    },

    created() {
        this.loadEmoji();
    },

    methods: {
        loadEmoji() {
            const emojis = this.emoji.search(this.code);
            if (emojis.length) {
                this.url = emojis[0].url;
                this.name = emojis[0].name;
            }
        },
    }
}
</script>
