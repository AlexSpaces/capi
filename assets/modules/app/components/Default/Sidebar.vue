<template>
    <Sidebar class="sidebar-lg-collapse">
        <SidebarBrand>
            <img width="25" alt="Encyclopedia logo" src="/images/icon.png"/>
            <span class="sidebar-content">{{ $t('brand_name') }}</span>
        </SidebarBrand>

        <SidebarNav>
            <SidebarAction icon="home">{{ $t('home') }}</SidebarAction>
            <SidebarAction icon="fish" to="/items">{{ $t('instances') }}</SidebarAction>
        </SidebarNav>

        <SidebarTitle>
            <h5>{{ $t('application') }}</h5>
        </SidebarTitle>

        <SidebarNav>
            <SidebarItem icon="sync-alt" @click="checkUpdate">{{ $t('app_check_update') }}</SidebarItem>
            <SidebarItem icon="power-off" @click="restartApplication">{{ $t('app_reload') }}</SidebarItem>
        </SidebarNav>

        <SidebarFooter>
            {{ projectVersion }} [{{ projectEnv }}]
            <a :href="privacyPolicyUrl" target="_blank">{{ $t('privacy_policy') }}</a>
        </SidebarFooter>
    </Sidebar>
</template>

<script setup>
import Sidebar from "../../../ui/components/sidebar/Sidebar.vue";
import SidebarBrand from "../../../ui/components/sidebar/SidebarBrand.vue";
import SidebarNav from "../../../ui/components/sidebar/SidebarNav.vue";
import SidebarAction from "../../../ui/components/sidebar/SidebarAction.vue";
import SidebarTitle from "../../../ui/components/sidebar/SidebarTitle.vue";
import SidebarItem from "../../../ui/components/sidebar/SidebarItem.vue";
import SidebarFooter from "../../../ui/components/sidebar/SidebarFooter.vue";

import { inject, computed } from "vue";

const config = inject('config');
const application = inject('application');

const projectVersion = computed(() => `v${config.version}`);
const projectEnv = computed(() => config.env);
const privacyPolicyUrl = computed(() => `//firewall.oauthorize.tk/privacy-policy?client_id=${config.name}`);

const restartApplication = () => {
    window.localStorage.clear();
    window.location.reload(true);
};

const checkUpdate = () => {
    application.checkUpdate();
};
</script>
