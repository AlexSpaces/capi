export default class Pagination {
    constructor(limit, page = 1) {
        this._limit = limit;
        this._max = limit;
        this._page = page;
    }

    get limit() {
        return this._limit;
    }

    get max() {
        return Math.ceil(this._max / this._limit);
    }

    get skip() {
        return (this._page - 1) * this.limit;
    }

    set page(page) {
        this._page = page;
    }

    get page() {
        return this._page;
    }

    set max(max) {
        this._max = max;
    }

    get params() {
        return { limit: this.limit, skip: this.skip };
    }
}
