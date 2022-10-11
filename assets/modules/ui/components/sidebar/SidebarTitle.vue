<template>
    <h1 v-if="hn === 1" class="sidebar-title"><slot></slot></h1>
    <h2 v-if="hn === 2" class="sidebar-title"><slot></slot></h2>
    <h3 v-if="hn === 3" class="sidebar-title"><slot></slot></h3>
    <h4 v-if="hn === 4" class="sidebar-title"><slot></slot></h4>
    <h5 v-if="hn === 5" class="sidebar-title"><slot></slot></h5>
</template>

<script>
export default {
    props: {
        h: {
            type: [String, Number],
            default: 4,

            validator(value) {
                return [1, 2, 3, 4, 5].includes(parseInt(value));
            },
        }
    },

    computed: {
        hn() {
            return parseInt(this.h);
        }
    }
}
</script>
