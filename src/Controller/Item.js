const { send } = require("@tamia-web/tamia/modules/common/services/controller");

const ItemRepository = require("../Repository/Item");

module.exports = {
    async getItem(req, res) {
        const repository = new ItemRepository();
        try {
            send(req, res, await repository.get(req.params.id));
        } catch ({ message, code }) {
            send(req, res, { code, message }, code);
        }
    },

    async countItems(req, res) {
        const repository = new ItemRepository();

        if (req.query.search) {
            const target = req.query.searchTarget || 'name';
            req.query[target] = new RegExp(req.query.search, 'i');

            delete req.query.search;
            delete req.query.searchTarget;
        }

        send(req, res, await repository.count(req.query));
    },

    async findItems(req, res) {
        const repository = new ItemRepository();

        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);

        delete req.query.limit;
        delete req.query.skip;

        if (req.query.search) {
            const target = req.query.searchTarget || 'name';
            req.query[target] = new RegExp(req.query.search, 'i');

            delete req.query.search;
            delete req.query.searchTarget;
        }

        send(req, res, await repository.find(req.query, limit, skip));
    },

    async createItem(req, res) {
        const repository = new ItemRepository();
        send(req, res, await repository.create(req.body));
    },

    async editItem(req, res) {
        const repository = new ItemRepository();
        try {
            send(req, res, await repository.edit(req.params.id, req.body));
        } catch ({ message, code }) {
            send(req, res, { code, message }, code);
        }
    },

    async removeItem(req, res) {
        const repository = new ItemRepository();
        try {
            send(req, res, await repository.remove(req.params.id));
        } catch ({ message, code }) {
            send(req, res, { code, message }, code);
        }
    },
}
