import Token from './token';

export default class Auth {

    constructor(logger, config) {
        this.logger = logger;

        if (!config || !config.urls || !config.clientId || !config.scopes) {
            throw new Error('Need auth config with urls, clientId and scopes entries');
        }

        this.logger = logger;
        this.urls = config.urls;
        this.clientId = config.clientId;
        this.scopes = config.scopes || [];
        this.accessScopes = config.accessScopes || [];

        this._accessToken = localStorage.getItem(this.clientId + '-access-token') || null;
        this._refreshToken = localStorage.getItem(this.clientId + '-refresh-token') || null;

        this.parseURL();
    }

    /**
     * @param {string} token
     */
    set accessToken(token) {
        if (token) {
            localStorage.removeItem(this.clientId + '-access-token');
            localStorage.setItem(this.clientId + '-access-token', token);
            this._accessToken = token;
        }
    }

    /**
     * @param {string} token
     */
    set refreshToken(token) {
        if (token) {
            localStorage.removeItem(this.clientId + '-refresh-token');
            localStorage.setItem(this.clientId + '-refresh-token', token);
            this._refreshToken = token;
        }
    }

    /**
     * Validate token
     * @return {Promise}
     */
    validate() {
        const headers = this.getAuthHeader();

        this.logger.debug(`<Auth> validate token ${this._accessToken}`, this.token);

        return fetch(this.urls.validate, { method: 'GET', headers })
            .then(result => result.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }

                if (this.accessScopes.length && !this.accessScopes.every(scope => data['oauth_scopes'].includes(scope))) {
                    throw new Error(`Need ${this.accessScopes} scopes`);
                }

                return data;
            });
    }

    /**
     * Refresh tokens
     * @return {Promise}
     */
    refresh() {
        const headers = this.getAuthHeader();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.logger.debug(`<Auth> refresh token ${this._accessToken}`, this.token);

        const url = `${this.urls.refresh}?client_id=${this.clientId}`;
        const body = `refresh_token=${encodeURIComponent(this._refreshToken)}`;

        return fetch(url, { method: 'POST', body, headers })
            .then(result => result.json())
            .then(data => {
                if (!!data.error) {
                    window.location = this.loginURL;
                }

                this.accessToken = data['access_token'];
                this.refreshToken = data['refresh_token'];

                if (this.accessScopes.length && !this.accessScopes.every(scope => this.token.isGranted(scope))) {
                    throw new Error(`Need ${this.accessScopes} scopes`);
                }
            });
    }

    /**
     * Refresh tokens
     * @param {Object} attributes
     * @return {Promise}
     */
    update(attributes) {
        const headers = this.getAuthHeader();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.logger.debug(`<Auth> update user attributes with token ${this._accessToken}`, attributes);

        const user = this.getUser();
        const body = `attributes=${JSON.stringify(attributes)}`;
        const url = `${this.urls.update}/${user.username}?client_id=${this.clientId}`;

        return fetch(url, { method: 'POST', body, headers })
            .then(result => result.json());
    }

    /**
     * Check is user is authenticated
     * @return {boolean}
     */
    isAuthenticated() {
        return !!this.token;
    }

    /**
     * Logout user
     */
    logout() {
        this._accessToken = null;
        this._refreshToken = null;
        localStorage.removeItem(this.clientId + '-access-token');
        localStorage.removeItem(this.clientId + '-refresh-token');
        //this.revoke();
        window.history.replaceState({}, document.title, '/');
    }

    /**
     * Check if user has a valid token
     *
     * @return {Promise<boolean>}
     */
    canActivate() {
        return this.validate()
            .then(() => true)
            .catch(error => {
                this.logger.error(`<Auth> validate token response error "${error.message}"`, error);
                return this.retryActivate();
            });
    }

    /**
     * Try to refresh token
     *
     * @return {Promise<boolean>}
     */
    retryActivate() {
        return this.refresh()
            .then(() => true)
            .catch(error => {
                this.logger.error(`<Auth> refresh token response error "${error.message}"`, error);
                this.logout();

                return false;
            });
    }

    /**
     * Return current autheticated user
     *
     * @return {Object|null}
     */
    getUser() {
        if (!this.token) {
            return null;
        }

        const user = {
            username: this.token.payload.sub,
            attributes: {}
        };

        for (let attribute in this.token.payload) {
            if (attribute.match(/^[a-zA-Z0-9_]+:user:first_name$/)) {
                user.firstname = this.token.payload[attribute];
            }

            if (attribute.match(/^[a-zA-Z0-9_]+:user:last_name$/)) {
                user.lastname = this.token.payload[attribute];
            }

            if (attribute.match(/^[a-zA-Z0-9_]+:user:email$/)) {
                user.email = this.token.payload[attribute];
            }

            if (attribute.match(/^[a-zA-Z0-9_]+:user:attribute/)) {
                const match = attribute.match(/^[a-zA-Z0-9_]+:user:attribute:(.*)/);
                if (!!match[1]) {
                    let decodedAttribute = this.decode(this.token.payload[attribute]);
                    decodedAttribute = 'true' === decodedAttribute ? true : decodedAttribute;
                    decodedAttribute = 'false' === decodedAttribute ? false : decodedAttribute;
                    user.attributes[match[1]] = decodedAttribute;
                }
            }
        }

        if (!user.attributes.avatar) {
            user.attributes.avatar = 'https://cataas.com/c/s/Doe?t=sq&s=60';
        }

        return user;
    }

    /**
     * Create auth headers
     *
     * @return {Headers} headers
     */
    getAuthHeader() {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${this._accessToken || ''}`);

        return headers;
    }

    /**
     * Parse token into URL
     */
    parseURL() {
        const params = [];
        const search = window.location.search.replace('?', '');
        const chunks = search.split('&');

        chunks.forEach(c => {
            let k = c.split('=');
            params[k[0]] = k[1];
        });

        if (!!params['access_token']) {
            this.accessToken = params['access_token'];
            this.logger.debug(`<Auth> parse URL find access token ${this._accessToken}`);
        }

        if (!!params['refresh_token']) {
            this.refreshToken = params['refresh_token'];
            this.logger.debug(`<Auth> parse URL find refresh token ${this._refreshToken}`);
        }

        if (!!params['status'] && 'ok' === params['status']) {
            if (params['path']) {
                window.history.replaceState({}, document.title, '/#' + params['path']);
            } else {
                window.history.replaceState({}, document.title, window.location.href.replace(window.location.search, ''));
            }
        }
    }

    encode(string) {
        return encodeURIComponent(String(string).replace(/\?/g, '_q_'));
    }

    decode(string) {
        return decodeURIComponent(String(string).replace(/_q_/g, '?'));
    }

    /**
     * @return {Token|null}
     */
    get token() {
        if (null !== this._accessToken && null !== this._refreshToken) {
            return new Token(this._accessToken, this._refreshToken);
        }

        return null;
    }

    /**
     * @return {string}
     */
    get loginURL() {
        return `${this.urls.formLogin}?client_id=${this.clientId}&referer=${window.location.origin}&path=${window.location.hash.replace('#', '')}&scope=${this.accessScopes.concat(this.scopes).join(' ')}`;
    }

    /**
     * @return {string}
     */
    get signupURL() {
        return `${this.urls.formSignup}?client_id=${this.clientId}&referer=${window.location.origin}`;
    }

    /**
     * @return {string}
     */
    get updateURL() {
        const user = this.getUser();
        return `${this.urls.formUpdate}/${user.username}?client_id=${this.clientId}&referer=${window.location.origin}&access_token=${this._accessToken}`;
    }

    static get injects() {
        return [common.Logger];
    }
}
