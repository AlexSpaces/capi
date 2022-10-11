const HttpError = require("../Error/HttpError");
const { Container } = require('@beelab/toolbox');

module.exports = class CRUDRepository {
    constructor(collection) {
        this.requester = Container.get('Requester');
        this.collection = collection;
    }

    async get(id) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'findOne',
            params: { _id: id },
        });

        if (!query.result) {
            throw new HttpError('Item not found', 404);
        }

        return query.result;
    }

    async find(params = {}, limit = 10, skip = 0) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'find',
            params,
            limit,
            skip,
            sort: { editedAt: -1, updatedAt: -1 }
        });

        return query.result;
    }

    async count(params) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'count',
            params,
        });

        return query.result;
    }

    async create(data) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'insert',
            params: data,
        });

        return query.result;
    }

    async edit(id, data) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'update',
            selector: { _id: id },
            params: { $set: data },
        });

        if (query.result === 0) {
            throw new HttpError('Item not found', 404);
        }

        return query.result;
    }

    async remove(id) {
        const query = await this.requester.query({
            collection: this.collection,
            type: 'remove',
            selector: { _id: id },
        });

        if (query.result === 0) {
            throw new HttpError('Item not found', 404);
        }

        return query.result;
    }
}
