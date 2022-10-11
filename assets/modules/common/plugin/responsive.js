import {
    EXTRA_SMALL,
    SMALL,
    MEDIUM,
    LARGE,
    EXTRA_LARGE,

    getViewport,
    isViewport,
} from '../services/resposive';

export default {
    install(app) {
        app.config.globalProperties.$xs = () => getViewport() === EXTRA_SMALL;
        app.config.globalProperties.$sm = () => getViewport() === SMALL;
        app.config.globalProperties.$md = () => getViewport() === MEDIUM;
        app.config.globalProperties.$lg = () => getViewport() === LARGE;
        app.config.globalProperties.$xl = () => getViewport() === EXTRA_LARGE;

        app.config.globalProperties.$mobile = () => [EXTRA_SMALL, SMALL].includes(getViewport());
        app.config.globalProperties.$table = () => [MEDIUM].includes(getViewport());
        app.config.globalProperties.$desktop = () => [LARGE, EXTRA_LARGE].includes(getViewport());

        app.config.globalProperties.$isViewport = isViewport;
        app.config.globalProperties.$viewport = getViewport;
    }
}
