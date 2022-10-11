<template>
    <Menu icon="user" :direction="direction">
        <template #button>
            <Button class="dropdown-toggle auth-nav-button" :level="level" :outline="outline">
                <Icon icon="user"></Icon>
            </Button>
        </template>

        <DropdownAction v-if="!auth.isAuthenticated()" :href="auth.loginURL">
            {{ $t('sign_in') }}
        </DropdownAction>

        <DropdownAction v-if="!auth.isAuthenticated()" :href="auth.signupURL">
            {{ $t('sign_up') }}
        </DropdownAction>

        <slot></slot>

        <DropdownAction v-if="auth.isAuthenticated()" :href="auth.updateURL">
            {{ $t('my_information') }}
        </DropdownAction>

        <DropdownItem v-if="auth.isAuthenticated()" @click="logout">
            {{ $t('logout') }}
        </DropdownItem>
    </Menu>
</template>

<script>
import Menu from "../../ui/components/menu/Menu.vue";
import DropdownAction from "../../ui/components/dropdown/DropdownAction.vue";
import Button from "../../ui/components/elements/Button.vue";
import Icon from "../../ui/components/elements/Icon.vue";
import DropdownItem from "../../ui/components/dropdown/DropdownItem.vue";

export default {
    components: {
        DropdownItem,
        Icon,
        Button,
        DropdownAction,
        Menu
    },

    props: {
        direction: {
            type: String,
            default: 'end'
        },
        level: {
            type: String,
            default: 'light'
        },
        outline: Boolean,
    },

    inject: ['auth'],

    methods: {
        logout() {
            this.auth.logout();
            location.reload();
        }
    }
}
</script>
