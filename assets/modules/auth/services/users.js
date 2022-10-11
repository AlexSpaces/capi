export default class UsersRepository {

    /**
     * @param {Auth} auth
     */
    constructor(auth) {
        this.auth = auth;
        this.cache = new Map();
    }

    /**
     * @param {number} id
     */
    findById(id) {
        if (this.cache.has(id)) {
            return Promise.resolve(this.cache.get(id));
        }

        return fetch(`${this.auth.urls.users}/${id}?client_id=${this.auth.clientId}`, { method: 'GET' })
            .then(result => result.json())
            .then(data => this._map(data));
    }

    /**
     * @param {string} username
     */
    search(username) {
        if (!this.auth.isAuthenticated()) {
            throw new Error('Need authenticated user.');
        }

        const headers = this.auth.getAuthHeader();
        return fetch(`${this.auth.urls.users}?client_id=${this.auth.clientId}`, { method: 'GET', headers })
            .then(result => result.json())
            .then(data => data.map(el => this._map(el)))
            .then(users => {
                return users.filter(user => {
                    const regexp = new RegExp(`^${username}`, 'i');
                    return user.username.match(regexp);
                });
            });
    }

    /**
     * Map user
     * @param {Object} user
     *
     * @return {Object}
     */
    _map(user) {
        user.created_at = !!user.created_at ? new Date(user.created_at.date) : user.created_at;
        user.username = user.identifier;
        user.attributes = user.attributes || {};

        for (let attribute in user.attributes) {
            user.attributes[attribute] = this.auth.decode(user.attributes[attribute]);
        }

        if (!user.attributes.avatar) {
            user.attributes.avatar = 'https://cataas.com/c/s/Doe?t=sq&s=60';
        }

        this.cache.set(user.username, user);

        return user;
    }
}
