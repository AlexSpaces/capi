export default class Application {
    constructor(logger) {
        this.logger = logger;
        this.registration = null;
    }

    listenUpdate(registration = null) {
        if (!registration && this.registration) {
            registration = this.registration;
        }

        registration.addEventListener('updatefound', () => {
            this.logger.debug('New version found', registration);

            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker && newWorker.state === 'installed') {
                    this.applyUpdate(newWorker);
                }
            });
        });
    }

    checkUpdate() {
        this.logger.debug('Checking new update');
        this.registration.update().then(registration => this.listenUpdate(registration));
    }

    applyUpdate(serviceWorker) {
        serviceWorker.postMessage({ action: 'skipWaiting' });

        const rootApp = document.querySelector('#app');
        if (rootApp) {
            rootApp.querySelector('#new-version').classList.remove('d-none');
        }
    }

    notify(title, options, callbacks = {}) {
        const notification = this.registration.showNotification(title, options);

        for (let event in callbacks) {
            notification[event] = callbacks;
        }

        return notification;
    }

    get init() {
        return !!this.registration;
    }
}
