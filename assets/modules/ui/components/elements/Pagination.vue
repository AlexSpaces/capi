<template>
    <ul class="pagination">
        <li class="page-item">
            <a class="page-link" href="#" @click.stop="onNavigate(1)">&laquo;&laquo;</a>
        </li>

        <li class="page-item">
            <a class="page-link" href="#" @click.stop="onNavigate(previous())">&laquo;</a>
        </li>

        <li class="page-item" v-for="p in this.pages" :class="{ active: p === page }">
            <a class="page-link" href="#" @click.stop="onNavigate(p)">{{ p }}</a>
        </li>

        <li class="page-item">
            <a class="page-link" href="#" @click.stop="onNavigate(next())">&raquo;</a>
        </li>

        <li class="page-item">
            <a class="page-link" href="#" @click.stop="onNavigate(max)">&raquo;&raquo;</a>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            pages: [],
            tmpPages: [],
        };
    },

    props: {
        page: {
            type: Number,
            default: 1,
        },
        max: {
            type: Number,
            default: 1,
        },
    },

    emits: ['navigate'],

    mounted() {
        console.log(this.page, this.max);
        this.tmpPages = this.getPages(this.max);

        if (this.page < 4) {
            this.pages = this.tmpPages.slice(0, 4);
        } else if (this.page > this.max - 4) {
            this.pages = [this.max - 4, this.max - 3, this.max - 2, this.max - 1, this.max]
        } else {
            this.pages = [this.tmpPages[this.page - 2], this.tmpPages[this.page - 1], this.tmpPages[this.page], this.tmpPages[this.page + 1], this.tmpPages[this.page + 2]];
        }
    },

    methods: {
        previous() {
            return this.page - 1 <= 0 ? 1 : this.page - 1;
        },

        next() {
            return this.page + 1 > this.max ? this.max : this.page + 1;
        },

        getPages(max) {
            let pages = [];
            for (let i = 1; i <= max; i++) {
                pages.push(i);
            }

            return pages;
        },

        onNavigate(page) {
            this.$emit('navigate', page);
        },
    }
}
</script>
