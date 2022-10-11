const CRUDRepository = require("./CRUD");

module.exports = class ItemRepository extends CRUDRepository {
    constructor() {
        super('items');
    }
}
