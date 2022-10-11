import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import { createI18n } from "vue-i18n";
import mitt from 'mitt'

import App from './App.vue'
import Homepage from './pages/Homepage.vue';
import Items from "./pages/Items.vue";

import responsive from './modules/common/plugin/responsive';
import dateDirective from './modules/common/directives/date';
import tooltipDirective from './modules/common/directives/tooltip';
import draggableDirective from "./modules/common/directives/draggable";

import './sass/main.scss';

import translations from '../config/translations/common.json';

import Logger from './modules/common/services/logger';
import RestRepository from './modules/common/services/repository';
import Emoji from './modules/common/services/emoji';
import Application from './modules/common/services/application';

const app = createApp(App);
fetch('/info')
    .then(response => response.json())
    .then(config => {
        const logger = new Logger({ debug: 'dev' === config.env });
        const repository = new RestRepository('/api', logger);
        const application = new Application(logger);
        const emoji = new Emoji();
        const router = createRouter({
            history: createWebHashHistory(),
            routes: [
                { name: 'homepage', path: '/', component: Homepage },
                { name: 'servers', path: '/items', component: Items },
            ]
        });
        const i18n = createI18n({
            locale: config.locale,
            fallbackLocale: 'en',
            messages: translations
        });

        app.use(router);
        app.use(i18n);
        app.use(responsive);

        app.provide('config', config);
        app.provide('logger', logger);
        app.provide('repository', repository);
        app.provide('emoji', emoji);
        app.provide('emitter', mitt());
        app.provide('application', application);

        app.directive('date', dateDirective);
        app.directive('tooltip', tooltipDirective);
        app.directive('draggable', draggableDirective);

        if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
            navigator.serviceWorker.register('/sw.js', { scope: '/' })
                .then(registration => {
                    application.registration = registration;
                    application.listenUpdate(registration);
                    app.mount('#app');
                })
                .catch(e => {
                    console.error(e);
                    app.mount('#app');
                });
        } else {
            app.mount('#app');
        }
    });
