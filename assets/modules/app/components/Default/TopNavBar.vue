<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a href="/#/" class="navbar-brand">Cataas</a>

            <div class="navbar-nav d-block d-lg-none mr-auto">
                <a class="btn btn-link text-white" href="/#/cats">
                    <i class="fa fa-paw"></i>
                </a>

                <a class="btn btn-link text-white" href="/#/upload">
                    <i class="fa fa-upload"></i>
                </a>
            </div>

            <ul class="navbar-nav">
                <li class="nav-item d-lg-flex d-none">
                    <a class="nav-link" href="https://twitter.com/apicataas" target="_blank">
                        <i class="fab fa-twitter"></i>
                    </a>

                    <a class="nav-link" href="https://www.buymeacoffee.com/kevinbalicot" target="_blank">
                        Buy me a <i class="fa fa-beer"></i>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import TopNavbar from "../../../ui/components/navbar/TopNavbar.vue";
import Button from "../../../ui/components/elements/Button.vue";
import Icon from "../../../ui/components/elements/Icon.vue";
// import AuthNav from "../../../auth/components/AuthNav.vue";

import { inject } from "vue";

const emitter = inject('emitter');

const toggleSidebar = () => emitter.emit('sidebar:toggle');
</script>
