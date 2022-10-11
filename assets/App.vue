<template>
    <div id="new-version" class="m-0 alert alert-info d-none">
        {{ $t('app_new_version_desc') }}

        <button class="btn btn-link" @click="reload">
            {{ $t('click_here') }} <Emoji code="sparkles"></Emoji>
        </button>
    </div>

    <div class="viewport">
        <Sidebar class="reduced"/>

        <section class="d-flex flex-column flex-grow-1 h-screen overflow-y-auto">
            <main class="flex-grow-1">
                <router-view></router-view>
            </main>

            <Footer></Footer>
        </section>
    </div>
</template>

<script>
import Sidebar from './modules/app/components/Default/Sidebar.vue';
import Footer from "./modules/app/components/Default/Footer.vue";
import Emoji from "./modules/ui/components/elements/Emoji.vue";

export default {
    components: {
        Sidebar,
        Footer,
        Emoji,
    },

    inject: ['application', 'config', 'auth'],

    created() {
        if (!this.config.allowAnonymous) {
            this.auth.canActivate();
        }
    },

    methods: {
        reload() {
            window.location.reload(true);
        }
    }
}
</script>
